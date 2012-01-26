var isShare = true;
var isDebug = false;

function saveDataToNode(node, dataString, aspectString){
	var aspects = eval("(" + aspectString + ")" );
	var data = eval("(" + dataString + ")" );

	//Add aspects first
	for(x in aspects){
		if(isDebug) logger.log("FORM MANAGEMENT - ADDING aspect " + aspects[x]);
		node.addAspect(aspects[x].replace("_", ":") + "");
		node.save();
	}
	//Add properties
	for(var i in data) {
		var qname = i.replace("_", ":") + "";
		if(isDebug) logger.log( "FORM MANAGEMENT - Saving "+i+ ":" + data[i] );
		
		if(i.indexOf("Date") != -1){ 
			if(data[i] != ""){
				node.properties[qname] = new Date(data[i].replace(/-/g, "/") );
			}else{
				node.properties[qname] = null;
			}
		}else{
			node.properties[qname] = data[i];
		} 
	}
	node.save();
	return true;
}
function saveMetadataToDoc(node){
	if(node){
		if(isDebug) logger.log("FORM MANAGEMENT - Found Node for Storing Form Data " + node.id);
	}
	saveDataToNode(node, fmStoreObj, fmAspects);

	if(fmMoveNode != ""){
		var destination = search.findNode("workspace://SpacesStore/" + fmMoveNode);
		logger.log("FORM MANAGEMENT: MOVING NODE:" + fmMoveNode);
		if(destination){
			var didMove = node.move(destination);
			logger.log("FORM MANAGEMENT: MOVED SUCCESS:" + didMove);
		}
	}
}

/* POST from SHARE */
if(isShare){
	var jsonData 	= jsonUtils.toObject(requestbody.content);
	var fmAspects	= stringUtils.urlDecode(jsonData.aspects);
	var fmStoreObj 	= stringUtils.urlDecode(jsonData.storeObj);
	var fmNodeId 	= stringUtils.urlDecode(jsonData.nodeId);
	var fmMoveNode 	= stringUtils.urlDecode(jsonData.moveId);
	var fmCreateContent = stringUtils.urlDecode(jsonData.createContent);
	var fmCreateFilename = stringUtils.urlDecode(jsonData.createFilename);
	var fmCreateMime =stringUtils.urlDecode(jsonData.createMimeType);
	var nodeArr = "";
	
	logger.log("FORM MANAGEMENT CHECK FOR CREATE NODE: with filename: "+ fmCreateFilename + " and " +  fmNodeId.indexOf("create-doc") );
	if(fmNodeId.indexOf("create-doc") >= 0){
		//something that requires a document to be created
		var destination = search.findNode("workspace://SpacesStore/" + fmMoveNode);
		var file = destination.createFile( fmCreateFilename );
		file.mimetype = fmCreateMime;
		file.content = fmCreateContent;
		file.save();
		nodeArr = file.id;
		logger.log("FORM MANAGEMENT: Create new file id:" + file.id);
		
		saveMetadataToDoc(file);
		
	}else{
		nodeArr = fmNodeId.split("~");
		
		for(x in nodeArr){
			var node = search.findNode("workspace://SpacesStore/" + nodeArr[x]);
			saveMetadataToDoc(node);
		}
	
	} 
	  
}else{
	//Alfresco POST Stuff
}