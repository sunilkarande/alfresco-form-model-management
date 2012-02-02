<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/locale/alfresco-locale.js">

//GRAB ALL PROFILES
model.ready = true;

//POPULATE ALL DROPDOWNS IN A PICK LIST
model.profiles = companyhome.childByNamePath(fmPath.constraints).children;

if(args.profile){
	var luceneQuery = "PATH:\"/app:company_home/app:dictionary/app:models/cm:Constraints//*\" AND @cm\\:name:\""+args.profile+"\"";
	var node = search.luceneSearch(luceneQuery);
	model.json = node[0].content;
	model.jsonObj = eval("("+model.json+")");
}else{
	model.ready = false;
}

