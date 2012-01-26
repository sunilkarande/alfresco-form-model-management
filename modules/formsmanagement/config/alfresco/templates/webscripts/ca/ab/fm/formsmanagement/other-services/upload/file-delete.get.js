var t = true;
model.myStatus = 1;

if(args.nodes){
	var nodes = args.nodes.split("~");
	for(x in nodes){
		var node = search.findNode("workspace://SpacesStore/" + nodes[x]);
		 t = node.remove();
		 
		 if(!t){ model.myStatus = 0;}
	}
} 

 