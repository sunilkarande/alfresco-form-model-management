<import resource="classpath:alfresco/templates/webscripts/ca/ab/fm/formsmanagement/utils/scriptUtils/jsonUtils.js">

var username = args.user;
var settingNode = userhome.childByNamePath('gmailSettings.json');

var curSetting = eval("(" + settingNode.content + ")");
var newSetting = eval("(" + args.settings + ")");

if(args.action == "saveEmail"){
	curSetting.username = newSetting.username;
	curSetting.password = newSetting.password;
	curSetting.mailServer = newSetting.mailServer;
	curSetting.port = newSetting.port;
	curSetting.ssl = newSetting.ssl; 
	
	settingNode.content = JSON.stringify(curSetting);
	settingNode.save();
	
}else{
	curSetting.labels = newSetting; 
	settingNode.content = JSON.stringify(curSetting); 
	settingNode.save(); 
}