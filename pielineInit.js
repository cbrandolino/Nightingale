var data = [
	{name: 'red', value: 10},
	{name: 'blue', value: 30},
	{name: 'blue', value:40},
	{name: 'blue', value: 30},
	{name: 'blue', value:140}
];

$(function() {
	window.pieObj = new pieLine(data, $('#canvas'), {'type':'gradient', 'colors':['#ff0000','#0000ff'], 'stroke': {'color':'#000000','width':4}});
});

