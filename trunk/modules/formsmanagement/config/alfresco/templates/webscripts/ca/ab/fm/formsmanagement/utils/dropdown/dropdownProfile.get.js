<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">

var siteid = ""+ args.siteid + ".json";
var jsonNode = companyhome.childByNamePath(fmPath.constraints + siteid);
if(jsonNode){
	model.result = jsonNode.content;
}else{
	model.result = 0;
}
