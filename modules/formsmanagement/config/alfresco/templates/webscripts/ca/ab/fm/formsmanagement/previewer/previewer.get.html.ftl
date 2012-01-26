<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Previewing your metadata profile form - Form Management</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/formBuilder.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<script type="text/javascript">
		var profileModel = '${json!}';
	</script>
</head>
<body>
<input type="hidden" class="uid-model" value="${modeluid!}" />
<input type="hidden" class="uid-json" value="${args.jsonNode!}" />
<#assign menu = "form-builder" >
<div class="infoMessage saving" style="display:none">
	<span>Please wait...</span>
</div>
<div class="sticky-wrapper ${args.style!}">
	<#include "*/global/header.ftl" />

	<div class="fm-header">
		<div class="saveButtonWrapper">
				<select class="doc-type-list">
					<option value=""> - Select a Doc Type List - </option>
					<#list profiles as x>
						<#assign name = x.name?replace(".json", "")>
						<option value="${name}" <#if args.profile?exists><#if args.profile == name>selected="selected"</#if></#if>>${name}</option>
					</#list>
				</select>
		</div>

		<div class="fm-title"><span>Previewer</span><span class="fm-filename">Showing for Doc list: ${args.profile!}</span></div>
		<p class="clear"></p>
	</div>
	<div class="container-wrapper page">
	    <#if ready>
	    <div class="grid_12">
			<div class="demo-doclist hform">
				<p>
					<label>Select a document type:</label>
					<select class="handler" style="width:250px; margin-left:50px; ">
						<option value="">- Select -</option>
						<#list jsonObj as opt>
							<option value="${opt.key}">${opt.label}</option>
						</#list>
					</select>
				</p>
			</div>
	    	<div class="fm-profile"></div>
		</div>
		<#else>
			<div class="fm-info">
				<p>Sorry, we did not get your profile, select a profile from the top list.</p>
			</div>
		</#if>
	</div>
	<div class="push"></div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/validation.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/form.jquery.js"></script>
<script type="text/javascript">
	$(function(){
		$('.fm-profile').form({
			'profile': profileModel,
			'useShareProxy': false
		});
		//
		$('.doc-type-list').change(function(){
			window.location = "/alfresco/wcs/form-builder/previewer?profile=" + $(this).val();
		});
	});
</script>

</body>
</html>


