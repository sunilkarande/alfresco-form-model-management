<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">

var path = companyhome.childByNamePath( fmPath[""+args.path] );
var filename = args.filename;
//var filetype = args.filetype;
model.status = 1;

if(path){
	var fileCheck = companyhome.childByNamePath(args.path + "/" + filename);
	if(!fileCheck){

		var newNode = path.createFile(filename);
		if(args.content) newNode.content = args.content;
		newNode.save();

		model.msg = newNode.id;

	}else{
		model.status = 0;
		model.msg = "The file "+filename+" already exists. Please try another name";

	}

}else{
	model.status = 0;
	model.msg = "Space path to create file "+args.path+" was not found, could not create file";
}
