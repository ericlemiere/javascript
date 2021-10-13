var startClick = 0;
$(document).ready(function() {
    $('ul').fadeIn(1000);
    $('.red').fadeOut(400).fadeIn(1000);
    $('.green').fadeOut(600).fadeIn(1000);
    $('.blue').fadeOut(800).fadeIn(1000);
    $('.yellow').fadeOut(1000).fadeIn(1000);

    $("#start").click(function() {
        if (startClick == 0) {
            $(".centeredDiv").animate({ 
                height: "+=500px",
                width: "+=500px"
             });
             $("#colors li").animate({
                height: "+=250px",
                width: "+=250px"
            });
            startClick++;
        }
        
    });
});




$(function() {
    var colors = $('#colors li');
    var mainColor = $('#main');
    var start = $('#start');
    var gameState = 'waiting';
    var gameSequence = new Array();
    var level = 1;
    var t, flashNo, clickedNo;
    var setupLightSequence = function() {
        var randomNum = Math.floor(Math.random() * 4);
        gameSequence[level-1] = randomNum;
        showLightSequence();
    };
    var lightOn = function(no) {
        colors.eq(gameSequence[no]).addClass('on');
    };


    var lightOff = function() {
        colors.removeClass('on');
    };

    var showLightSequence = function() {
        lightOff();

        if (flashNo < level) {
            var on = setTimeout(function() {
                var off = setTimeout(function() {
                    showLightSequence();
                    flashNo++;
                }, 500);
                lightOn(flashNo);
            }, 500);
        }
        else {
            gameState = 'playing';
            $('body').addClass('playing');
            start.text('Your turn...');
            clearTimeout(on);
        }
    };

    colors.click(function() {
        if (gameState == 'playing') {
            var selectedSquare = $(this).index();
            var selectedColor = $(this).css('background-color');

            if (gameSequence[clickedNo] == selectedSquare) {
                if (clickedNo == level - 1) {
                    gameState = 'waiting';
                    $('body').removeClass('playing');
                    level++;
                    start.text('Good! Click here for level ' + level);
                }

                lightOn(clickedNo);
                var off = setTimeout(function() {
                    lightOff();
                    clickedNo++;
                }, 200);
            }
            else {
                gameState = 'waiting';
                $('body').removeClass('playing');
                start.text('GAME OVER');
                $('body').removeClass('playing').addClass('game-over');
                gameSequence = new Array();

                level = 1;
            }
        }
    });

    var init = function() {
        $('#level').text('Level ' + level).animate({
            fontSize: "40px",

        }).css({"color": "black"});
        flashNo = 0;
        clickedNo = 0;
        $(this).text('Simon Says...');
        setTimeout(() => {
            
        }, 1000);
        setupLightSequence();
        
    }
    start.click(init);
});