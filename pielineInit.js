var data = [
	{name: 'red', value: 10},
	{name: 'blue', value: 30},
	{name: 'green', value:18},
	{name: 'red', value: 10},
	{name: 'blue', value: 30},
	{name: 'green', value:18},
	{name: 'blue', value:40}
];

$(function() {
	window.pieObj = new pieLine(data, $('#canvas'));
});
