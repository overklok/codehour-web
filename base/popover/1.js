steps = [
    {
        title: "Привет!",
        content: "Сегодня ты научишься программировать гирлянду.",
        orphan: true
    },
    {
        element: "#editor",
        title: "Рабочая область",
        content: "Перетаскивай команды из левой части окна в правую и соединяй их, чтобы получалась непрерывная цепь шагов. <br>" +
        "Чтобы удалить лишние блоки, перетащи их обратно в левую часть окна или в корзину."
    },
    {
        element: "#progress",
        title: "Шкала прогресса",
        content: "Это - список уровней, которые тебе предстоит пройти. Текущий уровень выделен оранжевым цветом. Пройденные уровни будут помечены зелёным цветом.",
        placement: "bottom"
    },
    {
        element: "#execute-btn",
        title: "Запустить программу",
        content: "Составь свою последовательность команд и нажми «Запустить», чтобы программа начала выполняться.",
        placement: "left"
    },
    {
        element: "#comment",
        title: "Описание задания",
        content: "Здесь написано задание, которое тебе нужно выполнить для прохождения уровня.",
        placement: "left"
    },
    {
        element: "#show-help",
        title: "Посмотреть подсказку",
        content: "Если тебе непонятно, как выполнить задание, нажми на эту кнопку.",
        placement: "left"
    }
];

steps_help = [
    {
        title: "Подсказка",
        content: "Ты должен перетащить блок и выбрать <b style='color: red'>красный</b> цвет: <br> <img class='img-responsive' src='../image/help/1/1.png'>",
        orphan: true
    }
];

FAIL_MESSAGE = "Проверь, правильно ли выбран цвет.";

onNextHandler = function (_tour) {

    console.log("tscs", _tour._state.current_step);

    if (typeof _tour._state !== "undefined" && _tour._state.current_step === 0) {

        var coords = $(".blocklyBlockCanvas").position();

        var arrowHTML = '<div class="popover-arrow">' +
                            '<img src="../image/popover-extra/arrow.png" style="width: 140px;">' +
                        '</div>';

        $("body").prepend(arrowHTML);

        var $popover_arrow = $(".popover-arrow");

        $popover_arrow.offset({top: coords.top, left: coords.left - 10});

        setTimeout(function () {
            $popover_arrow.fadeIn(100);
        }, 400);
    } else {
        $(".popover-arrow").fadeOut(100);
    }
};