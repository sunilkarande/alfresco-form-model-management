var siteid = page.url.templateArgs.site;
var repoSearch = "false";
var allSiteSearch = "false";
var orOperator = "";
var textSearch = "";

model.isAdvSearchProfile = true;
model.keywords = page.url.args.keywords;
model.siteid = siteid;

//Get the search type
if(page.url.args.a == "true"){ allSiteSearch = "true"; model.searchType = "all-sites"; }
else if(page.url.args.r == "true"){ repoSearch = "true"; model.searchType = "repo"; }
else { model.searchType = "site"; }
//Default when no site to all sites
if(!siteid) { model.searchType = "all-sites"; }


if(page.url.args.o == "true") orOperator = "true";
if(page.url.args.t != "") textSearch = page.url.args.t;

//Get Advsearch profile
model.advsearchAspects = remote.call("/form-builder/search-config/get-profile-properties");


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
	if(siteid) doSiteStuff();

	if(page.url.queryString != "")
	{
		var searchApi = remote.call("/fm/search/"+siteid + "?r="+repoSearch+"&a="+allSiteSearch+"&o="+orOperator+"&" + encodeURIComponent( page.url.queryString ) );
			model.results = eval("(" + searchApi + ")");
			model.header = '<tr><th style="width:92px"></th><th>Filename</th><th style="width:137px;">Actions</th></tr>';
	}
}

main();
