var siteid = ""+ args.siteid + ".json";
var jsonNode = companyhome.childByNamePath('Data Dictionary/Models/Constraints/' + siteid);
if(jsonNode){
	model.result = jsonNode.content;
}else{
	model.result = 0;
}
