<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">
model.status = 1;
model.msg = "";

var action = args.action;

if(action == "create"){
	var fName = args.fliename;
	var checkFilename = companyhome.childByNamePath(fmPath.models+ fName + ".xml");

	if(checkFilename){
		model.status = 0; model.msg += "<li>File already exists, try a different name</li>";
	}else{

		try{
			var newModel = companyhome.childByNamePath(fmPath.models).createFile(fName + ".xml");
			var jsonModel = companyhome.childByNamePath(fmPath.jsonModels).createFile(fName + ".json");
			jsonModel.content = args.json;
			jsonModel.save();
		}catch(err){
			model.status = 0;
			model.msg += "<li>"+err+"</li>";
		}
	}
}else if(action == "destroy"){

	var jsonNode = 	companyhome.childByNamePath(fmPath.jsonModels+ args.filename + ".json");
	var xmlNode = 	companyhome.childByNamePath(fmPath.models+ args.filename + ".xml");
	try{
		xmlNode.remove();
		jsonNode.remove();

	}catch(err){
		model.status = 0;
		model.msg += "<li>"+err+"</li>";
	}

}
