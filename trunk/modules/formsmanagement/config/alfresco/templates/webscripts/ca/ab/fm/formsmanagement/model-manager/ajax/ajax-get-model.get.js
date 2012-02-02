<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">
<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

function replaceObjectForArray(fromObj, toObj){
	model.debug += "<br>Replacing object for: " + typeof ( fromObj );

	if(typeof ( fromObj ) == "object"){
		var aspectArr = [];
		//Check length
		if(fromObj){
			aspectArr = aspectArr.concat( fromObj);
			delete toObj;
			toObj = aspectArr;
		}
	}
	return toObj;
}

var jsonFileName = args.modelName.replace(".xml", ".json");
var modelNode = companyhome.childByNamePath(fmPath.jsonModels +jsonFileName);
var xmlNode = companyhome.childByNamePath(fmPath.models +args.modelName);

if(modelNode){
	model.content = modelNode.content + "~" + modelNode.id;
}else{

	//Cant find it Create it
	var newNode = companyhome.childByNamePath(fmPath.jsonModels).createFile(jsonFileName);
	newNode.mimetype = "text/plain";

	//newNode.content =jsonS.replace("@name", "name");
	if(newNode){
		//NEED TO REPLACE CLASS AS JAVA CONVERSION REMOVES IT
		var jsonS =  JSONTools.xmlToJson( xmlNode.content.replace("class", "clazz") );
		jsonS = jsonS.replace("clazz", "class");

		var newJson = eval("(" + jsonS.replace("@name", "name") + ")" );

		var splitArr = newJson.name.split(":");
			newJson.name = splitArr[1] + "";

		if(newJson.constraints){
			newJson.constraints = replaceObjectForArray(newJson.constraints['constraint'], newJson.constraints);
		}
		newJson.aspects = replaceObjectForArray(newJson.aspects.aspect, newJson.aspects);
		newJson.namespaces = replaceObjectForArray(newJson.namespaces['namespace'], newJson.namespaces);
		newJson.imports = replaceObjectForArray(newJson.imports['import'], newJson.imports);
		if(newJson.types) newJson.types = replaceObjectForArray(newJson.types['type'], newJson.types);

		for(x in newJson.aspects){
			if(newJson.aspects[x].associations) newJson.aspects[x].associations = replaceObjectForArray(newJson.aspects[x].associations['association'], newJson.aspects[x].associations);

			if(newJson.aspects[x].properties){
				newJson.aspects[x].properties = replaceObjectForArray(newJson.aspects[x].properties['property'], newJson.aspects[x].properties);

				var properties = newJson.aspects[x].properties;
				for(y in properties){
					var sProp = properties[y].name.split(":");
					properties[y].namespace = sProp[0] + "";
					properties[y].name = sProp[1] + "";

					if(properties[y].constraints) properties[y].constraints = replaceObjectForArray(properties[y].constraints['constraint'], properties[y].constraints);

				}
			}
			var splitArr = newJson.aspects[x].name.split(":");
			newJson.aspects[x].namespace = splitArr[0] + "";
			newJson.aspects[x].name = splitArr[1] + "";

		}

		newNode.content = JSON.stringify(newJson);
		newNode.save();

		model.content = newNode.content + "~" + newNode.id;
	}else{

		model.content = "Could not create node";
	}
}