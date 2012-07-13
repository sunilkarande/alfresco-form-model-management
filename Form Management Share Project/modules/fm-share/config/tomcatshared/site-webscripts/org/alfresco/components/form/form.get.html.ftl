<#import "form.lib.ftl" as formLib />
<div id="fmEditMetadata" class="forms-wrapper clearfix">
	<div class="form-alf-wrapper">
		<#if error?exists>
		   <div class="error">${error}</div>
		<#elseif form?exists>
			<#assign formId=args.htmlid?js_string + "-form">
			<#assign formUI><#if args.formUI??>${args.formUI}<#else>true</#if></#assign>

			<#if form.viewTemplate?? && form.mode == "view">
				<#include "${form.viewTemplate}" />
			<#elseif form.editTemplate?? && form.mode == "edit">
				<#include "${form.editTemplate}" />
			<#elseif form.createTemplate?? && form.mode == "create">
				<#include "${form.createTemplate}" />
			<#else>
				<#if formUI == "true">
					<@formLib.renderFormsRuntime formId=formId />
				</#if>

				<@formLib.renderFormContainer formId=formId>
					<#list form.structure as item>
						<#if item.kind == "set">
						<@formLib.renderSet set=item />
						<#else>
							<@formLib.renderField field=form.fields[item.id] />
						</#if>
					</#list>
				</@>
			</#if>
		<#else>
		   <div class="form-container">${msg("form.not.present")}</div>
		</#if>
	</div>

	<!-- *********************************************************
		 FORM MANAGEMENT
		*********************************************************
	-->
	<#if args.itemId?exists>
		<#assign iNodeRef = args.itemId>
	</#if>

	<#if page?exists>
		<#if page.url.args.nodeRef?exists>
			<#assign iNodeRef = page.url.args.nodeRef>
		</#if>
		<#if page.url.templateArgs.site?exists><#assign iSiteId = page.url.templateArgs.site /></#if>
	</#if>

	<#if form.mode == "edit" || form.mode == "view">

			<#if iNodeRef?exists>
				<input type="hidden" id="nodeRef" value="${iNodeRef}" />
				<#if iSiteId?exists>
					<input type="hidden" class="fm-site-id" value="${iSiteId!}-site" />
				</#if>

				<div style="display: none;" class="infoMessage saving">
					<span>Saving please Wait...</span>
				</div>

				<div class="fm-edit-metadata <#if form.mode == "view">fmViewMode</#if>">
					<div class="fm-profile"></div>

					<div class="fm-form-buttons">
						<span class="yui-button yui-push-button" id="saveMetadataBtn">
							<span class="first-child">
								<button type="button" tabindex="0" id="saveMetadata" name="-">Save</button>
							</span>
						</span>
						<span class="yui-button yui-push-button" id="cancelMetadataBtn">
							<span class="first-child">
								<button type="button" tabindex="0" id="cancelMetadata" name="-">Cancel</button>
							</span>
						</span>
					</div>
				</div>
				<p class="clear"></p>

			</#if>
	</#if>

</div>
