var COLOURS = [
    ["синий", "blue"],
    ["голубой", "light_blue"],
    ["зелёный", "green"],
    ["красный", "red"],
    ["жёлтый", "yellow"],
    ["оранжевый", "orange"],
    ["фиолетовый", "violet"],
    ["белый", "white"]
];

var STRIP_LENGTH = 30;
var MAX_REPEAT_TIMES = 500;

var ledsColorBlock;

Blockly.Blocks['leds_color'] = {

    init: function() {

        ledsColorBlock = this;

        this.jsonInit({
            "message0": 'зажечь все лампочки цветом %1',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": COLOURS
                    // "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Все лампочки гирлянды зажигаются указанным цветом"
        });
    }
};

Blockly.Blocks['leds_off'] = {
    init: function() {
        this.jsonInit({
            "message0": 'потушить все лампочки',
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Все лампочки гирлянды выключаются"
        });
    }
};

Blockly.Blocks['led_color'] = {
    init: function() {
        this.jsonInit({
            "message0": 'зажечь лампочку номер %1 цветом %2',
            "args0": [
                {
                    "type": "field_number",
                    "name": "NUM",
                    "check": "Number",
                    "value": 1,
                    "min": 1,
                    "max": STRIP_LENGTH,
                    "precision": 1
                },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": COLOURS
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Лампочка с указанным номером зажигается указанным цветом"
        });
    }
};

Blockly.Blocks['set_next_led'] = {
    init: function() {
        this.jsonInit({
            "message0": 'зажечь следующую лампочку цветом %1',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": COLOURS
                    // "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Следующая лампочка гирлянды зажигается указанным цветом"
        });
    }
};

Blockly.Blocks['set_prev_led'] = {
    init: function() {
        this.jsonInit({
            "message0": 'зажечь предыдущую лампочку цветом %1',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": COLOURS
                    // "check": "String"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "colour": 160,
            "tooltip": "Предыдущая лампочка гирлянды зажигается указанным цветом"
        });
    }
};

Blockly.Blocks['controls_repeat_ext_led'] = {
    init: function() {
        this.jsonInit({
            "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
            "args0": [{
                "type": "field_number",
                "name": "TIMES",
                "check": "Number",
                "value": 1,
                "min": 0,
                "max": MAX_REPEAT_TIMES,
                "precision": 1
            }],
            "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "%{BKY_LOOPS_HUE}",
            "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}"
        });
    }
};

