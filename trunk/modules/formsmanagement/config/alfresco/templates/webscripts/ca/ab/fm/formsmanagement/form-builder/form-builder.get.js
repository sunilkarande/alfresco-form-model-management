<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

if(args.jsonNode){
	model.ready = true;
	var jsonNode = search.findNode("workspace://SpacesStore/" + args.jsonNode);
	model.json = jsonNode.content;

	var xmlNode = jsonNode.parent.parent.childByNamePath(jsonNode.name.replace(".json", ".xml"));
	model.modeluid = xmlNode.id;
	model.xml = xmlNode.content;
	model.aspectName = args.aspect;
}else{
	model.ready = false;
}

function extractAspects(jObj, uid){
	var aspectString = "";

	if(jObj.aspects){
		if(jObj.aspects.length > 0){
			for(x in jObj.aspects){
				if(jObj.aspects[x]){
					jObj.aspects[x].rootUid = uid + "";
				}
			}

			var tmpS = JSON.stringify( jObj.aspects );
				tmpS = tmpS.substring(1);
			aspectString = tmpS.slice(0, -1) + ",";
		}
	}
	return aspectString;
}

function getAspectList(){
	var jsonString = "";
	var jsonList = companyhome.childByNamePath('Data Dictionary/Models/JsonModels/').children;
	model.aspectObj = [];

	var len = jsonList.length;
	for(var i=0; i<len; i++) {
		var fileObj = eval("(" + jsonList[i].content + ")" );
		var aString = extractAspects(fileObj, jsonList[i].id);
		jsonString += aString;

	}
	return  "[" + jsonString.slice(0, -1) + "]";
}
model.aspectList = eval("(" + getAspectList() + ")" );
