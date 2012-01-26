<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Managing your Content Model - Form Management</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/model-manager/manager.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/forms.css">
</head>
<body>

<input type="hidden" class="username" value="${person.properties.userName!}" />
<div class="infoMessage saving" style="display:none">
	<span>Please wait...</span>
</div>
<#assign menu = "model" >
<#include "forms/aspect-properties.ftl" />
<#include "forms/model-properties.ftl" />

<div class="sticky-wrapper">
	<#include "*/global/header.ftl" />

	<div class="fm-header fm-application">
		<div class="saveButtonWrapper">
				<div class="jfk-button-standard jfk-button frmCreateModel">
					<span id="addNewModel">Create a new model</span>
				</div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div style="padding-top:6px;"><a href="#">need help?</a></div>
		</div>
		<div class="fm-title"><span>Model Manager</span><span class="fm-filename">Welcome, ${person.properties.userName!}</span></div>
		<p class="clear"></p>
	</div>
	<div class="model-wrapper">
		<#list models as model>
			<#if model.type == "{http://www.alfresco.org/model/content/1.0}dictionaryModel" || model.type == "{http://www.alfresco.org/model/content/1.0}content">
				<#if model.type == "{http://www.alfresco.org/model/content/1.0}content">
					<#assign isValidatedModel = "not-validated" />
				</#if>
				<div class="fm-model-wrapper ${isValidatedModel!}">
					<div class="fm-tools">
						<div class="jfk-button-standard jfk-button addAspect">
							<span>Add Aspect</span>
						</div>
						<div class="jfk-button-standard jfk-button editModelProps">
							<span>Edit Properties</span>
						</div>
						<div class="jfk-button-standard jfk-button deleteModel">
							<span>Delete Model</span>
						</div>
						<div class="clear-open"></div>
					</div>
					<div class="fm-model">
						<div class="ico-model"></div>
						<input type="text" class="fm-filename" value="${model.name}" />
						<div class="clear-open"></div>
					</div>
					<div class="clear-open"></div>
					<div class="fm-model-content">
						<div class="clear-open"></div>
					</div>
				</div>
			</#if>
		</#list>

		<div class="fm-model-wrapper plus-buton-wrapper">
			<div class="ico-model-add frmCreateModel" ></div>
		</div>
		<p class="clear"></p>

	</div>
</div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/model-manager/model-validation.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/model-manager/manager.js"></script>

</body>
</html>


