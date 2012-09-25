<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Creating a metadata profile - Form Management</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/model-manager/manager.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/profiles/profile.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/forms.css">
</head>
<body>

<input type="hidden" class="username" value="${person.properties.userName!}" />
<div class="infoMessage saving" style="display:none">
	<span>Please wait...</span>
</div>
<ul class="hiddenList" style="display:none" ></ul>
<input type="hidden" class="key-active" value="0" />

<#include "forms/profile-properties.ftl" />
<#assign menu = "profile" >

<div class="sticky-wrapper">
	<#include "*/global/header.ftl" />

	<div class="fm-header fm-application">
		<div class="saveButtonWrapper">
			<div class="jfk-button-standard jfk-button manageLists">
				<span> Manage dropdown lists</span>
			</div>
			<div style="padding-top:6px; margin-right:10px" class="" >or</div>
			<div style="padding-top:6px;"><a href="#">need help?</a></div>
		</div>
		<div class="fm-title"><span>Metadata Profiles</span><span class="fm-filename">Welcome, ${person.properties.userName!}</span></div>
		<p class="clear"></p>
	</div>
	<div class="fm-sidebar">
		<div class="fm-title-bar"><span>Document type lists:</span></div>
		<ul>
			<#list models as model>
			<#if model.type == "{http://www.alfresco.org/model/content/1.0}content">
				<#if model.name != "advsearch.json">
					<li><a id="${model.id}" style="width:auto!important;" href="/alfresco/d/d/workspace/SpacesStore/${model.id}/${model.name}" href="#" class="docList" ><span>${model.name?replace(".json", "")}</span></a></li>
				</#if>
			</#if>
		</#list>

		</ul>
	</div>
	<div class="fm-main-window">
		<div class="fm-info">
			<p>To manage your metadata profile, select your document type from the menu on the left.</p>
		</div>
		<div class="fm-aspect-manager" style="display:none;">
			<div style="padding-left: 16px; padding-right: 16px;">
				<h2 style=" margin-bottom: 27px !important;">Profile: </h2>
				<div class="fm-example help">
					<span>Each dropdown value in your list can have a metadata profile attached to it. We can show different groups of aspects dependant on the users choice. </span>
				</div>
			</div>
			<div class="fm-aspect-manager-inject clearfix"></div>
		</div>
	</div>
</div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/profiles/profile.js"></script>

</body>
</html>


