function getUserSettings(){
	var json = "{}";
	var settingNode = userhome.childByNamePath('gmailSettings.json');
	if(settingNode){
		json = settingNode.content;
	}else{
		var newSetting = userhome.createFile('gmailSettings.json');
		newSetting.content = '{ "username": "", "password": "", "mailServer": "", "ssl": 0, "port": "", "labels": {} }';
		newSetting.save(); 
		json = newSetting.content;  
	}
	return json;
}
function getRMSettings(siteid){
	var json = "{ ";
	var settingNode = companyhome.childByNamePath('Sites/'+siteid+'/rm-file-mapping.json');
	var rmObj = eval("("+settingNode.content+")");
	for(i in rmObj){
		var tmpNode = companyhome.childByNamePath('Sites/rm/documentLibrary'+rmObj[i]);
		if(tmpNode){
			json += '"'+i+'": "'+tmpNode.id+'",';
		}
	}  
	json = json.slice(0, -1) + "}";
	return json;
}
 
var user = getUserSettings(); 
var rm = getRMSettings(args.siteid);  
var appSettings = '{';
appSettings += '"user" :' + user + ',';
appSettings += '"rmMap" :' + rm;
appSettings += '}';
model.json = appSettings;