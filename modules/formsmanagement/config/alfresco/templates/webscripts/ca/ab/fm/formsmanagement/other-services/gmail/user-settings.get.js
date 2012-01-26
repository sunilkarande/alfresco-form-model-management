var username = args.user;
var settingNode = userhome.childByNamePath('gmailSettings.json');
if(settingNode){
	model.json = settingNode.content;
}else{
	var newSetting = userhome.createFile('gmailSettings.json');
	newSetting.content = '{ "username": "", "password": "", "mailServer": "", "ssl": 0, "port": "", "labels": {} }';
	newSetting.save();
	
	model.json = newSetting.content;
}
