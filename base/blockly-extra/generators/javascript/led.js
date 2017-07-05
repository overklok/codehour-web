var CMD_LEDS_COLOR = 'leds_color';

Blockly.JavaScript['leds_color'] = function(block) {
    // String or array length.
    var color = block.getFieldValue('COLOR');
    // console.info(command);
    return 'execCommand(' + CMD.SET_LEDS.repr +  ', ["' + color + '"]);';
};

Blockly.JavaScript['leds_off'] = function (block) {
    // String or array length.
    var color = 'black';
    // console.info(command);
    return 'execCommand(' + CMD.SET_LEDS.repr +  ', ["' + color + '"]);';
};

Blockly.JavaScript['led_color'] = function(block) {
    // String or array length.
    var color = block.getFieldValue('COLOR');
    var num = block.getFieldValue('NUM');
    // console.info(command);
    return 'execCommand(' + CMD.SET_LED_COLOR.repr +  ', [' + num + ',"' + color + '"]);';
};

Blockly.JavaScript['set_next_led'] = function(block) {
    // String or array length.
    var color = block.getFieldValue('COLOR');
    // console.info(command);
    return 'execCommand(' + CMD.SET_NEXT_LED.repr +  ', ["' + color + '"]);';
};

Blockly.JavaScript['set_prev_led'] = function(block) {
    // String or array length.
    var color = block.getFieldValue('COLOR');
    // console.info(command);
    return 'execCommand(' + CMD.SET_PREV_LED.repr +  ', ["' + color + '"]);';
};

Blockly.JavaScript['controls_repeat_ext_led'] = Blockly.JavaScript['controls_repeat_ext'];