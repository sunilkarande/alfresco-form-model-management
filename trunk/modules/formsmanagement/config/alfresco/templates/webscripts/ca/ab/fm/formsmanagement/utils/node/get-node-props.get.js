<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

model.status = 1;
model.msg = "";
var node = search.findNode(args.uid);

if(!node){
	model.status = 0;
	model.msg = "Could not find node.";
	model.node = "{}";
}else{
	model.node = node.toJSON(true);
}