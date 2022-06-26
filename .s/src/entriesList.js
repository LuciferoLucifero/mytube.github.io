window.uEntriesList = {
	init: function() {
		var _this = this;
		_this.badBrowser = false;
		if ($.browser && $.browser.msie && ($.browser.version < 10) && (document.compatMode == 'BackCompat')) {_this.badBrowser = true;}
	},
	colWidth: function(cols) {
		var colWidth;
		cols = cols || (Math.floor(window.uEntriesList.root.width() / window.uEntriesList.elWidth));
		if (window.uEntriesList.badBrowser) {
			colWidth = Math.floor(99.9 / cols);
		} else {
			colWidth = Math.floor(100 * 100 / cols) / 100;
		}
		window.uEntriesList.root.find(' > li').css('width', colWidth + '%');
	}
}

$(document).ready(function() {
	window.uEntriesList.init();
});
