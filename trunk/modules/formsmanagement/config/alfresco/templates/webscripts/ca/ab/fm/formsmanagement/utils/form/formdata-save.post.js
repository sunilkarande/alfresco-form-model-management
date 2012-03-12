var isShare = true;
var isDebug = false;
model.failedItems = 0;
model.success = 0;
model.msg = "";

function fileExistsClash(name, destination, i){
	//Split old and get extension
	var ext = name.substr(name.lastIndexOf('.') + 1);
	var filename = name.replace("."+ext, "");
	var integer = i;
	while( destination.childByNamePath(filename + "-" + integer + "." + ext ) ){
		integer++;
	}
	return filename + "-" + integer + "." + ext;
}

function getDateArray(string){
    //YYYY-MM-DD  2012-02-14
	var arr = string.split("-");
	var d = new Date( arr[0], (arr[1] - 1), arr[2]);
	return d;
}

function saveDataToNode(node, dataString, aspectString){
	try{
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
			var qname = data[i].qname.replace("_", ":") + "";
			var value = data[i].value;
			var type = data[i].type;

			if(isDebug) logger.log( "FORM MANAGEMENT - Saving "+qname+ ":" + value );

			if(type.indexOf("date") >= 0){
				if(value != ""){
					node.properties[qname] = getDateArray( value );
				}else{
					node.properties[qname] = null;
				}
			}else{
				node.properties[qname] = value;
			}
		}
		node.save();
		model.success++;

	}catch(err){
		model.status = 0;
		model.msg += "Failed to save properties to document(s)~";
		model.failedItems++;
	}
}

function saveMetadataToDoc(node, fmStoreObj, fmAspects){
	if(node){
		if(isDebug) logger.log("FORM MANAGEMENT - Found Node for Storing Form Data " + node.id);
		saveDataToNode(node, fmStoreObj, fmAspects);
	}else{
		model.msg += "Failed to save aspects/properties to document(s)~";
		model.failedItems++;
		if(isDebug) logger.log("FORM MANAGEMENT - failed to save aspect/properties to node" + node.id);
	}
}

function moveDoc(node, fmMoveNode){

	var workspace = "";
	if(fmMoveNode.indexOf("://") < 0){
		workspace = "workspace://SpacesStore/";
	}
	var destination = search.findNode(workspace + fmMoveNode);
	if(destination){

		if(destination.childByNamePath(node.name + "")){
			node.name = fileExistsClash(node.name, destination, 1);
			node.save();
		}

		var didMove = node.move(destination);
		logger.log("FORM MANAGEMENT: MOVED SUCCESS:" + didMove);

		if(!didMove){
			model.msg += "Failed to move document(s) to destination~";
			model.success--;
			model.failedItems++;
			logger.log("FORM MANAGEMENT: FAILED MOVE FILE(s):" + fmMoveNode);
		}
	}else{
		model.msg += "Failed could not find destination folder~";
		model.success--;
		model.failedItems++;
	    logger.log("FORM MANAGEMENT: FAILED COULD NOT FIND DESTINATION FOLDER:" + fmMoveNode);
	}
}

if(args.isShare == "true"){
	//POST from SHARE
	var jsonData 	= jsonUtils.toObject(requestbody.content);
	var fmAspects	= stringUtils.urlDecode(jsonData.aspects);
	var fmStoreObj 	= stringUtils.urlDecode(jsonData.storeObj);
	var fmNodeId 	= stringUtils.urlDecode(jsonData.nodeId);
	var fmMoveNode 	= stringUtils.urlDecode(jsonData.moveId);
	var fmCreateContent = stringUtils.urlDecode(jsonData.createContent);
	var fmCreateFilename = stringUtils.urlDecode(jsonData.createFilename);
	var fmCreateMime =stringUtils.urlDecode(jsonData.createMimeType);
	//RM DATA
	model.isRecordMove 	= stringUtils.urlDecode(jsonData.isRecord);

}else{
	//POST FROM ALFRESCO
	var fmAspects	= args.aspects;
	var fmStoreObj 	= args.storeObj;
	var fmNodeId 	= args.nodeId;
	var fmMoveNode 	= args.moveId;
	var fmCreateContent = args.createContent;
	var fmCreateFilename = args.createFilename;
	var fmCreateMime = args.createMimeType;
}

var nodeArr = "";
if(fmNodeId.indexOf("create-doc") >= 0){
	logger.log("FORM MANAGEMENT CREATE NODE: with filename: "+ fmCreateFilename + " and `create-doc` index found at:" +  fmNodeId.indexOf("create-doc") );
	//something that requires a document to be created
	var destination = search.findNode("workspace://SpacesStore/" + fmMoveNode);
	var file = destination.createFile( fmCreateFilename );
	if(file){
		file.mimetype = fmCreateMime;
		file.content = fmCreateContent;
		file.save();
		nodeArr = file.id;
		logger.log("FORM MANAGEMENT: New File Created with UID:" + file.id);

		saveMetadataToDoc(file, fmStoreObj, fmAspects);
	}else{
		model.msg += "File Create: Failed to save aspects/properties to document(s)~";
		model.failedItems++;
	}

}else{
	nodeArr = fmNodeId.split("~");
	for(x in nodeArr){
		if(nodeArr[x].indexOf("workspace") == -1)  nodeArr[x] = "workspace://SpacesStore/" + nodeArr[x];

		var node = search.findNode(nodeArr[x]);
		saveMetadataToDoc(node, fmStoreObj, fmAspects);
	}
}
//Finally move doc if opted in
if(fmMoveNode != "") moveDoc(node, fmMoveNode);
