<#include "../component.head.inc">
<!-- Form Assets -->
<link rel="stylesheet" type="text/css" href="${page.url.context}/res/yui/calendar/assets/calendar.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/object-finder/object-finder.css" />
<@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/form/form.css" />

<#if config.global.forms?exists && config.global.forms.dependencies?exists && config.global.forms.dependencies.css?exists>
<#list config.global.forms.dependencies.css as cssFile>
<link rel="stylesheet" type="text/css" href="${page.url.context}/res${cssFile}" />
</#list>
</#if>

<@script type="text/javascript" src="${page.url.context}/res/components/form/form.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/date.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/date-picker.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/period.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/object-finder/object-finder.js"></@script>
<script type="text/javascript" src="${page.url.context}/res/yui/calendar/calendar-${DEBUG?string("debug", "min")}.js"></script>
<script type="text/javascript" src="${page.url.context}/res/modules/editors/tiny_mce/tiny_mce${DEBUG?string("_src", "")}.js"></script>
<@script type="text/javascript" src="${page.url.context}/res/modules/editors/tiny_mce.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/rich-text.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/content.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/workflow/transitions.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/workflow/activiti-transitions.js"></@script>
<@script type="text/javascript" src="${page.url.context}/res/components/form/jmx/operations.js"></@script>

<#if config.global.forms?exists && config.global.forms.dependencies?exists && config.global.forms.dependencies.js?exists>
<#list config.global.forms.dependencies.js as jsFile>
<script type="text/javascript" src="${page.url.context}/res${jsFile}"></script>
</#list>
</#if>

<#if page.url.args.formId?exists>
	<!-- NOT SPECIFIC FORM -->
<#else>
	<#if page.url.args.nodeRef?exists && page.url.args.nodeRef != "">
		<link rel="stylesheet" type="text/css" href="/alfresco/css/form-builder/share/forms.css"  />
		<link rel="stylesheet" type="text/css" href="/alfresco/css/form-builder/share/search.css" />
		<link rel="stylesheet" type="text/css" href="/alfresco/css/form-builder/jquery/jquery-ui.css" />
		<#if url.uri?ends_with("document-details") >
			<link rel="stylesheet" type="text/css" href="/alfresco/css/form-builder/share/document-details.css" />
		</#if>
		<style type="text/css">
			.share-form .form-container .form-fields { border:0!important;}
		</style>
		<script src="/alfresco/scripts/form-builder/jquery.js" type="text/javascript"></script>
		<script src="/alfresco/scripts/form-builder/jquery.ui.js" type="text/javascript"></script>
		<script type="text/javascript" src="/alfresco/scripts/form-builder/jquery.live.js"></script>
		<script type="text/javascript" src="/alfresco/scripts/form-builder/validation.js"></script>
		<script type="text/javascript" src="/alfresco/scripts/form-builder/form.jquery.js"></script>

		<script type="text/javascript">

			var readonly = true;
			<#if url.uri?ends_with("edit-metadata") >
				readonly = false;
			</#if>

			function initForm()
			{
				//Added in use of Share constants
				//Keeping in the HTML input as you can change it when ever you see fit; More flexible
				var thisSiteid = "";
				try {
					thisSiteid = Alfresco.constants.SITE;
					$('.fm-site-id').val(thisSiteid + "-site");
				}
				catch(err){
					//Fail silently
				}

				if( $('.fm-profile').length > 0)
				{
					 /*  Traditional method */
					 $('.fm-profile').form({
						 'drawOptions': {
							'nodeRef': $('#nodeRef:last').val(),
							'drawNodeAspects': true
						},
						'postUrl' : "/share/service/components/form-management/ajax/save",
						'readonly': readonly,
						'onComplete': function(fo){
							if( $('#formFormat').length > 0){
								$('.fm-form-buttons').show();
							}
							$('.fm-profile').form( 'loadNode', $('#nodeRef:last').val() );
						}
					});

					/* Strict method; Use pre-determined aspect collection or profiles
					$.getJSON("/share/proxy/alfresco/model/aspects/aspecttoproperty?aspects=ua_documentTypeAspect", {}, function(jsonObj)
					{
						$('.fm-profile').form({

							<#if url.uri?ends_with("document-details") >customFormStyle: "left",</#if>
							'aspects': jsonObj,
							'postUrl' : "/share/service/components/form-management/ajax/save",
							'readonly': readonly,
							'onComplete': function(fo){
								if( $('#formFormat').length > 0){
									$('.fm-form-buttons').show();
								}
								$('.fm-profile').form( 'loadNode', $('#nodeRef:last').val() );
							}
						});
					}); */
				}
			}
			$(function(){
				setTimeout('initForm()', 1000);
			});
		</script>
		<script src="/alfresco/scripts/form-builder/share/edit-metadata.js" type="text/javascript"></script>
	</#if>
</#if>