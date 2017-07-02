var REQ_TIMEOUT_ACC = 0;
var REQ_ATTEMPTS = 0;
var RES_TIMEOUT = 0;
var COMMAND_COUNT = 0;

var REQUESTED = 0;
var RECEIVED = 0;

var EXECUTING = false;

var CONFIG = {
    LED_HTTP_SERVER: '127.0.0.1:8888',
    REQ_ATTEMPTS_MAX: 10,
    REQ_TIMEOUT_MAX: undefined,
    LAST_LEVEL: 10,
    MODE_DEBUG: false
};

var CMD = {
    SET_LEDS: {
        repr: "CMD.SET_LEDS",
        path: 'set_leds',
        speed: 1000
    },
    SET_LED_COLOR: {
        repr: "CMD.SET_LED_COLOR",
        path: 'set_led_color',
        speed: 100
    },
    SET_NEXT_LED: {
        path: 'set_next_led',
        speed: 10
    },
    SET_PREV_LED: {
        path: 'set_prev_led',
        speed: 10
    },
    SET_LEDS_MIX: {
        path: 'set_leds_mix',
        speed: 10
    },
    SET_LED_COLOR_MIX: {
        path: 'set_led_color_mix',
        speed: 10
    },
    SET_NEXT_LED_MIX: {
        path: 'set_next_led_mix',
        speed: 10
    },
    SET_PREV_LED_MIX: {
        path: 'set_prev_led_mix',
        speed: 10
    },
    SET_LEDS_LIST: {
        path: 'set_leds_list',
        speed: 10
    },
    THE_END: {
        repr: 'CMD.THE_END',
        path: 'end_of_programm',
        speed: 120
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
    return command_type.path;
};

//аддитивность, не мультипликативность!

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

    var query = 'http://' + CONFIG.LED_HTTP_SERVER + '/' + makeCommand(command_type, args);

    REQ_TIMEOUT_ACC += command_type.speed;
    COMMAND_COUNT++;

    if (COMMAND_COUNT == 1) {
        REQ_TIMEOUT_ACC = 0;
    }

    console.info("Timeout: ", REQ_TIMEOUT_ACC);

    setTimeout(function() {sendToServer(command_type, query)}, REQ_TIMEOUT_ACC);
};

$(document).ready(function () {

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

                code += "execCommand(" + CMD.THE_END.repr + ");";

                eval(code);
            } catch (e) {
                alert(e);
            }

        }
    }
});

});

var setExec = function (state) {

    EXECUTING_OLD = EXECUTING;
    EXECUTING = state;

    if (EXECUTING !== EXECUTING_OLD) {
        console.warn('EXEC: ', EXECUTING);
        onChangeExec(state);
    }

};

var reactToSuccess = function () {
    //stub
    setExecStatus(EXEC_STATUS.PROGRESS);
};

var reactToEnd = function () {
    //stub
    setExec(false);
    successTour.start(true);
};

var SERVER_RESPONSE = {
    'success': reactToSuccess,
    'end': reactToEnd
};