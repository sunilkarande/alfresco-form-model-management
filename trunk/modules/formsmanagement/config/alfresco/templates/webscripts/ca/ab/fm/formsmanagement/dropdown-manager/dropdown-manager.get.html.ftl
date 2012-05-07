<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Managing your dropdown lists - Form Management</title>
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
<#include "forms/file-properties.ftl" />
<#assign menu = "drop" >

<div class="sticky-wrapper">
	<#include "*/global/header.ftl" />

	<div class="fm-header fm-application">
		<div class="saveButtonWrapper">
				<div class="jfk-button-standard jfk-button frmCreateModel">
					<span id="addNewModel">Create a new dropdown</span>
				</div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div style="padding-top:6px;"><a href="#">need help?</a></div>
		</div>
		<div class="fm-title"><span>Dropdown Managment</span><span class="fm-filename">Welcome, ${person.properties.userName!}</span></div>
		<p class="clear"></p>
	</div>
	<div class="fm-sidebar fm-sidebar-dropdown">
		<div class="fm-title-bar "><span>Dropdown Menus:</span></div>
		<div style="margin: 0pt; overflow-x: hidden; overflow-y: auto; padding: 0pt;">
		<ul>
			<#list models as model>
				<#if model.type == "{http://www.alfresco.org/model/content/1.0}content">
					<li>
						<a href="#" class="ico-del delFile">&nbsp;</a>
						<a id="${model.id}" href="/alfresco/d/d/workspace/SpacesStore/${model.id}/${model.name}" href="#" class="docList" ><span>${model.name?replace(".json", "")}</span></a>
						<p class="clear"></p>
					</li>
				</#if>
			</#list>
		</ul>
		</div>
	</div>
	<div class="fm-main-window">
		<div class="fm-info">
			<p>To manage your Dropdown lists, select your Dropdown Menu from the menu on the left.</p>
		</div>
		<div class="fm-dd-manager fm-body-inner" style="display:none">
			<form class="hform">
				<div class="fm-dialog-body">
					<h2>Dropdown menu values</h2>

					<div class="fm-example help">
						<span>Change your dropdown list and see an example of your changes here:</span>
						<select class="fm-dd-demo">
							<option value="">- Select demo -</option>
						</select>
						<div><a style="display:inline-block; margin-right:30px;" href="#" class="fileLink" target="_blank">Alfresco file URL</a><a style="display:inline-block; margin-right:30px;" href="#" class="shareLink" target="_blank">Share file URL</a></div>


					</div>

					<ul class="fld-title">
						<li><span class="fld-lbl">Label: <small class="tip-grey">(Text shown in the list)</small></span>
							<span class="fld-val">Value: <small class="tip-grey">(Value saved when option is selected)</small></span> <a href="#" class="ico-add addRow">&nbsp;</a></li>
					</ul>
					<ul class="fld-manager ui-sortable" style="">
					</ul>
				</div>

				<div class="jfk-button-standard jfk-button fmDdSave" style="width:100px;  margin-left: 20px;">
					<span>Save</span>
				</div>
				<p class="clear"></p>

			</form>
		</div>
	</div>
</div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/dropdown-manager/dropdown.js"></script>

</body>
</html>


