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
        title: "Прогресс",
        content: "Здесь ты можешь увидеть свой прогресс, а также выбрать любой уровень.",
        placement: "bottom"
    },
    {
        element: "#execute-btn",
        title: "Запуск программы",
        content: "Составь свою последовательность команд и нажми «Запустить», чтобы программа начала выполняться.",
        placement: "left"
    }

];

FAIL_MESSAGE = "Проверь, правильно ли выбран цвет.";

onShowHandler = function (_tour) {

    if (typeof _tour._state !== "undefined" &&_tour._state.current_step === 0) {

        console.log("ASFJKDNGJKSF");

        var coords = $(".blocklyBlockCanvas").position();

        var arrowHTML = '<div class="popover-arrow">' +
                            '<img src="/base/image/popover-extra/arrow.png" style="width: 140px;">' +
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