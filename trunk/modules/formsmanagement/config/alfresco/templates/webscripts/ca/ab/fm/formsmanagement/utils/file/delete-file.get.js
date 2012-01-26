model.status = 1;
model.msg = "";
var node = search.findNode("workspace://SpacesStore/" + args.uid);

if(node){
	try{
		node.remove();
	}catch(err){
		model.status = 0;
		model.msg = "Could not delete that file, You may not have the right permissions to delete.";
	}
}else{
	model.status = 0;
	model.msg = "Could not find the file to delete.";
}
