var jsonModel =  search.findNode("workspace://SpacesStore/" + args.uidJson);
if(args.jsonString){
	jsonModel.content = args.jsonString;
}
 
var jObj = eval("(" + jsonModel.content + ")");
model.model = jObj;
