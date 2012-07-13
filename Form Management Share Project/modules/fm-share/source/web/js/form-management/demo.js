function goAspect(){
	window.location = "?aspect=" + $('.aspect-fm').val() + "&node=" + $('.document-fm').val();
}	
$(function(){
	$('.jfk-button').mouseenter(function(){
		$(this).addClass('jfk-button-hover');
	}).mouseleave(function(){
		$(this).removeClass('jfk-button-hover');
	});
	
	$('.aspect-fm').bind('keypress', function(e) {
        if(e.keyCode==13){
			goAspect();
			return false;
		}
	});

	$('.showFormBtn').click(function(){
		goAspect();
	});
	
});

 jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}