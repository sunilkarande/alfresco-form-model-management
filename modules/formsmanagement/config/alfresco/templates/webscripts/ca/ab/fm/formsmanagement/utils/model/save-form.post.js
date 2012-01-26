<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/model/convertJsonToModel.js">

var jsonObj = eval("(" + args.jsonString + ")" );
var xmlString = convertJsonToXml(jsonObj); 
model.status = 1;
model.msg = "";
var xmlModel =  search.findNode("workspace://SpacesStore/" + args.uidModel);
model.status = xmlString;
 
try{ 
	xmlModel.content = xmlString;
	xmlModel.properties["cm:modelActive"] = true;
	xmlModel.save();
	
	var jsonModel =  search.findNode("workspace://SpacesStore/" + args.uidJson);
	jsonModel.content = args.jsonString;
	jsonModel.save(); 
	//model.status = xmlString + " " + args.jsonString;
	
}catch(err){
	model.status = 0;  
}   