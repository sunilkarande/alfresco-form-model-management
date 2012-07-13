<link rel="stylesheet" href="/share/css/form-management/jquery/jquery-ui.css" />
<link rel="stylesheet" href="/share/css/form-management/screen.css" />

<script type="text/javascript" src="/share/js/form-management/jquery.js"></script>
<script type="text/javascript" src="/share/js/form-management/jquery-ui.js"></script>
<script src="/alfresco/scripts/form-builder/jquery.live.js" type="text/javascript"></script>

<!-- FORM MANAGEMENT TOOL -->
<script src="/alfresco/scripts/form-builder/validation.js" type="text/javascript"></script>
<script src="/alfresco/scripts/form-builder/form.jquery.js" type="text/javascript"></script>
<!-- END FORM MANAGEMENT TOOL -->

<!-- FORM DEMO JS -->
<script src="/share/js/form-management/demo.js" type="text/javascript"></script>


<!-- DEMO STUFF -->
<script type="text/javascript">
function postFormSave(formNode, postOptions, callback){

	postOptions.createFilename = $('.eFilename').val();
	$('.dialog-metadata').dialog("close");

	$('.infoMessage span').html("Please wait...");
	$('.infoMessage').removeClass("good").center();
	$('.infoMessage').fadeIn(300).center();

	formNode.form("save", postOptions, function(r){
		if (callback){
			callback();
		}else{
			$('.infoMessage span').html(""+r.success + " item(s) saved successfully. " + r.failed + " item(s) failed.");
			$('.infoMessage').center();
			setTimeout( '$(".infoMessage").fadeOut(300, function(){  }); ', 2000 );
		}
	});
}

$(function(){
	$('.fm-demo').form({
		'aspects': eval("(" + fmAspects + ")" ),
		'postUrl' : "/share/service/components/form-management/ajax/save"
		<#if page.url.args.node?exists && page.url.args.node != "">
		 ,'onComplete':function(){

			$('.fm-demo').form( 'loadNode', '${page.url.args.node}');
			$('.fm-save-btn').addClass('node-loaded');
		}
		</#if>
	});

	$('.fm-save-btn').click(function(){
		var valid = true;
			valid = validateForm($('.fm-demo'));

		//If we have a document allow for save
		if($(this).hasClass('node-loaded') && valid){
			var postOptions = {};
				var nodeId = '${page.url.args.node!}';  //Node id to save data to
				postOptions.nodeId = nodeId.replace("workspace://SpacesStore/", "");    //On the save side i thought i done a check for defaulting workspace
				postOptions.moveId = "";   //Optional move node to destination UID after save

			postFormSave( $('.fm-demo'), postOptions);
		}else if(valid){
			alert("Save data alert (we have no node to save to)");
		}
	});

});
</script>