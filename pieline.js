/*!
 * PieLine circular bar graph plotter
 * http://github.com/cbrandolino/PieLine
 *
 * Author: Claudio Brandolino
 * 
 * License: MIT
 */

function pieLine (data, canvas, config) {

	var data = normalize(data);	
	var width = canvas.width();
	var height = canvas.height();
	var segmentRadiants = Math.PI*2 / data.length;

	this.config = config ? config : {};
	this.center = [width / 2, height / 2];
	this.maxRadius = (width < height) ? height / 2.05 : width / 2.05;


	plot = canvas[0].getContext('2d');	
	plot.lineCap = "round";
	plot.lineJoin = "round";

	for (i = 0; i < data.length; i++) {

		this.drawSlice(
			this.maxRadius * data[i].normalValue,
			segmentRadiants*i,
			segmentRadiants*(i+1));
		this.applyStyle(data[i].normalValue);

		plot.fill();
		
		if (config && (config.mask)) {
			this.drawSlice(
				this.maxRadius,
				segmentRadiants*i,
				segmentRadiants*(i+1));
			plot.strokeStyle = config.mask.color;
			plot.lineWidth = config.mask.width;
			plot.stroke();			
		}
	}
}

pieLine.prototype.drawSlice = function (radius, start, end) {
	plot.beginPath();
	plot.moveTo(this.center[0],this.center[1]);
	plot.arc(this.center[0],this.center[1],radius,start,end,false);
	plot.lineTo(this.center[0],this.center[1]);
}

pieLine.prototype.applyStyle = function (sliceValue) { 
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	function toRGB(color) {
		color = cutHex(color);
		return [parseInt((cutHex(color)).substring(0,2),16),
			parseInt((cutHex(color)).substring(2,4),16),
			parseInt((cutHex(color)).substring(4,6),16)];
	}
	
	var colors = this.config.colors?this.config.colors:['#FFD700','#FF0000'];

	switch (this.config.fillType) {

		case null:
		case undefined:
		case 'random':
			plot.fillStyle = '#'+
				(0x1000000 + (Math.random()) * 0xffffff)
				.toString(16).substr(1,6);
		break;		
		case 'gradient':
			var grd = plot.createRadialGradient(
				this.center[0], this.center[1], this.maxRadius / 20, 
				this.center[0], this.center[1], this.maxRadius);
			grd.addColorStop(0, colors[0]);
			grd.addColorStop(1, colors[1]);
			plot.fillStyle = grd;
		break;
		case 'interpol':
			sliceColor = "#";
			rgbColors = colors.map(toRGB);

			for (j = 0; j < 3; j++) {

				sliceColorSection = Math.floor(
					rgbColors[0][j] + sliceValue 
					* (rgbColors[1][j]-rgbColors[0][j])
				).toString(16);

				sliceColor += (sliceColorSection == 0) 
					? '00'
					: sliceColorSection;
			}
			plot.fillStyle = sliceColor;
		break;
	}

	if (this.config.stroke) {
		plot.strokeStyle = this.config.stroke.color;
		plot.lineWidth = this.config.stroke.width;
		plot.stroke();
	}
}

function normalize(data) {
	var maxval = data.reduce(function (a, b) {
		return Math.max(a, b.value);
	}, 0);

	for (i = 0; i < data.length; i++)
		data[i].normalValue = Math.round(data[i].value / maxval*1000) 
			/ 1000;
	
	return data;
}
