function pieLine(data, canvas) {
	this.data = normalize(data);
	getDegrees(data);
	plotPie(data, canvas);
}

function normalize(data) {
	var maxval = data.reduce(function(a, b) {
	   return Math.max(a, b.value);
	}, 0);

	for (i = 0; i < data.length; i++)
		data[i].normalValue = data[i].value*10/40;
	
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

function plotPie (data, canvas) {
	var width = canvas.width();
	var height = canvas.height();

	var center = [width/2, height/2];
	var radius = (width < height) ? height/2 : width/2;


	var plot = canvas[0].getContext('2d');



	plot.fillStyle = '#ff0000';
	plot.beginPath();
	plot.moveTo(150,150);
	plot.arc(150,150,70,0,Math.PI/6,false);
	plot.lineTo(150,150);
	plot.fill();


}