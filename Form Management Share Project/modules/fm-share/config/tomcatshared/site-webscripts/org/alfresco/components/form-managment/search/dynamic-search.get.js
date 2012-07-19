var siteid = page.url.templateArgs.site;
var repoSearch = "false";
var allSiteSearch = "true";

function doSiteStuff()
{
	//Get site information
	var siteString = remote.call("/api/sites/" + siteid);
		siteJsonObj = eval( "(" + siteString + ")" );
		model.site = siteJsonObj;

	/*
		model.isAdvSearchProfile = false;

		//Get site settings formAspect
	var appSettingString = remote.call('/gmail/user-settings?siteid='+ siteid ) + "";
	var appSettingsObj = eval("(" + appSettingString  + ")");
		model.formAspect = appSettingsObj.site.formAspect;

		//Get User Dropbox node
	var dropboxNode = remote.call("/slingshot/doclib/treenode/site/"+siteid+"/documentLibrary/Dropbox/"+user.name+"?children=false");
		dropboxObj = eval("(" + dropboxNode + ")");
		model.fmDropboxNodeRef = dropboxObj.parent.nodeRef;
	*/

	var result = remote.call("/model/aspects/aspecttoproperty?aspects=" + model.formAspect);
		model.docTypeAspect = result + "";
}

function main()
{
	model.isAdvSearchProfile = true;
	model.siteid = siteid;

	//Default when no site to all sites
	model.searchType = "all-sites";

	if(siteid && page.url.args.a != "true"){ model.searchType = "site"; allSiteSearch = "false"; }
	if(page.url.args.r == "true"){ repoSearch = "true"; model.searchType = "repo"; allSiteSearch = "false";  }

	//Get Advsearch profile
	model.advsearchAspects = remote.call("/form-builder/search-config/get-profile-properties");

	if(siteid) doSiteStuff();
}

main();
