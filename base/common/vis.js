var workspace;

$(document).ready(function () {
    Blockly.HSV_SATURATION = 1.0;

    var preview = document.getElementById('preview');
    var editor = document.getElementById('editor');

    workspace = Blockly.inject(editor, {
        toolbox: document.getElementById('toolbox'),
        trashcan: true,
        maxBlocks: LevelConfig.maxBlocks,
        scrollbars: true
    });

    // workspace.scrollX = 0;
    // workspace.scrollY = 0;

    var onresize = function(e) {
        // Compute the absolute coordinates and dimensions of editor-area.
        var element = preview;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position #editor.
        editor.style.width = x - 10 + 'px';
        editor.style.height = window.height;
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(workspace);

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
});

var onChangeExec = function (state) {
    var execBtn = $('#execute-btn');

    if (state === true) {
        execBtn.text("Остановить");
        execBtn.removeClass("btn-success").addClass("btn-danger");
    } else {
        execBtn.text("Запустить");
        execBtn.removeClass("btn-danger").addClass("btn-success");
        setExecStatus(EXEC_STATUS.STOP);
    }
};

var setExecStatus = function(status) {

    statusTextContainer = $('#status');

    switch (status) {
        case EXEC_STATUS.STOP:
            statusTextContainer.text('Остановлено');
            break;
        case EXEC_STATUS.CONNECTING:
            statusTextContainer.text('Подключение');
            break;
        case EXEC_STATUS.PROGRESS:
            statusTextContainer.text('Выполняется');
            break;
    }
};
