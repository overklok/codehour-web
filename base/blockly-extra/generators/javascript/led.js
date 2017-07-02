var CMD_LEDS_COLOR = 'leds_color';

var COLORS = {
    'black': '0,0,0',
    'blue':  '0,0,255'
};

Blockly.JavaScript['leds_color'] = function(block) {
    // String or array length.
    var color = COLORS[block.getFieldValue('COLOR')];
    // console.info(command);
    return 'execCommand(' + CMD.SET_LEDS.repr +  ' , [' + color + ']);';
};

Blockly.JavaScript['leds_off'] = function (block) {
    // String or array length.
    var color = COLORS['black'];
    // console.info(command);
    return 'execCommand(' + CMD.SET_LEDS.repr +  ' , [' + color + ']);';
};

Blockly.JavaScript['led_color'] = function(block) {
    // String or array length.
    var color = COLORS[block.getFieldValue('COLOR')];
    var num = block.getFieldValue('NUM');
    // console.info(command);
    return 'execCommand(' + CMD.SET_LED_COLOR.repr +  ' , [' + num + ',' + color + ']);';
};