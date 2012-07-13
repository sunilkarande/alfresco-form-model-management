model.siteid = page.url.templateArgs.site;
model.fmNode = "";
 
if(page.url.args.aspect){	
	var result = remote.call("/model/aspects/aspecttoproperty?aspects=" + page.url.args.aspect);
	model.fmAspects = result + "";
}else{
	model.fmAspects = '';
}
model.test = page.url.args.aspect;