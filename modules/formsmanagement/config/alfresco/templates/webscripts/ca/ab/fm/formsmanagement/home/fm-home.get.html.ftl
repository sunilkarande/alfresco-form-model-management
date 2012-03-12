<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Home - Form Management</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/model-manager/manager.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/profiles/profile.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/forms.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/home/home.css">
</head>
<body>

<input type="hidden" class="username" value="${person.properties.userName!}" />
<#assign menu = "home" >

<div class="sticky-wrapper">
	<#include "*/global/header.ftl" />

	<div class="fm-header fm-application">
		<div class="fm-title"><span>Form Management Dashboard</span><span class="fm-filename">Welcome, ${person.properties.userName!}</span></div>
		<p class="clear"></p>
	</div> 
	<div class="fm-home-window">
		<#if isFmAdmin>
		<div class="menu-box">
			<div class="menu-box-bg">
			<div class="title">
				<img src="/alfresco/css/form-builder/images/meta.png" alt="Content Model" />
				<span>Manage your content models.</span>
			</div>
			<div class="p"><b>Get technical.</b> Create content models with no effort, no code and time to spare.</div>
			<a href="/alfresco/wcs/form-builder/model-manager">Click here to continue >></a>
			</div>
		</div>
		</#if>
		<div class="menu-box">
			<div class="menu-box-bg">
			<div class="title">
				<img src="/alfresco/css/form-builder/images/form.png" alt="Content Model" />
				<span>Form Building.</span>
			</div>
			<div class="p"><b>Be efficient.</b> Give your data clerks an environment which is usable and guides them along the proccess when needed. </div>
			<a href="/alfresco/wcs/form-builder/builder">Click here to continue >></a>
			</div>
		</div>
		 
		<div class="menu-box">
			<div class="menu-box-bg">
			<div class="title">
				<img src="/alfresco/css/form-builder/images/form_input_select_multiple.png" alt="Content Model" />
				<span>Dropdown Management.</span>
			</div>
			<div class="p"><b>Stay flexible.</b> Use the dropdown manager to manage lists which can be used in your forms over and over again. </div>
			<a href="/alfresco/wcs/form-builder/dropdown-manager">Click here to continue >></a>
			</div>
		</div>
		 
		<div class="menu-box">
			<div class="menu-box-bg">
			<div class="title">
				<img src="/alfresco/css/form-builder/images/meta.png" alt="Content Model" />
				<span>Metadata Profiler.</span>
			</div>
			<div class="p"><b>Create relationships</b> where metadata matters. For example, A document type can dynamically display collections of aspects derrived from the users choice.</div>
			<a href="/alfresco/wcs/form-builder/profiles">Click here to continue >></a>
			</div>
		</div>
		 
		<p class="clear"></p>
	</div>
</div>
</div>
<#include "*/global/footer.ftl" />
<script type="text/javascript" src="/alfresco/scripts/form-builder/dropdown-manager/dropdown.js"></script>

</body>
</html>


