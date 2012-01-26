$(function () {  
	collectFormMetaData();
	
	/* FOR TEST PURPOSE ONLY */
	$("#test").live('click', function() {
		collectFormMetaData();
    }); 
  
 });

/* LOAD FORM FROM DB -------------------------------------*/
function collectFormMetaData(){
	$('#my-frm').show();
	$('#formClass').val($('#formBuilderObj > form').attr('class'));
	
	$('.frmFormat').val($('#formFormat').attr('class'));
	
	$('.hasPopScript').each( function(){
		var thisNode = $(this);
		var postScript = thisNode.attr('id');
		 
		$.post(postScript, function(data) {
			thisNode.html(data);
		}); 
	}); 
} 