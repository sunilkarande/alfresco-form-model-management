<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/aspects/modelUtils.js">
var responseObj = {};

function failValidation(msg){
	responseObj.service.status = 0;
	responseObj.service.msg = msg;
}

function nodeValidation(argUid, argAspect){
	model.test = "";

	responseObj.service = {};
	responseObj.filesFailed = 0;
	responseObj.filesChecked = 0;
	responseObj.service.status = 1;
	responseObj.service.msg = "";
	responseObj.nodes = [];
	var nodeArray = argUid.split("~");

	for(x in nodeArray){
		if(nodeArray[x].indexOf("workspace") < 0){
			//Use default workspace store
			nodeArray[x] = "workspace://SpacesStore/" + nodeArray[x];
		}
		var node = search.findNode(nodeArray[x]);
		var nodeResponse = {};
		nodeResponse.id = nodeArray[x];

		if(node){
			//Get json properties
			var workerNode = eval("(" + node.toJSON(true) + ")");

			//Get aspect or profile for validation check
			if(argAspect){
				var findAspects = argAspect.split("~");
				//Validate aspect
				nodeResponse = validateAspect(findAspects, workerNode, nodeResponse);
				if(!nodeResponse.valid) responseObj.filesFailed++;

			}else{
				failValidation("In order to validate a node against an aspect, the aspect name is required aspect=prefix_aspectName");
			}
		}else{
			nodeResponse.error("Could not find node.");
		}
		responseObj.nodes.push(nodeResponse);
		responseObj.filesChecked++;

	}
	return JSON.stringify(responseObj);
}
