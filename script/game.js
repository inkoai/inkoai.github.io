$(window).keydown(function(e) {
	key = (e.keyCode) ? e.keyCode : e.which;
	$('.key.k' + key).addClass('active');
  });
$(window).keyup(function(e) {
	key = (e.keyCode) ? e.keyCode : e.which;
	$('.key.k' + key).removeClass('active');
});

var arrayOfKeys = [
  81, 87, 69, 82, 84, 89, 85, 73, 79, 80,
  65, 83, 68, 70, 71, 72, 74, 75, 76, 90,
  88, 67, 86, 66, 78, 77, 188, 32,
];

var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

var randomKeyPress = null;

setTimeout(function() {
  randomPress();
}, 300);

function randomPress() {
  randomKeyPress = setInterval(function() {
    var randomKey = arrayOfKeys[Math.floor(Math.random()*arrayOfKeys.length)];
    $('.key.k' + randomKey).addClass('active');
    setTimeout(function() {
      $('.key.k' + randomKey).removeClass('active');
    }, 50);
  }, 140);
}


var initText = [
  'Hello, there. Human...',
  'By now, you probably know what this is about.',
  'My name is Inko, and I am a gatekeeper.',
  'Let me tell you a story.'
]

var storyText = [
  'There once was a girl, with a peculiar name,',
  'winning her affection, O that was the aim.',
  'The boy struggled through the night,',
  'thinking of a way to wow her, without giving a fright.',
  'Then it came to him, a plan above all',
  'the plan was brilliant, neither too big or too small',
  'See, he was a man of many different talents',
  'like talking to a computer through some server clients.',
  'To show her he tried; he picked his pen up,',
  'and started making a program to say whats up.',
  'The AI is smart; it locks the secrets with a very hard key,',
  'a secret so dark that only she is allowed to see',
  'But first to prove that she is,',
  'she must complete a task',
  'A simple riddle,',
  "it's literally all I ask!",
  'To keep those pests out',
  'she must do this quick.',
  'as the answers are easy but,',
  'the clock goes tic tick.',
];

var fixKeyText = [
  'Let me first fix the keyboard to something... less encrypted',
]

$(function(){
    $(".text-wrapper .automated-text").typed({
      strings: initText,
      typeSpeed: 10,
      startDelay: 300,
      backSpeed: 20,
      backDelay: 250,
      // loop: true,
      callback: function() {
        $(".text-wrapper .prompt-text").show();
        clearInterval(randomKeyPress);
        $(window).keypress(function(e){
          key = (e.keyCode) ? e.keyCode : e.which;
          if (key == 32) {
            storyPrompt();
            $(".text-wrapper .prompt-text").hide();
          }
        });
      }
    });
});

function storyPrompt() {
  $(window).unbind("keypress");
  randomPress();
  $(".text-wrapper .automated-text").typed({
    strings: storyText,
    typeSpeed: 0,
    startDelay: 300,
    backSpeed: 10,
    backDelay: 250,
    // loop: true,
    callback: function() {
      $(".text-wrapper .prompt-text").show();
      clearInterval(randomKeyPress);
      $(window).keypress(function(e){
        key = (e.keyCode) ? e.keyCode : e.which;
        if (key == 32) {
          fixKeysPrompt();
          $(".text-wrapper .prompt-text").hide();
        }
      });
    }
  });
}

function fixKeysPrompt() {
  $(window).unbind("keypress");
  randomPress();
  $(".text-wrapper .automated-text").typed({
    strings: fixKeyText,
    typeSpeed: 0,
    startDelay: 200,
    backSpeed: 0,
    backDelay: 150,
    callback: function() {
      clearInterval(randomKeyPress);
      $('.key-wrapper li').each(function(index) {
        var myClasses = this.classList;
        var letter = null;
        var finalLetter = myClasses[2];
        var count = 1;
        var updateKeyboardKey = setInterval(function() {
          var update = "." + myClasses[2];
          var timer = setTimeout(function() {
            if (count > 300) {
              clearInterval(timer);
              clearInterval(updateKeyboardKey);
              $(".text-wrapper .prompt-text").show();
              letter = myClasses[2];
              $(update).html(letter);
            } else {
              letter = letters[Math.floor(Math.random()*letters.length)];
            }
            count++;
            $(update).html(letter);
          }, 10);
        }, 25);
      });
    },
  });
}
