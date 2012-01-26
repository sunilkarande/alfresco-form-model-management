function validateInternalForm(form){
	var valid = true;
	form.find('.errBox').hide();
	$(".error").removeClass("error");
	
	form.find(".required").each(function(){
		if( $(this).val() == "" ){  
			valid = false;
			$(this).addClass("error"); 
		}
	});
	
	if(!valid)  form.find('.errBox').fadeIn(1000);  
	return valid; 
}

function dropDownValTemplate(key, val){
	var temp = '<div class="fm-model-wrapper" id="drop_val_'+ key +'"><div class="fm-model"><div class="ico-model"></div><input type="text" value="'+val+ '" class="fm-filename"></div>';
	return temp;
}
function populateAspectList(){
	$('.fm-aspect-available ul').html( $('.hiddenList').html());
}
function loadAspectList(){
	var url = "/alfresco/wcs/model/aspects/list";
	$.getJSON(url, {}, function(r){
		var len = r.length;
		for(var i=0; i<len; i++) {
			$('.hiddenList').append('<li id="'+r[i].parent+'" class="'+r[i].namespace+'_'+r[i].name+'">' +r[i].title +'</li>');
		}
	});
}
function loadProfileProperties(key){
	$('.fm-aspect-assigned ul').html("");
	$('.fm-aspect-available li').hide();

	$('.fm-profile-title').val("");
	$('.fm-profile-description').val("");

	populateAspectList();

	if($(".fm-aspect-assigned ul li").length <= 0){
		$('.aspect-picker-wrapper').hide();
		var url = "/alfresco/wcs/profile/get";
		$.getJSON(url, { key:key, uid: $('.doc-list-active').attr("id") }, function(r){

			$('.fm-profile-title').val(r.title);
			$('.fm-profile-description').val(r.description);

			if(r.aspects){
				var len = r.aspects.length;
				for(var i=0; i<len; i++) {
					$('.fm-aspect-available .'+r.aspects[i].name).hide();
					$('.fm-aspect-assigned ul').append('<li id="'+r.aspects[i].parent+'" class="'+r.aspects[i].name+'">' +r.aspects[i].title +'</li>');
				}
			}
			$('.aspect-picker-wrapper').show();
		});
	}
}
$(function(){
	/* Setup */
	loadAspectList();

	$('#profile-dialog').dialog({
	    modal:true,
	    width:700,
	    autoOpen:false,
	    height:'auto',
	    draggable: false,
	    position: ["center", 200]
	});

	$( ".fm-aspect-assigned ul, .fm-aspect-available ul" ).sortable({
		connectWith: ".connectedSortable", items: 'li'
	}).disableSelection();

	/* Events */
	$('.fmPreview').mouseup(function(){
		window.open("/alfresco/wcs/form-builder/previewer?profile=" + $('.doc-list-active').text());
		return false;
	});

	$('.fmProfileSave').mouseup(function(){ 
		var valid = validateInternalForm( $(".fmProfileForm"));
		if(valid){ 
			var profile = {};
			profile.title = $('.fm-profile-title').val();
			profile.description = $('.fm-profile-description').val();
			profile.aspects = [];

			 $('.fm-aspect-assigned ul li').each(function(){
				var aspect = {};
				aspect.name =  $(this).attr('class');
				aspect.parent =  $(this).attr('id');
				aspect.title =  $(this).text();
				profile.aspects.push(aspect);
			 });

			var profile = JSON.stringify( profile );

			$('.infoMessage span').html("Please wait...");
			$('.infoMessage').fadeIn(300);
			$('.infoMessage').center();
			$.ajax({
				type: "POST",
				url: "/alfresco/wcs/constraint/update-profile",
				dataType:"json",
				data:{
				  profile:profile, uid: $('.doc-list-active').attr("id"), key: $('.key-active').val()
				},
				success:function(r){
					$('#profile-dialog').dialog("close");

					if(r.status == 0){
						$('.infoMessage span').html(r.msg);
						$('.infoMessage').addClass("bad").center().fadeOut(5000, function(){
							$('.infoMessage').removeClass("bad");
						});

					}else{
						$('.infoMessage span').html("Saved Successfully");
						$('.infoMessage').addClass("good").center().fadeOut(1000, function(){
							$('.infoMessage').removeClass("good");
						});
					}
				},
				error:function (xhr, ajaxOptions, thrownError){
					alert(xhr.status);
					alert(thrownError);
				}
			});
		}
	});


	$('.fm-close-dialog').click(function(){
	    var dialogName = $(this).parents('.ui-dialog-content:eq(0)').attr("id");
	    $('#' + dialogName).dialog("close");
	    return false;
	  });

	 $('.ico-model').live("click", function(){
	    var key = $(this).parents('.fm-model-wrapper:eq(0)').attr('id').replace("drop_val_", "" );

	    loadProfileProperties(key);

		$('.key-active').val( key );
	    $('#profile-dialog').dialog("open");
     });

	 $('.manageLists').click(function(){
	 	window.location = "/alfresco/wcs/form-builder/dropdown-manager";
	 });
	 $('.docList').click(function(){
		$('.hiddenFirst').show();
		$('.fm-aspect-manager-inject').html("");
		$('.doc-list-active').removeClass('doc-list-active').removeClass('fm-menu-active');
		$(this).addClass('doc-list-active').addClass("fm-menu-active");


		$('.fm-aspect-manager h2:eq(0)').html("Profile: <span>" + $(this).find('span').html() + "</span>");


		var cache = new Date().getTime();
		var url = $(this).attr("href") + "?c=" + cache;

		$.getJSON(url, {}, function(r){
			var len = r.length;

			for(var i=0; i<len; i++) {
				var a = r[i];
				$('.fm-aspect-manager-inject').append( dropDownValTemplate(a.key, a.label) );
				$('.fm-aspect-manager').show();
				$('.fm-info').hide();
  			}
		});
		return false;
	});
});


jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", 200);
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}
$(function(){
	$('.jfk-button').mouseenter(function(){
	   $(this).addClass('jfk-button-hover');
	});
	$('.jfk-button').mouseleave(function(){
	   $(this).removeClass('jfk-button-hover');
	});
});