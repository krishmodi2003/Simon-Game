// alert('Hello') testing JS integration
userClickedPattern=[];
gamePattern=[];
var level=0;
var started = false
$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        nextSequence();
        started=True
    }
})

// Button array colour creation
buttonColours=['red','blue','green','yellow'];
noOfButtons= $('.btn').length;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $(document).text('Level '+level);
    var randomNumber=Math.random()
    randomNumber=Math.floor(randomNumber*4);
    // Creating a variable for random colour selection using randomnumber created

    var randomChosenColour=buttonColours[randomNumber];
    
    // Adding random chosencolour to gamepattern array using push method
    gamePattern.push(randomChosenColour);
//    Adding Animation to button so selected randomly by function
    var ButtonAnimate= $("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//    Creating audio function so that color button randomly selected has its corresponding audio played thereon
    playSound(randomChosenColour);
    
    
}
$('.btn').click(function(event){
    // console.log(this.event)
    var userChosenColour=$(this).attr('id')
    // console.log(userChosenColour); 
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3')
    audio.play();
}
// Animating button user clicks,
function animatePress(currentColour){
    // document.querySelector('.'+currentColour).classList.add('pressed');
    $('.'+currentColour).addClass('pressed');
    var delayInMiliseconds=100;
setTimeout(function(){
    $('.'+currentColour).removeClass('pressed')
},delayInMiliseconds);
}

function checkAnswer(currentLevel){
        if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
                console.log('success')
        }
            if(userClickedPattern.length === gamePattern.length){
                    setTimeout(function(){
                        nextSequence();

                    },1000);
            }
        else{
            console.log('Wrong');
            playSound('wrong');
            $('body').addClass('game-over')
            setTimeout(function(){
                $('body').removeClass('game-over')
            },200);
            $('h1').text('Game Over, Press Any Key to Restart')
            startOver();
        }

}

function startOver(){
    level =0;
    gamePattern=[];;
    started= False;
}


