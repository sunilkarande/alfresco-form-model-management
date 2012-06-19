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
			 
			setTimeout( '$(".infoMessage").fadeOut(300, function(){ history.go(-1)  }); ', 1000 ); 
		}
	});
}

$(function(){
	$('#cancelMetadata').click(function(){  
		history.go(-1);
	});
	$('#saveMetadata').click(function(){  
		var valid = validateForm($('.fm-profile'));
		if(valid){
			var postOptions = {};
				postOptions.nodeId = $('#nodeRef').val().replace("workspace://SpacesStore/", "");
				postOptions.moveId = "";
			
			postFormSave($('.fm-profile') , postOptions);
		}
		
	});
	$('.form-alf-wrapper').prepend('<h1 class="frm_formName" style="margin:0;">Basic Metadata</h1><span class="frm_desc">* Required Fields</span>');
		 
	
});

 jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top",  (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}