<div class="val-wrapper">
	<#assign lbl = ["Required", "Numbers only", "Alphanumeric", "Verification"]>
	<#assign val = ["required", "numOnly",      "alphanumOnly", "verification"]>

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
		</div>
	</#list>

	<div class="val-item">
		<label>Minimum Length:</label>
		<select name="inputMinLen" class="inputMinLen" style="width:60px!important">
			<option value="">--</option>
			<#assign x=100>
			<#list 1..x as i>
				<option value="${i}">${i}</option>
			</#list>
		</select>
	</div>

	<div class="val-item">
		<label>Maximum Length:</label>
		<select name="inputMaxLen" class="inputMaxLen" style="width:60px!important">
			<option value="">--</option>
			<#list 1..x as i>
				<option value="${i}">${i}</option>
			</#list>

		</select>
	</div>

	<div class="val-item">
		<label>Input mask's:</label>
		<select name="inputMaskList" class="selectMask" style="width:100px;">
			<option value="">- Select -</option>
			<option value="phone">Phone Number</option>
			<option value="phoneext">Phone + Ext</option>
			<option value="sin">SIN Number</option>
			<option value="date">Date</option>
			<option value="other">Other..</option>
		</select>


		<div class="regExpOther" style="display:none;">
		<label>e.g. 999-aaa</label>
		<input type="text" class="regExpOtherFld" value="" />
		</div>
	</div>

</div>