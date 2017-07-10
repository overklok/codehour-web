var COOKIE_NAME_LED_SERVER = 'codehour_led_server';

$(document).ready(function () {
    var led_server = getCookie(COOKIE_NAME_LED_SERVER);
    if(led_server) {
        CONFIG.LED_HTTP_SERVER = led_server;
    } else {
        setCookie(COOKIE_NAME_LED_SERVER, CONFIG.LED_HTTP_SERVER);
    }
});

function setLedServer(addr) {
    CONFIG.LED_HTTP_SERVER = addr;
    setCookie(COOKIE_NAME_LED_SERVER, CONFIG.LED_HTTP_SERVER);
    resetColor();
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}