function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
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

			var urlArr = getUrlVars();
			setTimeout( '$(".infoMessage").fadeOut(300, function(){ window.location = "imagingDocDetails?editMetadata=false&isRecord='+urlArr['isRecord']+'&uid='+urlArr['uid']+'&ref='+urlArr['ref']+'"  }); ', 1000 );
		}
	});
}

$(function(){
	$('.saveMetadata').click(function(){
		var postOptions = {};
			postOptions.nodeId = $('#tifRef').val();
			postOptions.moveId = "";

		postFormSave($('.fm-profile') , postOptions);
	});
});

 jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top",  (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}