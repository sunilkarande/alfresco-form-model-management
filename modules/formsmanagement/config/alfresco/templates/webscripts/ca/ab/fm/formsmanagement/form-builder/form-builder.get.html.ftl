<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Form Builder</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/formBuilder.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<style type="text/css">
		.alf-dummy-group { background:#FFEBB7; }
	</style>
	<script type="text/javascript" >
		//Fake alfresco util object
		//This fixes the Alfresco.util.RichEditorManager.addEditor does not exist when tiny_mce is initialized in this webscript.
		var Alfresco = {};
			Alfresco.util = {};
			Alfresco.util.RichEditorManager= {};
			Alfresco.util.RichEditorManager.addEditor = (function(){});
	</script>

	<!--  Start TINY MCE -->
	<link rel="stylesheet" href="/share/res/modules/editors/tiny_mce/themes/advanced/skins/default/ui.css">
	<script src="/share/res/modules/editors/tiny_mce/tiny_mce.js" type="text/javascript"></script>
	<script src="/share/res/modules/editors/tiny_mce-min.js" type="text/javascript"></script>
	<!--  END TINY CMCE  -->

	<script type="text/javascript">
		var fmModelObj = ${json!};
		var fmAspectName = "${aspectName!}";
	</script>
</head>
<body>
<#assign fmNoneAdminStyle = "" />
<#if !isFmAdmin><#assign fmNoneAdminStyle = "display:none;" /></#if>

<div class="field-change-popup" style="display:none;">
	<#list formFields as field>
	<a href="#" id="${field.id}">${field.label}</a>
	</#list>
	<#list predefinedFields as field>
	<a href="#" id="${field.id}">${field.label}</a>
	</#list>
</div>
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
				<div class="jfk-button-standard jfk-button ico-btn" onClick="javascript: history.go(-1)">
					<span class="ico-back-btn">&nbsp;</span>
				</div>
				<div class="jfk-button-standard jfk-button frmSaveButton">
					<span id="alfSaveForm">Save</span>
				</div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div style="padding-top:6px;"><a href="javascript: history.go(-1)">cancel</a></div>
		</div>
		<div class="fm-title"><span>Aspect form builder</span><span class="fm-filename"></span></div>
		<p class="clear"></p>

	</div>

	<div class="fm-sidebar">
		<div class="fm-title-bar"><span>Available Aspects:</span></div>
		<div class="fm-search-aspects">
			<input type="text" name="filter" id="search_filter" />
		</div>
		<div id="titles">
			<ul>
				<#list aspectList as aspect>
					<li>
						<a class="<#if args.aspect?exists><#if args.aspect == aspect.name>fm-menu-active</#if></#if>" href="/alfresco/wcs/form-builder/builder?jsonNode=${aspect.rootUid}&aspect=${aspect.name}" style="width:auto!important;"><span>${aspect.title}</span></a>
					</li>
				</#list>
			</ul>
		</div>
	</div>
	<div class="fm-main-window">
	    <#if ready>
	    <div class="grid_12">
	        <div class="formContainerClear">
	             <div class="contentWrapper">
				  <div class="formBuilderContainer">
						<form class="frmBuilder">
						<input type="hidden" class="indexCount" name="indexCount" value=""/>
						<div id="formToolWrapper">
							<ul class="clearfix formTabs">
								<li><a href="#tabs-1">Aspect Options</a></li>
								<li><a href="#tabs-2">Field Properties</a></li>
								<li style="${fmNoneAdminStyle}"><a href="#tabs-3">Add Fields</a></li>
							</ul>
							<div class="toolBox">
								<div id="tabs-1">
									<div id="accordion-tab1">
										<#include "acc-aspect-properties/aspect-description.ftl" />
										<#include "acc-aspect-properties/form-style.ftl" />
										<#include "acc-aspect-properties/alfresco-properties.ftl" />
									 </div>
								</div>
								<div id="tabs-3" class="fieldAddOptions">
									<span style="font-weight:bold; font-size:12px; padding-bottom:5px; display:block">Form Fields:</span>
									<#list formFields as field>
										<a href="#" id="${field.id}">${field.label}</a>
									</#list>
									<div style="padding-top:10px;">
									<span style="font-weight:bold; font-size:12px; padding-bottom:5px; display:block">Pre-defined Fields:</span>
									<#list predefinedFields as field>
										<a href="#" id="${field.id}">${field.label}</a>
									</#list>
	                                </div>
								</div>
								<div id="tabs-2" class="fieldProps">
									<div id="accordion">
										<#include "acc-field-properties/field-options.ftl" />
										<#include "acc-field-properties/validation-list.ftl" />
										<#include "acc-field-properties/dropdown-options.ftl" />
										<#include "acc-field-properties/alfresco-properties.ftl" />
									</div>
									</div>
								</div>
							</div>
							</form>
						</div>

					<div class="fm-errBox" style="display:none;">
						<p>There were some errors with your form:</p>
						<ul></ul>
					</div>
					<div class="formContainerStage" id="formBuilderObj">
						<form name="" class="message" id="my-frm" method="POST">
							<div class="top" id="formFormat">
							<div class="f_b_root">
								<div class="errHandleBox" style="display:none">
									<p>There are some errors with your form:</p>
									<ul>
									  <li></li>
									</ul>
								</div>

								<h1 style="margin:0;" class="frm_formName">Your Form</h1>
								<span class="frm_desc">your description goes here</span>
							</div>

							<input name="prg-frm-redirect" class="prg-frm-redirect" type="hidden" value=""/>
							<input id="modelName" type="hidden" value="" />
	                        </div>
						</form>
						<div class="outputMessage" style="display:none"><h1>Thank you</h1><p>Your message here</p></div>
					</div>
					<p class="clear"/>
					</div>
	            </div>
	        </div>
		</div>
		<#else>
			<div class="fm-info">
				<p>To manage your forms first select an aspect on the left.</p>
			</div>
		</#if>
	</div>
	<div class="push"></div>
</div>
<#include "*/global/footer.ftl" />


<script type="text/javascript" src="/alfresco/scripts/form-builder/validation.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/form.jquery.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/builder.js"></script>
	<#if aspectName?exists && json?exists>
	<script type="text/javascript" src="/alfresco/scripts/form-builder/tools.js"></script>
	<script type="text/javascript">
		$(function(){
			//Load form and apply save button trigger
			var aspectArr = [ getAspect(fmModelObj, fmAspectName) ];
			//jsonToForm(aspectArr , true, $('.formContainerStage'));

			$('.formContainerStage').form({
				'demoMode' : true,
				'useShareProxy':false,
				'aspects': aspectArr,
				'onComplete': function(){
					$('#formName').val($('#formFormat .frm_formName').text() );
					$('.prg-desc').val($('.frm_desc').html());
					$('.frmFormat').val( $('#formFormat').attr("class") );
					$('.prg-formclass').val( $(".formContainerStage form").attr("class") );

					if( $('#formFormat').hasClass('fm-aspect-hidden') ){
						$('.prg_aspect_hidden').attr("checked", "checked");
					}else{
						$('.prg_aspect_hidden').attr("checked", "");
					}
					loadToggleAspectValues();

					$(".f_b_root").sortable({
						items: '.group', distance:20
					}).disableSelection();

				}
			});

		});
	</script>
</#if>
<script type="text/javascript">
	/* Filter for aspects */
	var My={};My.List={Filter:function(inputSelector,listSelector){var inp,rgx=new RegExp(),titles=$(listSelector),keys;if(titles.length===0){return false;}keys=[13,27,32,37,38,39,40];$(inputSelector).bind("keyup",function(e){if(jQuery.inArray(e.keyCode,keys)>=0){return false;}inp=$(this).attr("value");try{rgx.compile(inp,"im");for(var i=0;i<titles.length;i++){if(rgx.source!==""&&!rgx.test(titles[i].innerHTML)){titles[i].parentNode.style.display="none";}else{titles[i].parentNode.style.display="";}}}catch(e){}});}};$(document).ready(function(){My.List.Filter("input#search_filter","#titles>ul>li>a");});
</script>
</body>
</html>


