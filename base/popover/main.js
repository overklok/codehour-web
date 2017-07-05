$(document).ready(function () {
    $('#show-task').click(function () {
        tour.start(true);
        tour.goTo(tour._options.steps.length - 1);
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
// Instance the tour
var tour = new Tour({
    // name: 'test' + Math.random().toString(36).substring(7),
    storage: false,
    backdrop: true,
    template:   "<div class='popover tour'> " +
        "<div class='arrow'></div> " +
            "<h3 class='popover-title'></h3> " +
            "<div class='popover-content'></div> " +
            "<div class='popover-navigation'> " +
                "<button class='btn btn-success btn-sm' data-role='next'>Далее »</button> " +
                "<button class='btn btn-danger btn-sm' data-role='end'>Приступить</button> " +
            "</div> " +
        "</div>"
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
                            "<button class='btn btn-default btn-sm' data-role='end'>OK</button> " +
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
                        "<button class='btn btn-default btn-sm' data-role='end'>OK</button> " +
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
                        "<a href='" + getNextLevelUrl() + "' class='btn btn-success btn-sm'>Продолжить >></a> " +
                        "<a class='btn btn-default btn-sm' data-role='end'>Вернуться</a> " +
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
    "<a class='btn btn-default btn-sm' data-role='end'>Вернуться</a> " +
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

    // Initialize the tours
    commonErrorTour.init();
    noCodeErrorTour.init();
    successTour.init();
    failTour.init();
    tour.init();

    // Start the main tour
    tour.start();
});