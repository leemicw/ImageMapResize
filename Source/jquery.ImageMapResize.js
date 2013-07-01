//jquery Plugin: ImageMapResize
//Release under MIT Licence - https://github.com/leemicw/ImageMapResize/blob/master/License.txt

(function ( $ ) {
	$.fn.ImageMapResize = function (options) {
		//creating settings object as described in jquery plugin docs
		var settings = $.extend({
			//if there were default settings they would go here
		}, options);

		//Grab a handle to the current image selected
		var mappedImage = this;

		//grab the selector needed to get the areas from the referenced image map
		var mapSelector = "map[name=" + this.attr('usemap').replace("#", "") + "]>area";

		//store the original coordinates since all calculations need to be based on these
		var originalCoordinates = new Array();
		var coordCount = 0;		
		$(mapSelector).each(function () {
			originalCoordinates[coordCount] = $(this).attr('coords');
			coordCount = coordCount + 1;
		});

		//function for scaling the coordinates
		function calculateCoordinates() {
			var multiplier = mappedImage.width() / settings.origImageWidth;
			var areaCount = 0;
			$(mapSelector).each(function () {
				var pairs = originalCoordinates[areaCount].split(',');
				for (var i = 0; i < pairs.length; i++) {
					pairs[i] = pairs[i] * multiplier;
				}
				$(this).attr('coords', pairs.join(','));
				areaCount++;
			});
		}

		//bind the function to the window resize
		$(window).on("resize.ImageMapResize", calculateCoordinates);

		//if they image is already scaled on page load then scale the Coordinates without a window resize
		//it looks like Chrome has a bug where the width is initally 0 so we are checking for that as well
		if (mappedImage.width() != 0 && mappedImage.width() != settings.origImageWidth) {
			calculateCoordinates();
		}
	};
}(jQuery));