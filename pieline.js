function pieLine(data, canvas, style) {
	this.data = normalize(data);
	getDegrees(data);
	plotPie(data, canvas, style);
}

function normalize(data) {
	var maxval = data.reduce(function(a, b) {
	   return Math.max(a, b.value);
	}, 0);

	for (i = 0; i < data.length; i++)
		data[i].normalValue = Math.round(data[i].value/maxval*1000)/1000;
	
	return data;
}

function getDegrees(data) {
	var modulo = 360 % data.length;
	var degrees = Math.floor(360/data.length);

	for (i = 0; i < data.length; i++) {
		if (modulo <= 0) {
			data[i].degrees = degrees;
		} else {
			data[i].degrees = degrees + 1;
			modulo --;
		}
	}
}

function plotPie (data, canvas, style) {

	var width = canvas.width();
	var height = canvas.height();

	var center = [width/2, height/2];
	var maxRadius = (width < height) ? height/2.05 : width/2.05;


	var plot = canvas[0].getContext('2d');
	var segmentRadiants = Math.PI*2/data.length;

	for (i = 0; i < data.length; i++) {
		plot.beginPath();
		plot.moveTo(center[0],center[1]);
		plot.arc(center[0],center[1],maxRadius*data[i].normalValue,segmentRadiants*i,segmentRadiants*(i+1),false);
		plot.lineTo(center[0],center[1]);
		applyStyle(style, maxRadius,data[i].normalValue);
		plot.fill();
	}

	function applyStyle(style, maxRadius, value) { 
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		function toRGB(color) {
			color = cutHex(color);
			return [parseInt((cutHex(color)).substring(0,2),16),
					parseInt((cutHex(color)).substring(2,4),16),
					parseInt((cutHex(color)).substring(4,6),16)];
		}
		var colors = style.colors?style.colors:['#FFD700','#FF0000']
		if (!style || !style.type || (style.type == "random"))
			plot.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		if (style.type == 'gradient') {
			var grd = plot.createRadialGradient(
				center[0], center[1], maxRadius/20, 
				center[0], center[1], maxRadius);
			grd.addColorStop(0, colors[0]);
			grd.addColorStop(1, colors[1]);
			plot.fillStyle = grd;
		}
		if (style.type == 'heat') {
			sliceColor = "#";
			rgbColors = colors.map(toRGB);
			for (j = 0; j < 3; j++) {
				console.log(j);
				sliceColorSection = Math.floor(
					rgbColors[0][j] + value * (rgbColors[1][j]-rgbColors[0][j])
					).toString(16);
				sliceColor += (sliceColorSection == 0)?'00':sliceColorSection;
			}
			plot.fillStyle = sliceColor;
		}
		if (style.stroke) {
			plot.strokeStyle = style.stroke.color;
			plot.lineCap = "round";
			plot.lineJoin = "round";
			plot.lineWidth = style.stroke.width;
			plot.stroke();
		}
	}
}
