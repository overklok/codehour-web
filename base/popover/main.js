$(document).ready(function () {
    $('#show-help').click(function () {
        if (typeof steps_help !== "undefined" && steps_help.length > 0) {
            helpTour.start(true);
        } else {
            tour.start(true);
            tour.goTo(tour._options.steps.length - 1);
        }
    });
});

var getCurrentLevelNumber = function () {
    return parseInt(window.location.pathname.split('/').pop().split('.')[0]);
};

var getNextLevelUrl = function () {
    var currentLevel = getCurrentLevelNumber();

    if (currentLevel == CONFIG.LAST_LEVEL) {
        return 1 + ".html";
    } else {
        return currentLevel + 1 + ".html";
    }
};

// Instance the tours
var tour = new Tour({
    // name: 'test' + Math.random().toString(36).substring(7), // needed while storage was true
    storage: false,
    backdrop: true,
    template: function () {
        if (steps.length === tour._state.current_step + 1) {
            return "<div class='popover tour'> " +
                        "<h3 class='popover-title'></h3> " +
                        "<div class='popover-content'></div> " +
                        "<div class='popover-navigation'> " +
                            "<button class='btn btn-success btn-md' data-role='end'>Приступить</button> " +
                        "</div> " +
                    "</div>";
        } else {
            return  "<div class='popover tour'> " +
                        "<div class='arrow'></div> " +
                        "<div class='arrow'></div> " +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick='tour.end()'>" +
                            "<span aria-hidden='true'>×</span>" +
                        "</button>" +
                        "<h3 class='popover-title'></h3> " +
                        "<div class='popover-content'></div> " +
                        "<div class='popover-navigation text-center'> " +
                            "<button class='btn btn-success btn-md' data-role='next'>Далее »</button> " +
                        "</div> " +
                    "</div>";
        }
    },
    onNext: function (t) {
        console.log('fire');
        if (typeof onNextHandler !== "undefined") {
            onNextHandler(t);
        }
    },
    onHidden: function (t) {
        $(".popover-arrow").fadeOut(100);
    },
    onStart: function (t) {
        if (typeof onStartHandler !== "undefined") {
            onStartHandler(t);
        }
    },
    onEnd: function (t) {
        if (typeof onEndHandler() !== "undefined") {
            onEndHandler(t);
        }
    }
});

var helpTour = new Tour({
    name: 'help_tour',
    storage: false,
    backdrop: true,
    template: function () {
        if (steps_help.length === helpTour._state.current_step + 1) {
            return "<div class='popover tour'> " +
                        "<h3 class='popover-title'></h3> " +
                        "<div class='popover-content'></div> " +
                        "<div class='popover-navigation'> " +
                            "<button class='btn btn-success btn-md' data-role='end'>Приступить</button> " +
                        "</div> " +
                    "</div>";
        } else {
            return  "<div class='popover tour'> " +
                "<div class='arrow'></div> " +
                    "<div class='arrow'></div> " +
                    "<button type='button' class='close' data-dismiss='modal' aria-label='Close' onclick='helpTour.end()'>" +
                    "<span aria-hidden='true'>×</span>" +
                    "</button>" +
                    "<h3 class='popover-title'></h3> " +
                    "<div class='popover-content'></div> " +
                    "<div class='popover-navigation text-center'> " +
                        "<button class='btn btn-success btn-md' data-role='next'>Далее »</button> " +
                    "</div> " +
                "</div>";
        }
    },
    steps: []
});

var commonErrorTour = new Tour({
    name: 'common_error',
    storage: false,
    backdrop: true,
    template:   "<div class='popover tour'> " +
                    "<div class='arrow'></div> " +
                    "<h3 class='popover-title bg-danger'></h3> " +
                    "<div class='popover-content'></div> " +
                    "<div class='popover-navigation'> " +
                            "<button class='btn btn-default btn-md' data-role='end'>OK</button> " +
                    "</div> " +
                "</div>",
    steps: [
        {
            title: "Упс... У нас проблема",
            content: "Невозможно подключиться к гирлянде.",
            orphan: true
        }
    ]
});

var noCodeErrorTour = new Tour({
    name: 'no_code_error',
    storage: false,
    backdrop: true,
    template:   "<div class='popover tour'> " +
                    "<div class='arrow'></div> " +
                    "<h3 class='popover-title bg-danger'></h3> " +
                    "<div class='popover-content'></div> " +
                    "<div class='popover-navigation'> " +
                        "<button class='btn btn-default btn-md' data-role='end'>OK</button> " +
                    "</div> " +
                "</div>",
    steps: [
        {
            title: "Нужно построить цепочку",
            content: "Для того, чтобы выполнить задание, составь алгоритм.",
            orphan: true
        }
    ]
});

var successTour = new Tour({
    name: 'success',
    storage: false,
    backdrop: true,
    template:   "<div class='popover tour'> " +
                    "<div class='arrow'></div> " +
                    "<h3 class='popover-title bg-success'></h3> " +
                    "<div class='popover-content'></div> " +
                    "<div class='popover-navigation'> " +
                        "<a href='" + getNextLevelUrl() + "' class='btn btn-success btn-md'>Продолжить >></a> &nbsp;" +
                        "<a class='btn btn-default btn-md' data-role='end'>Выполнить ещё раз</a> " +
                    "</div> " +
                "</div>",
    steps: [
        {
            title: "Отлично!",
            content: "Ты справился с заданием.",
            orphan: true
        }
    ]
});

if (typeof FAIL_MESSAGE == "undefined") {
    var FAIL_MESSAGE = "Попробуй собрать последовательность по-другому.";
}

var failTour = new Tour({
    name: 'fail',
    storage: false,
    backdrop: true,
    template:   "<div class='popover tour'> " +
                    "<div class='arrow'></div> " +
                    "<h3 class='popover-title bg-danger'></h3> " +
                    "<div class='popover-content'></div> " +
                    "<div class='popover-navigation'> " +
                        "<a class='btn btn-default btn-md' data-role='end'>Выполнить ещё раз</a> " +
                    "</div> " +
                "</div>",
    steps: [
        {
            title: "Ой! Где-то ошибка...",
            content: FAIL_MESSAGE,
            orphan: true
        }
    ]
});


$(document).ready(function () {

    tour.addSteps(steps);

    if (typeof steps_help !== "undefined") {
        helpTour.addSteps(steps_help);
    }

    // Initialize the tours
    commonErrorTour.init();
    noCodeErrorTour.init();
    successTour.init();
    failTour.init();
    helpTour.init();
    tour.init();

    // Start the main tour
    tour.start();
});