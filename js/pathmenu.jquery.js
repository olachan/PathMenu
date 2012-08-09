(function ($) {

    $.fn.pathmenu = function (config) {
        var positions= [];
        var initPositions = function (initPosition, offset, direction, buttonCount) {
            var positionTop = initPosition.top, positionLeft = initPosition.left;
             for(var i=0;i<buttonCount;i++)
             {
                 if (direction === 'left') {

                     positionLeft = positionLeft - offset/buttonCount;
                 } else if (direction === 'right') {

                     positionLeft = positionLeft + offset/buttonCount;
                 } else if (direction === 'bottomright') {
                     positionLeft = initPosition.left + offset * Math.cos(Math.PI/1.5 * i / buttonCount);
                     positionTop = initPosition.top + offset * Math.sin(Math.PI/1.5 * i / buttonCount);
                 } else if (direction === 'bottomleft') {
                     positionLeft = initPosition.left - offset * Math.cos(Math.PI/1.5 * i / buttonCount-Math.PI/2);
                     positionTop = initPosition.top - offset * Math.sin(Math.PI/1.5 * i / buttonCount-Math.PI/2);
                 } else if (direction === 'topleft') {
                     positionLeft = initPosition.left - offset * Math.cos(Math.PI/1.5 * i / buttonCount);
                     positionTop = initPosition.top - offset * Math.sin(Math.PI/1.5 * i / buttonCount);
                 } else {
                     positionLeft = initPosition.left + offset * Math.cos(Math.PI/1.5 * i / buttonCount-Math.PI/2);
                     positionTop = initPosition.top + offset * Math.sin(Math.PI/1.5 * i / buttonCount-Math.PI/2);
                 }
                 positions.push({top:positionTop,left:positionLeft});
             }
        };
        var baseButton = null;
        if (config.base) {
            baseButton = $(config.base);
        } else {
            baseButton = $('.path-base-button');
        }
        baseButton.addClass('path-base-button');
        var element = this,
        delay = config.delay ? config.delay : 50,
        delayTime,
        menuButtons = baseButton.siblings().addClass('path-button'),
        direction = config.direction ? config.direction : 'left',
        menuWidth = config.width ? config.width : 100,
        initTop = ( baseButton.height()-menuButtons.height()) / 2,
        initPosition = {top: initTop, left: initTop};
        menuButtons.css({ 'top': initPosition.top, 'left': initPosition.left });

        initPositions(initPosition, menuWidth, direction, menuButtons.length);

        baseButton.toggle(function () {
            $(this).addClass('open');
            menuButtons.each(function (i) {
                delayTime = i * delay;
                var ele = $(this);
                window.setTimeout(function () {
                    var position = positions[i]; //setNextPosition(offset, direction);
                    ele.css({ 'top': position.top, 'left': position.left });
                    ele.addClass('open');
                }, delayTime);
            });
        }, function () {
            $(this).removeClass('open');
            menuButtons.each(function (i) {
                delayTime = i * delay;
                var ele = $(this);
                window.setTimeout(function () {
                    ele.css({ 'top': initPosition.top, 'left': initPosition.left });
                    ele.removeClass('open');
                }, delayTime);
            });
        });
    };

})(jQuery);  