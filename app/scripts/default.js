'use strict';

$(window).load(function() {
	// fix menu when passed
	$('.masthead').visibility({
		offset: -10,
		once: false,
		// onBottomPassed: function() {
		onTopPassed: function() {
			$('.fixed.menu').transition('fade in');
		},
		// onBottomPassedReverse: function() {
		onTopPassedReverse: function() {
			$('.fixed.menu').transition('fade out');
		}
	});

	// create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item');
});
