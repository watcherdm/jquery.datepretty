(function($){
	$.fn.datepretty = function(options) {
		var defaults = {
			colors: {bg : "#222", fg : "#ddd", bd : "#111"},
			font: "Arial",
			size: 1,
			align: "left",
			dates: 1,
			space: .5,
			calendar: false,
			clear: false,
			days: "short"
		};
		var options = $.extend(defaults, options);
		var width = 80 * options.size;
		if (!options.colors.bd){
			options.colors.bd = options.colors.bg;
		}else if(!options.colors.bg){
			options.colors.bg = options.colors.bd;
		}
		function daysInMonth(month,year) {
			var m = (month + 1 < 12) ? month + 1 : month - 10;
			var dd = new Date(year, m , 0);
			return dd.getDate();
		}
		function lastDayInMonth(month,year) {
			var m = (month + 1 < 12) ? month + 1 : month - 10;
			var dd = new Date(year, m, 0);
			return dd.getDay();
		}
		return this.each(function() {
			var daystr = (options.days == "short") ? 1 : 2;
			var obj = $(this),
				strdate = obj.html();
			var m = [[0,'Jan', 'January'],[1, 'Feb', 'February'], [2, 'Mar', 'March'], [3, 'Apr', 'April'], [4, 'May', 'May'], [5, 'Jun', 'June'],[6,'Jul','July'],[7,'Aug','August'],[8,'Sep','September'],[9,'Oct','October'],[10,'Nov','November'],[11,'Dec','December']];
			var d = [[0,'Sun','Sunday'],[1,'Mon','Monday'],[2,'Tue','Tuesday'],[3,'Wed','Wednesday'],[4,'Thu','Thursday'],[5,'Fri','Friday'],[6,'Sat','Saturday']];
			if (Date.parse(strdate)){
				obj.html(""); // clear the original so we can get into the fun stuff
				obj.css("font-family", options.font);
				var x = new Date(strdate);
				if (options.calendar){
					obj.wrap("<div></div>").css("border", "solid " + .1 * options.size + "em " + options.colors.bd);
					obj.css("width", width * 7.2);
					var n = x.getMonth(), y = x.getYear();
					x = new Date(1900 + y, n, 1);
					var $header = $("<div></div>").css("width", (width * 7.2)).css("background",options.colors.bg);
					var $monthyear = $("<div>" + m[x.getMonth()][2] + " " + (x.getYear() + 1900) + "</div>").css("color", options.colors.fg).css("font-size",options.size * 2 + "em").css("font-weight", "bolder")
					$header.append($monthyear);
					for (days in d){
						var dh = $("<div>" + d[days][daystr] + "</div>").css("font-size",.8 * options.size + "em").css("font-weight", "bold").css("color",options.colors.fg).css("float", "left").css("width",width).css("background",options.colors.bg).css("border", "solid " + .1 * options.size + "em " + options.colors.bd);
						$header.append(dh);
					}
					obj.append($header);
					var end = daysInMonth(x.getMonth(), x.getYear());
					options.dates = end;
					var empty_count = end % 7;
					var before = x.getDay();
					for (var j = 0; j < before; j ++){
						emptyDate();
					}
				}
				var y = new Date(1900 + x.getYear(), x.getMonth(),options.dates);
				function emptyDate(){
					var $wrapper = $('<div class="empty_date"></div>').css("background", options.colors.fg).css("display","block").css("float","left").css("width", width).css("border", "solid " + .1 * options.size + "em " + options.colors.bd).css("font-family", options.font).css("margin", options.size * options.space + "em").css("text-align", "center");
					obj.append($wrapper);
				}
				for (var i = 0; i < options.dates; i++){
					var $wrapper = $('<div></div>');
					var o = (x.getDate() + i >= 10) ? (x.getDate() + i) : "0" + (x.getDate() + i);
					var $m = $('<div>' + m[x.getMonth()][1] + '</div>');
					var $y = $('<div>' + (1900 + x.getYear()) + '</div>');
					var $d = $('<div>' + o + '</div>');
					if(!options.calendar){
						$wrapper.append($m);
					}
					$wrapper.append($d);
					if(!options.calendar){
						$wrapper.append($y);
					}
					$wrapper.css("width", width).css("display","block").css("border", "solid " + .1 * options.size + "em " + options.colors.bd).css("margin", options.size * options.space + "em").css("text-align", "center").css("min-height", width * options.size);
					if (options.align != "none"){
						$wrapper.css("float",options.align);
					}
					$m.css("width", width).css("background", options.colors.bg).css("color", options.colors.fg).css("font-size",options.size * 1.5 + "em").css("height", width * .3 * options.size);
					$d.css("width", width).css("background", options.colors.fg).css("color", options.colors.bg).css("font-size",options.size * 2 + "em").css("font-weight", "bolder").css("height",  width * .5 * options.size);
					$y.css("width", width).css("background", options.colors.bg).css("color", options.colors.fg).css("font-size",options.size * .6 + "em").css("height",  width * .2 * options.size);
					obj.append($wrapper);
				}
				if (options.calendar){
					var lday = y.getDay();
					for (var j = lday; j < 6; j ++){
						emptyDate();
					}
				}
				$wrapper.siblings(".empty_date").css("height", $wrapper.innerHeight());
				// check for list and remove any fancy list stuff.
				if(obj[0].tagName == "LI"){
					obj[0].tagName = "DIV";
					obj.parent().css("list-style-type","none").css("margin","0px").css("padding","0px").css("display","block");
					obj.css("display", "block");
				}
				if(options.clear){
					obj.after("<div style='clear:both'></div>");
				}
			}
		});
	};
})(jQuery);