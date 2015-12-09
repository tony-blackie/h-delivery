$(document).ready(function() {
	var landing = $('.landing');
	landing.height($(window).height());
	$(window).on('resize', function() {
		landing.height($(window).height());
	});
});
