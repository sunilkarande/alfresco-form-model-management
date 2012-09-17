<div id="aspect-dialog" style="display:none">
	<form class="hform fmCreateAspectForm">
		<div class="fm-dialog-body">
			<a href="#" class="fm-close-dialog top-right-x">X</a>
			<h2>Create a new Aspect</h2>
			<div style="display: none;" class="errBox error-model">
				<p>Please fill out all required fields.</p>
			</div>
			<p>
				<label>Name*:</label>
				<input type="text" class="fm-aspect-name required" value="" />
			</p>
			<p>
				<label>Namespace Prefix*:</label>
				<select class="fm-aspect-prefix required" style="font-size:13px; padding:4px; "></select>
			</p>
			<p>
				<label>Dummy Aspect?</label>
				<input type="checkbox" class="fm-dummy-aspect" value="Y" />
			</p>
		</div>
		<div class="fm-button-wrapper">
				<div style="padding-top:6px;"><a href="#" class="fm-close-dialog">cancel</a></div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div class="jfk-button-standard jfk-button fmCreateAspect">
					<span>Create</span>
				</div>
				<p class="clear"></p>
		</div>
	</form>
</div>