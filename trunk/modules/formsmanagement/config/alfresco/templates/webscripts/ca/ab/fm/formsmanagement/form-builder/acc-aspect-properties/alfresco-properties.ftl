<h3 style="${fmNoneAdminStyle}"><a href="#">Alfresco Properties</a></h3>
<div style="${fmNoneAdminStyle}" class="val-wrapper">
	<#assign lbl = [ "Hidden <small>(using: drawOptions)</small>"]>
	<#assign val = [ "hidden"]>

	<!-- CHECKBOXES -->
	<#list lbl as label>
		<div class="val-item">
			<label>${label}</label>
			<div class="i-toggle i-toggle-aspect">
				<div class="i-toggle-slider">
					<span class="i-toggle-on">ON</span>
					<span class="i-toggle-handle">&nbsp; <input type="checkbox" class="prg_aspect_${val[label_index]}" value="${val[label_index]}" style="display:none" /></span>
					<span class="i-toggle-off">OFF</span>
					<p class="clear"></p>
				</div>
			</div>
			<p class="clear"></p>
		</div>
	</#list>

	<div style="padding-top:10px;">
		<label>Aspect Name:</label><br>
		<select name="prg-aspectprefix" class="prg-aspectprefix fld-small tip-fld"></select>
		<input name="prg-aspectprefix" type="text" class="prg-aspectprefix-text tip-fld" style="width: 53px !important; display:none" value="">

		<input name="prg-aspectname" class="prg-aspectname fld-med tip-fld" type="text" value=""/>
		<div class="field-tip" style=" padding-bottom: 18px;"><span>prefix</span>name</div>
		<div class="aspect-name-tip stage-tip"></div>
	</div>
</div>