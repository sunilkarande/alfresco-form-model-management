<div id="profile-dialog" style="display:none">
	<form class="hform fmProfileForm">
		<div class="fm-dialog-body">
			<a href="#" class="fm-close-dialog top-right-x">X</a>
			<h2>Profile Properties</h2>
			<div class="errBox error-model" style="display:none;">
				<p>Please check all required fields.</p>
				<ul></ul>
			</div>
			
			<p>
				<label>Title</label>
				<input type="text" class="fm-profile-title required" value="" />
			</p>
			<p>
				<label>Description</label>
				<input type="text" class="fm-profile-description required" value="" />
			</p>
		</div>
		<div class="aspect-picker-wrapper">

			<div class="fm-aspect-available">
				<span>Available Aspects:</span>
				<ul class="connectedSortable"></ul>
			</div>
			<div class="fm-aspect-assigned">
				<span>Assigned to Profile:</span>
				<ul class="connectedSortable"></ul>
			</div>
			<p class="clear"></p>

		</div>

		<div class="fm-button-wrapper">
				<div style="padding-top:6px;"><a href="#" class="fm-close-dialog">cancel</a></div>
				<div style="padding-top:6px; margin-right:10px">or</div>

				<div class="jfk-button-standard jfk-button fmProfileSave">
					<span>Save</span>
				</div>
				<div class="jfk-button-standard jfk-button fmPreview">
					<span>Preview</span>
				</div>
				<p class="clear"></p>
		</div>
	</form>
</div>