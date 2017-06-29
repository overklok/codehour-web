Blockly.JavaScript['send_string'] = function(block) {
    // String or array length.
    var command = block.getFieldValue('CMD');
    // console.info(command);
    return 'sendToServer("' + command + '");';
};