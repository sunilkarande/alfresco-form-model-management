<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Form Builder</title>
	<link rel="stylesheet" href="/alfresco/css/form-builder/formBuilder.css">
	<link rel="stylesheet" href="/alfresco/css/form-builder/common.css">
	<script type="text/javascript">
		var jsonModel = '${json!}';
		var fmAspectName = "${aspectName!}";
		var fmModelObj = eval("(" + jsonModel + ")");
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
		<ul>
			<#list aspectList as aspect>
				<li>
					<a class="<#if args.aspect?exists><#if args.aspect == aspect.name>fm-menu-active</#if></#if>" href="/alfresco/wcs/form-builder/builder?jsonNode=${aspect.rootUid}&aspect=${aspect.name}" style="width:auto!important;"><span>${aspect.title}</span></a>
				</li>
			</#list>
		</ul>
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
								<li><a href="#tabs-3">Add Fields</a></li>
							</ul>
							<div class="toolBox">
								<div id="tabs-1">
								<div id="accordion-tab1">
										<h3><a href="#">Aspect Description</a></h3>
										<div>
											<label>Aspect Label:</label><br>
											<input id="formName" name="prg-aspectlabel" class="prg-aspectlabel" type="text" value="Aspect Name"/>

											<label>Description:</label>
											<textarea name="prg-desc" class="prg-desc">your description goes here</textarea><br>
										</div>

										<h3><a href="#">Form Style</a></h3>
										<div>
											<label>Form CSS Class:</label><br>
											<input id="formClass" name="prg-formclass" class="prg-formclass" type="text" value=""/>

											<label>Field Alignment:</label><br>
											<select name="prg-form-format" class="frmFormat">
												<option value="top">Label on top</option>
												<option value="left">Left Align</option>
												<option value="right">Right Align</option>
											</select>

										</div>

										<h3><a href="#">Alfresco Properties</a></h3>
										<div>
											<label>Aspect Name:</label><br>
											<select name="prg-aspectprefix" class="prg-aspectprefix fld-small tip-fld"></select>
											<input name="prg-aspectname" class="prg-aspectname fld-med tip-fld" type="text" value=""/>
	 										<div class="field-tip" style=" padding-bottom: 18px;"><span>prefix</span>name</div>
											<div class="aspect-name-tip stage-tip"></div>
										</div>

									 </div>
								</div>
								<div id="tabs-3" class="fieldAddOptions">
									<span style="font-weight:bold; font-size:12px; padding-bottom:5px; display:block">Form Fields:</span>
									<a href="#" id="t_text">Text Field</a>
									<a href="#" id="t_textarea">Paragraph</a>
									<a href="#" id="t_select">Drop Down</a>
									<a href="#" id="t_radio">Multiple Choice</a>
									<a href="#" id="t_checkbox">Checkboxes</a>
									<div style="padding-top:10px;">
									<span style="font-weight:bold; font-size:12px; padding-bottom:5px; display:block">Pre-defined Fields:</span>

									<a href="#" id="t_sliderval">Slider via dropdown</a>
									<a href="#" id="t_slider">Questionaire Slider</a>
	                                </div>
								</div>
								<div id="tabs-2" class="fieldProps">
									<div id="accordion">
										<h3><a href="#">Field Options</a></h3>
										<div>
											<label>Field Label:</label><br>
											<input type="text" class="prg_fieldLabel" value="" /><br>

											<label>Help Tip:</label><br>
											<input type="text" class="prg_tipLabel" value="" /><br>

											<span class="quiz-labels" style="display:none">
												<label>Left Label:</label><br>
												<input type="text" class="prg_quiz_left" value="" /><br>

												<label>Right Label:</label><br>
												<input type="text" class="prg_quiz_right" value="" /><br>
											</span>
										</div>


										<h3><a href="#">Validation</a></h3>
										<div>
											 <#include "validation-list.ftl" />
										</div>

										<h3 class="optionsMenu" style="display:none"><a href="#">Options</a></h3>
										<div>
											<label>Add Options here:</label><br>
											<ul class="optionSortable">

											</ul>
										  <a href="#" class="addClient addOption">Add Option</a><br>
											<hr>
											<label>or Populate from a script</label><br>
											<input type="text" class="prg_pop_script" value="" />
										</div>

										<h3><a href="#">Alfresco Properties</a></h3>
										<div>
											<label>Property Name:</label><br>
											<select name="prg-aspectprefix" class="frm-alf-property-prefix fld-small tip-fld"></select>

											<input type="text" class="frm-alf-property-name fld-med tip-fld" value="" style="width: 176px;" />
											<div class="field-tip" style=" padding-bottom: 18px;"><span>prefix</span>name</div>

											<label>Type:</label><br>
											<select name="frm-alf-type-prefix" class="frm-alf-type-prefix fld-small tip-fld"></select>
											<select name="prg-frm-alf-types" class="frm-alf-type fld-med tip-fld" style="width:108px!important;">
												<option value="text">Text</option>
												<option value="content">Content</option>
												<option value="int">Int</option>
												<option value="long">Long</option>
												<option value="float">Float</option>
												<option value="double">Double</option>
												<option value="date">Date</option>
												<option value="datetime">Datetime</option>
												<option value="boolean">Boolean</option>
												<option value="qname">Qname</option>
												<option value="category">Category</option>
												<option value="noderef">Noderef</option>
												<option value="path">Path</option>
												<option value="any">Any</option>
											</select>
											<div class="field-tip"><span>prefix</span>name</div>

										</div>
									</div>
									</div>
								</div>
							</div>
							</form>
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

<#if aspectName?exists && json?exists>
<script type="text/javascript" src="/alfresco/scripts/form-builder/validation.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/form.jquery.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/tools.js"></script>
<script type="text/javascript" src="/alfresco/scripts/form-builder/builder.js"></script>

<script type="text/javascript">
	$(function(){
		//Load form and apply save button trigger
		var aspectArr = [ getAspect(fmModelObj, fmAspectName) ];
		//jsonToForm(aspectArr , true, $('.formContainerStage'));

		$('.formContainerStage').form({
			'useShareProxy':false,
			'aspects': aspectArr,
			'onComplete': function(){
				$('#formName').val($('#formFormat .frm_formName').text() );
				$('.prg-desc').val($('.frm_desc').html());
				$('.frmFormat').val( $('#formFormat').attr("class") );
				$('.prg-formclass').val( $(".formContainerStage form").attr("class") );
			}
		});

		$('.frmSaveButton').mouseup(function(){
			var aspectToSave = formToJson();
			saveAspectToObj(fmModelObj, aspectToSave);
		});
	});
</script>
</#if>
</body>
</html>


