function populateAspectList(){
	$('.fm-aspect-available ul').html( $('.hiddenList').html());
}
function sortUL($item)
{
	var mylist = $item;
	var listitems = mylist.children('li').get();
	listitems.sort(function(a, b) {
	   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
	})
	$.each(listitems, function(idx, itm) { mylist.append(itm); });
}
function loadAspectList(){
	var url = "/alfresco/wcs/model/aspects/list";
	$.getJSON(url, {}, function(r){
		var len = r.length;
		for(var i=0; i<len; i++) {
			$('.hiddenList').append('<li id="'+r[i].parent+'" class="'+r[i].namespace+'_'+r[i].name+'">' +r[i].title +'</li>');
		}
		sortUL( $('.hiddenList') );
		loadProfileProperties();
	});
}
function loadProfileProperties(){
	$('.fm-aspect-assigned ul').html("");
	$('.fm-aspect-available li').hide();

	$('.fm-profile-title').val("");
	$('.fm-profile-description').val("");

	populateAspectList();

	if($(".fm-aspect-assigned ul li").length <= 0){

		r = advsearchProfile[0].profile;
		if(r.aspects){
			var len = r.aspects.length;
			for(var i=0; i<len; i++) {
				$('.fm-aspect-available .'+r.aspects[i].name).hide();
				$('.fm-aspect-assigned ul').append('<li id="'+r.aspects[i].parent+'" class="'+r.aspects[i].name+'">' +r.aspects[i].title +'</li>');
			}
		}
	}
	sortUL( $('.fm-aspect-assigned .connectedSortable') );
}

function saveProfile()
{

	advsearchProfile[0].profile.aspects = [];
	$('.fm-aspect-assigned ul li').each(function(){

		var aspect = {};
		aspect.name =  $(this).attr('class');
		aspect.parent =  $(this).attr('id');
		aspect.title =  $(this).text();
		advsearchProfile[0].profile.aspects.push(aspect);
	});

	var profile = JSON.stringify( advsearchProfile[0].profile );

	$('.infoMessage span').html("Please wait...");
	$('.infoMessage').fadeIn(300);
	$('.infoMessage').center();

	$.ajax({
		type: "POST",
		url: "/alfresco/wcs/constraint/update-profile",
		dataType:"json",
		data:{
		  profile:profile, uid: $('.doc-list-active').val(), key: "advsearch"
		},
		success:function(r){

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


$(function(){
	/* Setup */
	loadAspectList();

	$( ".fm-aspect-assigned ul, .fm-aspect-available ul" ).sortable({
		connectWith: ".connectedSortable", items: 'li'
	}).disableSelection();

	/* Events */
	$('.fmPreview').click(function(){
		window.open("/alfresco/wcs/form-builder/previewer?profile=advsearch");
		return false;
	});

	/* Events */
	$('.frmSaveButton').click(function(){
		saveProfile();
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