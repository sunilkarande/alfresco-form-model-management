<div id="model-dialog" style="display:none">
	<form class="hform fmCreateModelForm">
		<div class="fm-dialog-body">
			<a href="#" class="fm-close-dialog top-right-x">X</a>
			<h2>Model Properties</h2>
			<div class="errBox error-submission" style="display:none;">
				<p>There were some issues creating the model:</p>
				<ul></ul>
			</div>
			<div class="errBox error-model" style="display:none;">
				<p>There were some issues with your form:</p>
				<ul></ul>
			</div>
			<p>
				<label>Name*:</label>
				<input type="text" class="fm-model-name required" value="" />
			</p>
			<p>
				<label>Namespace Prefix*:</label>
				<input type="text" class="fm-model-prefix fm-medium required" value="" />
			</p>

			<div class="table-wrapper">
				<span>Imports:</span>
				<table class="multiRow fm-imports">
					<thead>
						<tr>
							<th style="width:50px;">Prefix</th>
							<th>URI</th>
							<th style="width:20px;"><a href="#" class="ico-add fmAddRow"><span>Add<span></a></th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>

			<div class="table-wrapper">
				<span>Namespaces:</span>
				<table class="multiRow fm-namespaces">
					<thead>
						<tr>
							<th style="width:50px;">Prefix</th>
							<th>URI</th>
							<th style="width:20px;"><a href="#" class="ico-add fmAddRow"><span>Add</span></a></th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>

			</div>
		</div>
		<div class="fm-button-wrapper">
				<div style="padding-top:6px;"><a href="#" class="fm-close-dialog">cancel</a></div>
				<div style="padding-top:6px; margin-right:10px">or</div>
				<div class="jfk-button-standard jfk-button fmCreateModel">
					<span>Save</span>
				</div>
				<p class="clear"></p>
		</div>
	</form>
</div>