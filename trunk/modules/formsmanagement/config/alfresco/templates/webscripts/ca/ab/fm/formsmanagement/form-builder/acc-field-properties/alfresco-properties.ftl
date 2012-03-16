<h3 style="${fmNoneAdminStyle}"><a href="#">Alfresco Properties</a></h3>
<div style="${fmNoneAdminStyle}">
	<#assign lbl = [ "Multiple", "Index"]>
	<#assign val = [ "multiple",  "index"]>

	<div class="val-wrapper">
		<!-- CHECKBOXES -->
		<#list lbl as label>
			<div class="val-item">
				<label>${label}</label>
				<div class="i-toggle">
					<div class="i-toggle-slider">
						<span class="i-toggle-on">ON</span>
						<span class="i-toggle-handle">&nbsp; <input type="checkbox" class="prg_${val[label_index]}" value="${val[label_index]}" style="display:none" /></span>
						<span class="i-toggle-off">OFF</span>
						<p class="clear"></p>
					</div>
				</div>
				<p class="clear"></p>
				
				<#if label == "Index">
					<div class="index-sub-cat" style="display:none;">
						<#assign sublbl = [ "Atomic", "Stored", "Tokenized"]>
						<#assign subval = [ "inx-atomic",  "inx-stored", "inx-tokenized"]>
					
						<#list sublbl as sublabel>
							<div class="val-item <#if !sublabel_has_next> last</#if>">
								<label>${sublabel}</label>
								<div class="i-toggle">
									<div class="i-toggle-slider">
										<span class="i-toggle-on">ON</span>
										<span class="i-toggle-handle">&nbsp; <input type="checkbox" class="prg_${subval[sublabel_index]}" value="${subval[sublabel_index]}" style="display:none" /></span>
										<span class="i-toggle-off">OFF</span>
										<p class="clear"></p>
									</div>
								</div>
								<p class="clear"></p>
							</div>
						</#list> 
					</div> 
				</#if>
			</div>
		</#list>
	</div>
	<!-- Index lower category -->
	 
	 
	<div class="alf-props">
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