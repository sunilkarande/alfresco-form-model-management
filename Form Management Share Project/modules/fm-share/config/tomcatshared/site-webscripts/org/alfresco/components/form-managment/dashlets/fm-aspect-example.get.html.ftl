<input type="hidden" value="${siteid!}-site" class="fm-site-id" />
<input type="hidden" value="${user.name}" class="fm-username" />
<script type="text/javascript">
	var fmAspects = '${fmAspects!}';
</script>

<div style="display: none;" class="infoMessage saving">
	<span>Saving please Wait...</span>
</div>

<div class="dashlet">
    <div class="title">FM Demo Dashlet</div>
	<div class="body fmDemo">
		<div class="example-form">
			<#if fmAspects == "">
			
				<form id="" class="hform">
				   <div id="formFormat" class="left">
					   <p>Please enter an aspect name or collection of aspects</p>
					   <p>
							<label>Aspect:</label>
							<input type="text" class="aspect-fm" value="" />
							<span class="fld-tip">e.g. (dmo_exampleA~dmo_exampleB)</span>
						</p>
						<p>
							<label>Document UUID:</label>
							<input type="text" class="document-fm" value="" />
							<span class="fld-tip">optional (include workspace)</span>
						</p>
						
						<p>
							<label>&nbsp;</label>
							<input type="button" class="jfk-button jfk-button-standard showFormBtn" style="width:auto!important;" value="Submit" />
						</p>
					</div>
				</form>
		    <#elseif fmAspects != "" && fmNode != "">
				<div class="dmo-info-wrapper">
					<p>Looking at metadata for: ${node.name}
				</div>
			<#else>
				<div class="dmo-info-wrapper">
				    Viewing form(s) for: ${page.url.args.aspect!}<br>
					<a href="?">Click here</a> to go back
				</div>
			</#if>
		</div>
		
		
		<!-- FM FORM DEMO  -->
		
		<div class="fm-demo"></div>
		
		<!-- FM FORM DEMO END -->
		<#if fmAspects != "">
			<div class="fm-button-wrapper">
				<input type="button" class="jfk-button jfk-button-standard fm-save-btn" value="Save Metadata" />
			</div>
		</#if>
	</div>
</div>