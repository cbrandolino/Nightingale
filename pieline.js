

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

function pieLine (data, canvas, style) {
	data = normalize(data);
	getDegrees(data);
	
	var width = canvas.width();
	var height = canvas.height();

	this.style = style ? style : {};
	this.center = [width/2, height/2];
	this.maxRadius = (width < height) ? height/2.05 : width/2.05;


	var segmentRadiants = Math.PI*2/data.length;

	plot = canvas[0].getContext('2d');	
	plot.lineCap = "round";
	plot.lineJoin = "round";

	for (i = 0; i < data.length; i++) {
		plot.beginPath();
		plot.moveTo(this.center[0],this.center[1]);
		plot.arc(this.center[0],this.center[1],this.maxRadius*data[i].normalValue,segmentRadiants*i,segmentRadiants*(i+1),false);
		plot.lineTo(this.center[0],this.center[1]);

		this.normalValue = data[i].normalValue;
		this.applyStyle();

		plot.fill();
		
		if (style && (style.mask)) {
			plot.beginPath();
			plot.moveTo(this.center[0],this.center[1]);
			plot.arc(this.center[0],this.center[1],this.maxRadius,segmentRadiants*i,segmentRadiants*(i+1),false);
			plot.lineTo(this.center[0],this.center[1]);
			plot.strokeStyle = style.mask.color;
			plot.lineWidth = style.mask.width;
			plot.stroke();			
		}
	}
}

pieLine.prototype.applyStyle = function() { 
	function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	function toRGB(color) {
		color = cutHex(color);
		return [parseInt((cutHex(color)).substring(0,2),16),
			parseInt((cutHex(color)).substring(2,4),16),
			parseInt((cutHex(color)).substring(4,6),16)];
	}
	
	var colors = this.style.colors?this.style.colors:['#FFD700','#FF0000'];

	if (!this.style.type || (this.style.type == "random"))
		plot.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

	if (this.style.type == 'gradient') {
		var grd = plot.createRadialGradient(
			this.center[0], this.center[1], this.maxRadius/20, 
			this.center[0], this.center[1], this.maxRadius);
		grd.addColorStop(0, colors[0]);
		grd.addColorStop(1, colors[1]);
		plot.fillStyle = grd;
	}
		
	if (this.style.type == 'interpol') {
		sliceColor = "#";
		rgbColors = colors.map(toRGB);
		for (j = 0; j < 3; j++) {
			console.log(j);
				sliceColorSection = Math.floor(
				rgbColors[0][j] + this.normalValue * (rgbColors[1][j]-rgbColors[0][j])
				).toString(16);
			sliceColor += (sliceColorSection == 0)?'00':sliceColorSection;
		}
		plot.fillStyle = sliceColor;
	}
	if (this.style.stroke) {
		plot.strokeStyle = this.style.stroke.color;
		plot.lineWidth = this.style.stroke.width;
		plot.stroke();
	}
}
