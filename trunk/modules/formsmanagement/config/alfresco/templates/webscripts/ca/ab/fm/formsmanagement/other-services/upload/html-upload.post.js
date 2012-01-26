  
function main()
{
   try
   {
      var filename = null,
         content = null,
         mimetype = null,
         siteId = null, site = null,
         containerId = null, container = null,
         destination = null,
         destNode = null,
         thumbnailNames = null,
         i;

      // Upload specific
      var uploadDirectory = null,
         title = "",
         contentType = null,
         aspects = [],
         overwrite = true; // If a filename clashes for a versionable file

      // Update specific
      var updateNodeRef = null,
         majorVersion = false,
         description = "";
      
      // Prevents Flash-sourced "null" values being set for those parmeters where they are invalid
      var fnFieldValue = function(p_field)
      {
         return field.value.length() > 0 && field.value !== "null" ? field.value : null;
      };

      // Parse file attributes
      for each (field in formdata.fields)
      {
         logger.log("UPLOADING: LOOKING AT FIELD " + field.name); 
		 switch (String(field.name).toLowerCase())
         {
            case "filedata":
               if (field.isFile)
               {
                  filename = field.filename;
                  content = field.content;
                  mimetype = field.mimetype;
               }
               break;

            case "siteid":
               siteId = fnFieldValue(field);
               break;

            case "containerid":
               containerId = fnFieldValue(field);
               break;

            case "destination":
               destination = fnFieldValue(field);
               break;

            case "uploaddirectory":
               uploadDirectory = fnFieldValue(field); 
               break;
 
            case "filename":
               title = fnFieldValue(field);
               break;

            case "description":
               description = field.value;
               break;
 
         }
      }
	   

      /**
       * Site or Non-site?
       */  
      if (siteId !== null)
      {
         /**
          * Non-Site mode.
          * Need valid destination nodeRef.
          */ 
        // destNode = search.findNode(destination);
		 var query= "PATH:\"/app:company_home/st:sites/cm:"+siteId+"/cm:documentLibrary\"";  
		 var result = search.luceneSearch(query); 
		 destNode = result[0];
		  
		 if(result.length <= 0){
			logger.log("UPLOADING: FAILED Could not find site destination " + siteId);
			status.code = 404;
			status.message = "Siteid (" + sideId + ") could not be found.";
			status.redirect = true;
			return;
		  } 
      }
	  else  
	  {
		logger.log("UPLOADING: FAILED Destination is a mandatory parameter");
		status.code = 404;
		status.message = "Destination (" + destination + ") is a mandatory parameter.";
		status.redirect = true;
		return;
	  }

       
	 /**
	  * Upload new file to destNode (calculated earlier) + optional subdirectory
	  */
	 if (uploadDirectory !== null)
	 {
		logger.log("UPLOADING: Finding directory for" + uploadDirectory);
		destNode = destNode.childByNamePath(uploadDirectory);
		if (destNode === null)
		{
		   status.code = 404;
		   status.message = "Cannot upload file since upload directory '" + uploadDirectory + "' does not exist.";
		   status.redirect = true;
		   return;
		}
	 }

	 /**
	  * Exitsing file handling.
	  */
	 var existingFile = destNode.childByNamePath(filename);
	 if (existingFile !== null)
	 {
		// File already exists, decide what to do
		if (existingFile.hasAspect("cm:versionable") && overwrite)
		{
		   // Upload component was configured to overwrite files if name clashes
		   existingFile.properties.content.write(content);

		   // Reapply mimetype as upload may have been via Flash - which always sends binary mimetype
		   existingFile.properties.content.guessMimetype(filename);
		   existingFile.properties.content.encoding = "UTF-8";
		   existingFile.save();

		   model.document = existingFile;
		   // We're finished - bail out here
		   return;
		}
		else
		{
		   // Upload component was configured to find a new unique name for clashing filenames
		   var counter = 1,
			  tmpFilename,
			  dotIndex;

		   while (existingFile !== null)
		   {
			  dotIndex = filename.lastIndexOf(".");
			  if (dotIndex == 0)
			  {
				 // File didn't have a proper 'name' instead it had just a suffix and started with a ".", create "1.txt"
				 tmpFilename = counter + filename;
			  }
			  else if (dotIndex > 0)
			  {
				 // Filename contained ".", create "filename-1.txt"
				 tmpFilename = filename.substring(0, dotIndex) + "-" + counter + filename.substring(dotIndex);
			  }
			  else
			  {
				 // Filename didn't contain a dot at all, create "filename-1"
				 tmpFilename = filename + "-" + counter;
			  }
			  existingFile = destNode.childByNamePath(tmpFilename);
			  counter++;
		   }
		   filename = tmpFilename;
		}
	 }

	 /**
	  * Create a new file.
	  */
	 var newFile = destNode.createFile(filename);
	 if (contentType !== null)
	 {
		newFile.specializeType(contentType);
	 }
	 newFile.properties.content.write(content);

	 // Reapply mimetype as upload may have been via Flash - which always sends binary mimetype
	 newFile.properties.content.guessMimetype(filename);
	 newFile.properties.content.encoding = "UTF-8";
	 newFile.save();         

	 // Create thumbnail?
	 if (thumbnailNames != null)
	 {
		var thumbnails = thumbnailNames.split(","),
		   thumbnailName = "";

		for (i = 0; i < thumbnails.length; i++)
		{
		   thumbnailName = thumbnails[i];
		   if (thumbnailName != "" && thumbnailService.isThumbnailNameRegistered(thumbnailName))
		   {
			  newFile.createThumbnail(thumbnailName, true);
		   }
		}
	 }

	 // Extract metadata - via repository action for now.
	 // This should use the MetadataExtracter API to fetch properties, allowing for possible failures.
	 var emAction = actions.create("extract-metadata");
	 if (emAction != null)
	 {
		// Call using readOnly = false, newTransaction = false
		emAction.execute(newFile, false, false);
	 }

	 // Set the title if none set during meta-data extract
	 newFile.reset();
	 if (newFile.properties.title == null)
	 {
		newFile.properties.title = title;
		newFile.save();
	 }
	 
	 // Additional aspects?
	 if (aspects.length > 0)
	 {
		for (i = 0; i < aspects.length; i++)
		{
		   newFile.addAspect(aspects[i]);
		}
	 }

	 model.document = newFile;
      
   }
   catch (e)
   {
	  logger.log("UPLOADING: FAILED");
      status.code = 500;
      status.message = "Unexpected error occured during upload of new content.";
      if (e.message && e.message.indexOf("org.alfresco.service.cmr.usage.ContentQuotaException") == 0)
      {
         status.code = 413;
         status.message = e.message;
      }
      status.redirect = true;
      return;
   }
}

main();