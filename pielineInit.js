var data = [
	{name: 'a', value: 10},
	{name: 'b', value: 30},
	{name: 'c', value:40},
	{name: 'd', value: 30},
	{name: 'e', value:140}
];

$(function() {
	window.pieObj = new pieLine(data, $('#canvas'), {'type':'gradient', 'colors':['#ff0000','#0000ff'], 'stroke': {'color':'#ffffff','width':2}, 'mask': {'color':'#ffffff','width':4}});
});

