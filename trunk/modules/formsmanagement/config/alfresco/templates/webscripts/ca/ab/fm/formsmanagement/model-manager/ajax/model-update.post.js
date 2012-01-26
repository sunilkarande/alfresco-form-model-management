<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

function saveJson(jsonNode, jsonObject){
	var newObjString = JSON.stringify(jsonObject);
	//Remove NULLS
	newObjString = newObjString.replace(/,null/g, "");
	jsonNode.content = newObjString;
	jsonNode.save();
}

var aspectName = args.aspect;
var prefix = args.prefix;
var action = args.action;
	model.msg = "";
	model.status = 1;

var jsonNode = search.findNode("workspace://SpacesStore/" + args.jsonid);
var jObj = eval("(" + jsonNode.content + ")");

if(action == "add"){
	var addTemplate = {"title":"#ASPECT#","visible":true,"namespace":"#PREFIX#","name":"#ASPECT#","description":"Default example description","properties":[]};
	addTemplate.title = aspectName;
	addTemplate.name = aspectName;
	addTemplate.namespace = prefix;
	jObj.aspects.push(addTemplate);

	try{
		saveJson(jsonNode, jObj);

	}catch(err){
		model.status = 0;
		model.msg = "There was an error creating that aspect, please check that the file is not locked.";
	}
}else if(action == "delete"){

	var len= jObj.aspects.length;
	for(var i=0; i<len; i++) {

		if(jObj.aspects[i]['name'] == aspectName){
			model.msg = "Aspect has been deleted" ;
			delete jObj.aspects[i];

			//Save node back
			saveJson(jsonNode, jObj);
		}
	}
}else if(action == "update"){
	var saveObj = eval("(" + args.json + ")");

	/* @TODO loop object and match replace */
	jObj.name = saveObj.name;
	jObj.author = saveObj.author;
	jObj.description = saveObj.description;
	jObj.version = saveObj.version;
	jObj.imports = saveObj.imports;
	jObj.namespaces = saveObj.namespaces;

	saveJson(jsonNode, jObj);


}
