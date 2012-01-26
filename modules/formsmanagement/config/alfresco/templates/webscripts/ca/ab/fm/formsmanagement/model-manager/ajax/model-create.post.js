model.status = 1;
model.msg = "";

var action = args.action;

if(action == "create"){
	var fName = args.fliename;
	var checkFilename = companyhome.childByNamePath('Data Dictionary/Models/' + fName + ".xml");

	if(checkFilename){
		model.status = 0; model.msg += "<li>File already exists, try a different name</li>";
	}else{

		try{
			var newModel = companyhome.childByNamePath('Data Dictionary/Models/').createFile(fName + ".xml");
			var jsonModel = companyhome.childByNamePath('Data Dictionary/Models/JsonModels').createFile(fName + ".json");
			jsonModel.content = args.json;
			jsonModel.save();
		}catch(err){
			model.status = 0;
			model.msg += "<li>"+err+"</li>";
		}
	}
}else if(action == "destroy"){

	var jsonNode = 	companyhome.childByNamePath('Data Dictionary/Models/JsonModels/'+ args.filename + ".json");
	var xmlNode = 	companyhome.childByNamePath('Data Dictionary/Models/'+ args.filename + ".xml");
	try{
		xmlNode.remove();
		jsonNode.remove();

	}catch(err){
		model.status = 0;
		model.msg += "<li>"+err+"</li>";
	}

}
