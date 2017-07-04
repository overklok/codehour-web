var REQ_TIMEOUT_ACC = 0;
var REQ_ATTEMPTS = 0;
var RES_TIMEOUT = 0;
var COMMAND_COUNT = 0;

var REQUESTED = 0;
var RECEIVED = 0;

var EXECUTING = false;
var INITIALIZING = false;

var CONFIG = {
    LED_HTTP_SERVER: '127.0.0.1:8888',
    REQ_ATTEMPTS_MAX: 10,
    REQ_TIMEOUT_MAX: undefined,
    LAST_LEVEL: 10,
    MODE_DEBUG: true,
    DELAY_BASE: 100
};

var CMD = {
    SET_LEDS: {
        repr: "CMD.SET_LEDS",
        path: 'set_leds',
        speed: CONFIG.DELAY_BASE + 100
    },
    SET_LED_COLOR: {
        repr: "CMD.SET_LED_COLOR",
        path: 'set_led_color',
        speed: CONFIG.DELAY_BASE
    },
    SET_NEXT_LED: {
        path: 'set_next_led',
        speed: CONFIG.DELAY_BASE
    },
    SET_PREV_LED: {
        path: 'set_prev_led',
        speed: CONFIG.DELAY_BASE
    },
    SET_LEDS_MIX: {
        path: 'set_leds_mix',
        speed: CONFIG.DELAY_BASE + 100
    },
    SET_LED_COLOR_MIX: {
        path: 'set_led_color_mix',
        speed: CONFIG.DELAY_BASE
    },
    SET_NEXT_LED_MIX: {
        path: 'set_next_led_mix',
        speed: CONFIG.DELAY_BASE
    },
    SET_PREV_LED_MIX: {
        path: 'set_prev_led_mix',
        speed: CONFIG.DELAY_BASE
    },
    SET_LEDS_LIST: {
        path: 'set_leds_list',
        speed: CONFIG.DELAY_BASE
    },
    THE_START: {
        repr: 'CMD.THE_START',
        path: 'task',
        speed: 0
    },
    THE_END: {
        repr: 'CMD.THE_END',
        path: 'end_task',
        speed: CONFIG.DELAY_BASE * 2
    }
};

var EXEC_STATUS = {
    STOP: 0,
    PROGRESS: 1,
    CONNECTING: 2
};

var haltExec = function () {
    setExec(false);
};

var makeCommand = function (command_type, args) {

    var command = command_type.path;

    switch (command_type) {
        case CMD.SET_LEDS:
            command += ":" + args[0];
            break;
        case CMD.SET_LED_COLOR:
            command += ":" + args[0] + ";" + args[1];
            break;
        case CMD.THE_START:
            command += ":" + args[0];
    }

    console.log(command);

    return command;
};

var sendToServer = function (command_type, query) {

    if (EXECUTING === false)
        return;

    console.log("sts", command_type.repr);

    if (command_type == CMD.THE_END) {
        if (REQUESTED > RECEIVED) {
            setExecStatus(EXEC_STATUS.CONNECTING);
            if (REQ_ATTEMPTS > CONFIG.REQ_ATTEMPTS_MAX) {
                if (CONFIG.MODE_DEBUG) {
                    alert("Max attempts reached. Please check the server.");
                } else {
                    commonErrorTour.start(true);
                }
                haltExec();
                return;
            }
            console.warn("re-exec of the_end command...", RECEIVED, REQUESTED);
            REQ_ATTEMPTS++;
            execCommand(command_type);
            return;
        } else {
            console.warn("ready to execute", RECEIVED, REQUESTED);
        }
    }

    console.group('Запрос:', query);

    $('#debug-text').html("Отправка запросов на сервер: " + ++REQUESTED);

    REQ_ATTEMPTS = 1;

    $.ajax({
        url: query,
        context: document.body,
        success: function (data) {
            console.log(data);
            SERVER_RESPONSE[data]();
            $('#debug-recv').html("Получено ответов: " + ++RECEIVED);
        }
    }).done(function () {
        console.info('Отправлено успешно');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Ошибка при отправлении запроса:', errorThrown);
        $('#debug-text').html("Ошибка при отправлении запроса: " + errorThrown);
        if (CONFIG.MODE_DEBUG) {
            alert(errorThrown)
        } else {
            commonErrorTour.start(true);
        }
        haltExec();
    });

    console.groupEnd();
};

var execCommand = function (command_type, args) {

    if (EXECUTING === true) {

        var query = 'http://' + CONFIG.LED_HTTP_SERVER + '/' + makeCommand(command_type, args);

        REQ_TIMEOUT_ACC += command_type.speed;
        COMMAND_COUNT++;

        if (COMMAND_COUNT == 1) {
            REQ_TIMEOUT_ACC = 0;
        }

        console.info("Timeout: ", REQ_TIMEOUT_ACC);

        setTimeout(function () {
            sendToServer(command_type, query)
        }, REQ_TIMEOUT_ACC);
    }

};

var resetColor = function () {
    INITIALIZING = true;
    setExec(true);
    // sendToServer(command_type, query);
    execCommand(CMD.SET_LEDS, ['black']);
    // setExec(false);
};

$(document).ready(function () {

    resetColor();

    $('#execute-btn').click(function () {

        if (EXECUTING === false) {

            var xml = Blockly.Xml.workspaceToDom(workspace);

            if (preCheck(xml)) {

                setExec(true);

                var code = Blockly.JavaScript.workspaceToCode(workspace);

                if (code.length == 0) {
                    noCodeErrorTour.start(true);
                    setExec(false);
                    return;
                }

                try {
                    REQUESTED = 0;
                    RECEIVED = 0;

                    REQ_TIMEOUT_ACC = 0;
                    COMMAND_COUNT = 0;

                    code =  "execCommand(" + CMD.THE_START.repr + ", [" + getCurrentLevelNumber() + "]);" +
                            "execCommand(" + CMD.SET_LEDS + ", ['black']);" + code;

                    code += "execCommand(" + CMD.THE_END.repr + ");";

                    eval(code);
                } catch (e) {
                    alert(e);
                }

            }
        } else {
            setExec(false);
        }
    });
});

var setExec = function (state) {

    EXECUTING_OLD = EXECUTING;
    EXECUTING = state;

    if (EXECUTING !== EXECUTING_OLD && INITIALIZING === false) {
        console.warn('EXEC: ', EXECUTING);
        onChangeExec(state);
    }
};

var reactToSuccess = function () {
    setExecStatus(EXEC_STATUS.PROGRESS);

    if (INITIALIZING === true) {
        setExec(false);
        INITIALIZING = false;
    }
};

var reactToEndGood = function () {
    setExec(false);
    successTour.start(true);
};

var reactToEndBad = function () {
    setExec(false);
    failTour.start(true);
};

var SERVER_RESPONSE = {
    'ok': reactToSuccess,
    'end_good': reactToEndGood,
    'end_bad': reactToEndBad
};