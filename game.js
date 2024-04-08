var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started){
        $("h1").text("Level " + level); 
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var buttonClicked = $(this).attr("id");
    userPattern.push(buttonClicked);

    playAudio(buttonClicked);
    animatePress(buttonClicked);
    checkUserClick(userPattern.length-1);
});

function checkUserClick(levelOfPattern) {
    if (userPattern[levelOfPattern] === gamePattern[levelOfPattern]){    
        if  (userPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playAudio("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        level = 0;
        gamePattern = [];
        started = false;
    }
}

function nextSequence() {
    //Empties user pattern
    userPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
}

function playAudio(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(colorClicked) {
    $("#" + colorClicked).addClass("pressed");
    setTimeout(function () {
      $("#" + colorClicked).removeClass("pressed");
    }, 100);
}
