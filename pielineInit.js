var data = [
	{name: 'a', value: 10},
	{name: 'b', value: 30},
	{name: 'c', value:40},
	{name: 'd', value: 30},
	{name: 'e', value:70}
];

$(function() {
	new pieLine(data, $('#canvas1'));
	new pieLine(data, $('#canvas2'),{'mask':{'color':'#ffffff','width':6}});
	new pieLine(data, $('#canvas3'),{'stroke':{'color':'#ffffff','width':6}});
	new pieLine(data, $('#canvas4'),{'fillType':'gradient'});
	new pieLine(data, $('#canvas5'),{'fillType':'gradient','mask':{'color':'#ffffff','width':6}});
	new pieLine(data, $('#canvas6'),{'fillType':'gradient','colors':['#ff0000','#000000'],'mask':{'color':'#000000','width':6}});
	new pieLine(data, $('#canvas7'),{'fillType':'interpol','mask':{'color':'#ffffff','width':6}});	
	new pieLine(data, $('#canvas8'),{'fillType':'interpol','mask':{'color':'#ffffff','width':6},'colors':['#0000ff','#ff0000'],});
});

