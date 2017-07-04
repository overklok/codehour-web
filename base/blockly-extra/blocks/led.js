var COLOURS = [
    ["синий", "blue"],
    ["голубой", "light_blue"],
    ["зелёный", "green"],
    ["красный", "red"],
    ["жёлтый", "yellow"],
    ["оранжевый", "orange"],
    ["фиолетовый", "violet"],
    ["бирюзовый", "turquoise"],
    ["белый", "white"]
];

Blockly.Blocks['leds_color'] = {
    init: function() {
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
                    "max": 30,
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