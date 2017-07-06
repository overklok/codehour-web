steps = [
    {
        title: "Новое задание!",
        content: 'Можно зажечь одну лампочку, указав ее номер. Зажги <b>десятую</b> лампочку <b style="color: red">красным</b> цветом.',
        orphan: true
    }
];

steps_help = [
    {
        title: "Подсказка",
        content: 'Обрати внимание: в новом блоке можнно укзывать номер отдельной лампочки и её цвет: <br> <img src="../image/help/5/1.png" class="img-responsive">',
        orphan: true
    }
];

steps.unshift(steps_help[0]);

FAIL_MESSAGE = "Проверь, верно ли выбран номер лампочки и цвет.";