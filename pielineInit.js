var data = [
	{name: '1st', value: 10},
	{name: '2nd', value: 30},
	{name: '3rd', value: 30},
	{name: '4th', value:40},
	{name: '5th', value: 30}
];

$(function() {
	new pieLine(data, $('#canvas1'));
	new pieLine(data, $('#canvas2'),{
		'mask':{'color':'#ffffff','width':6},
		'click':function(elem){console.log('Holy shit you clicked the '+elem.name+' slice');},
		'hover':function(elem){console.log('I\'ll be damned if it isn\'t the '+elem.name+' slice you\'re hovering!');},});
	new pieLine(data, $('#canvas3'),{'stroke':{'color':'#ffffff','width':6}});
	new pieLine(data, $('#canvas4'),{'fillType':'gradient'});
	new pieLine(data, $('#canvas5'),{'fillType':'gradient','mask':{'color':'#ffffff','width':6}});
	new pieLine(data, $('#canvas6'),{'fillType':'gradient','colors':['#ff0000','#000000'],'mask':{'color':'#000000','width':6}});
	new pieLine(data, $('#canvas7'),{'fillType':'interpol','mask':{'color':'#ffffff','width':6}});	
	new pieLine(data, $('#canvas8'),{'fillType':'interpol','mask':{'color':'#ffffff','width':6},'colors':['#0000ff','#ff0000'],});
});

