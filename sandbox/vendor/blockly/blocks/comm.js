Blockly.Blocks['send_string'] = {
    init: function() {
        this.jsonInit({
            "message0": 'отправить GET на сервер %1',
            "args0": [
                {
                    "type": "field_input",
                    "name": "CMD",
                    "text": "",
                    "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Отправляет заданную строку на сервер.",
            "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
    }
};