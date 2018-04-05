//click start reset button
//are we playing?
//yes
    //reload the page
//no
    //show trials left
    //change button text to "reset game"
    //1.create a random fruit
    //define a random step
    //2.move fruit dwon one step every 30s
    //is fruit too low?
      //no->repeat 2
      //yes-> any trials left?
               //yes -> repeat 1
               //no -> show game over, button text: start game

//slice a fruit
//play sound in the background
//explode fruit
var playing = false;
var score;
var trialsleft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;
$(function(){

$("#startreset").click(function(){

   if(playing == true){
       location.reload();
   }
   else{
       playing = true;
       score = 0;
       $("#score").html(score);
       $("#trialsleft").show();
       trialsleft = 3;
       addHearts();
       $("#startreset").html("Reset Game");
       $("#gameover").hide();
       startaction();
   }
}); 

$("#fruit1").mouseover(function(){
   score += 1;
   $("#score").html(score);
   $("#slicesound")[0].play();
   clearInterval(action);
   $("#fruit1").hide("explode", 500);
   startaction();
   setTimeout(startaction, 500);
});

function addHearts(){
$("#trialsleft").empty();
for(i = 0; i < trialsleft; i++){
           $("#trialsleft").append('<img src="images/heart.png" class="life">');
}
}

function startaction(){
$("#fruit1").show();
chooseFruit();
$("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
step = 1+Math.round(5*Math.random());
action = setInterval(function(){
    $("#fruit1").css('top', $("#fruit1").position().top + step);
    if($("#fruit1").position().top > $("#fruitscontainer").height()){
       if(trialsleft > 1){
           $("#fruit1").show();
           chooseFruit();
           $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
           step = 1+Math.round(5*Math.random());
           trialsleft -= 1;
           addHearts();
       }
       else{
           $("#gameover").show();
           playing = false;
           $("#startreset").html("Start Game");
           $("#gameover").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
           stopaction();
       }}
}, 10);
}

function chooseFruit(){
$("#fruit1").attr('src','images/'+fruits[Math.round((Math.random()*8))]+'.png');
}

function stopaction(){
clearInterval(action);
$("#fruit1").hide();
}

});