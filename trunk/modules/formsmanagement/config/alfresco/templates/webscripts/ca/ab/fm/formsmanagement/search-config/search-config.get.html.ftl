<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Search Configuration - Form Builder</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/model-manager/manager.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/profiles/profile.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/forms.css">

	<script type="text/javascript">
		var advsearchProfile = ${settings.content};
	</script>
</head>
<body>
<#assign menu = "search-config" >
<ul class="hiddenList" style="display:none" ></ul>
<input type="hidden" class="doc-list-active" value="${settings.id}" />

<div class="infoMessage saving" style="display:none">
	<span>Please wait...</span>
</div>

<div class="sticky-wrapper ${args.style!}">
	<#include "*/global/header.ftl" />

	<div class="fm-header">
		<div class="saveButtonWrapper">
				<div class="jfk-button-standard jfk-button fmPreview">
					<span>Preview</span>
				</div>
				<div class="jfk-button-standard jfk-button frmSaveButton">
					<span id="alfSaveForm">Save</span>
				</div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div style="padding-top:6px;"><a href="javascript: history.go(-1)">cancel</a></div>
		</div>
		<div class="fm-title"><span>Advanced Search Configuration</span><span class="fm-filename">Profile builder</span></div>
		<p class="clear"></p>

	</div>
	<div class="">
		<div class="fm-dialog-body">
			<h2>Profile Properties</h2>
		</div>
		<div class="aspect-picker-wrapper">

			<div class="fm-aspect-available">
				<span>Available Aspects:</span>
				<ul class="connectedSortable"></ul>
			</div>
			<div class="fm-aspect-assigned">
				<span>Assigned to Profile:</span>
				<ul class="connectedSortable"></ul>
			</div>
			<p class="clear"></p>

		</div>

	</div>
	<div class="push"></div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/search/search-builder.js"></script>

<script type="text/javascript">
	/* Filter for aspects */
	var My={};My.List={Filter:function(inputSelector,listSelector){var inp,rgx=new RegExp(),titles=$(listSelector),keys;if(titles.length===0){return false;}keys=[13,27,32,37,38,39,40];$(inputSelector).bind("keyup",function(e){if(jQuery.inArray(e.keyCode,keys)>=0){return false;}inp=$(this).attr("value");try{rgx.compile(inp,"im");for(var i=0;i<titles.length;i++){if(rgx.source!==""&&!rgx.test(titles[i].innerHTML)){titles[i].parentNode.style.display="none";}else{titles[i].parentNode.style.display="";}}}catch(e){}});}};$(document).ready(function(){My.List.Filter("input#search_filter","#titles>ul>li>a");});
</script>
</body>
</html>


