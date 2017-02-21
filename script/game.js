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
  'Hello, there. BB...',
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
  'as the answer is easy but,',
  'the clock goes tic tick.'
];

var questionsText = [
  "What number is the answer to the ultimate question in life?", //42
	"What kind of room does not have windows or doors?", //mushroom
	"Feed me and I'll live, give me a drink and I'll die. Who am I?", // fire
	"If you don't hold me, you break me. I am a ____?", // promise
	"Which word in the dictionary is spelt incorrectly?", // incorrectly
	"I'm always coming, but I never arrive. Who am I?", // tomorrow
	"If you have me, you want to share me. If you share me, you haven’t got me. What am I?", // secret
	"What can you catch but not throw?", // cold
	"what's your name?"
];

var questionAnswers = {
	0: "42",
	1: "mushroom",
	2: "fire",
	3: "promise",
	4: "incorrectly",
	5: "tomorrow",
	6: "secret",
	7: "cold",
	8: "susan"
};

var fixKeyText = [
  'Let me first fix the keyboard to something... less cryptic',
];

var finalText = [
	"Congrats. You've actually made it. Ready for part 2?"
];

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
            if (count > 30) {
              clearInterval(timer);
              clearInterval(updateKeyboardKey);
              $(".text-wrapper .prompt-text").show();
              letter = myClasses[2];
              $(update).html(letter);
							$(window).keypress(function(e){
								key = (e.keyCode) ? e.keyCode : e.which;
								if (key == 32) {
									waitForFirstAnswer();
									$(".text-wrapper .automated-text").html("");
									$('.text-wrapper .prompt-text').html("What's the first answer? It's easy if you think about it");
								}
							});
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

//69, 65, 83, 89
function waitForFirstAnswer() {
	$(window).unbind("keypress");
	var answerString = '';
	var encryptedString = '';
	$(window).keypress(function(e) {
		var key = (e.keyCode) ? e.keyCode : e.which;
		answerString = answerString + String.fromCharCode(key);
		encryptedString = encryptedString + "*";
		if (key == 13) {
			if (checkFirstAnswer(answerString)) {
				commenceQuestions();
			} else {
				answerString = '';
				encryptedString = '';
				$(".text-wrapper .automated-text").html("");
			}
		} else {
			$(".text-wrapper .automated-text").html(answerString);
		}
	});
	$(window).keyup(function(e) {
		var key = (e.keyCode) ? e.keyCode : e.which;
		if (key == 8) {
			answerString = answerString.substring(0, answerString.length-1);
			$(".text-wrapper .automated-text").html(answerString);
		}
	});
}

function checkFirstAnswer(answerString) {
	var checkString = answerString.toLowerCase();
	checkString = checkString.replace(/\s/g, '');
	return checkString === "easy";
}

function commenceQuestions() {
	//continue;
	var counter = 0;
	nextQuestion(counter);
}

function nextQuestion(count) {
	$(window).unbind("keypress");
	$(".text-wrapper .automated-text").html("");

	$('.text-wrapper .prompt-text').html(questionsText[count]);

	var answerString = '';
	$(window).keypress(function(e) {
		var key = (e.keyCode) ? e.keyCode : e.which;
		answerString = answerString + String.fromCharCode(key);
		if (key == 13) {
			console.log(answerString)
			if (answerString.toLowerCase().replace(/\s/g, '') == questionAnswers[count]) {
				console.log("Correct! Answer was:" + questionAnswers[count]);
				count = count + 1;
				if (count > 8) {
					finalTextPrompt();
				} else {
					nextQuestion(count);
				}
			} else {
				answerString = '';
				$(".text-wrapper .automated-text").html("");
			}
		} else {
			$(".text-wrapper .automated-text").html(answerString);
		}
	});
	$(window).keyup(function(e) {
		var key = (e.keyCode) ? e.keyCode : e.which;
		if (key == 8) {
			answerString = answerString.substring(0, answerString.length-1);
			$(".text-wrapper .automated-text").html(answerString);
		}
	});
}

function finalTextPrompt() {
	$(".text-wrapper .automated-text").typed({
    strings: finalText,
    typeSpeed: 10,
    startDelay: 300,
    backSpeed: 20,
    backDelay: 250,
    // loop: true,
    callback: function() {
			$('.text-wrapper .prompt-text').html("Press space to claim your prize.");
      clearInterval(randomKeyPress);
      $(window).keypress(function(e){
        key = (e.keyCode) ? e.keyCode : e.which;
        if (key == 32) {
          changeModes();
          $(".text-wrapper .prompt-text").hide();
        }
      });
    }
  });
}

function changeModes() {
	$(".game-wrapper").hide();
	$('head').append('<link rel="stylesheet" href="styles/final.css" type="text/css" />');
	$(".final-wrapper").show();
}
