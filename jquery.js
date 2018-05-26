//click start reset button
//are we playing?
//yes
    //reload the page
//no
    //show trials left
    //change button text to "reset game"
    //1.create a random fruit
    //define a random step
    //2.move fruit down one step every 30s
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
//var step=0.9; 
var action;
$(function(){

$("#startreset").click(function(){

   if(playing == true){
	   // resetting screen 
	   playing = false;
	   
       location.reload();
   }
   else{
	   // starting game
       playing = true;
	   
       score = 0;
       $("#score").html(score*10);
       $("#trialsleft").show();
       trialsleft = 3;
       addHearts();
       $("#startreset").html('RESET GAME');
       $("#gameover").hide();
       
	   startaction();
	   
   }
}); 

$("#fruit1").mouseover(function(){
   score += 1;
   $("#score").html(score*10);
   $("#slicesound")[0].play();
   clearInterval(action);
   $("#fruit1").hide("explode", 500); 
   startaction();
   setTimeout(startaction, 500); // Time between two fruit after fruit explodes
});

function addHearts(){
	
$("#trialsleft").empty();
for(i = 0; i < trialsleft; i++){
           $("#trialsleft").append('<i class="fa fa-heart life"></i> ');
		  
}
}

/*
startaction function

show #fruit1, choose a random fruit , give initial position,
*



*/



function startaction(){
$("#fruit1").show();
chooseFruit();
$("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
//step = 1+Math.round(5*Math.random());
action = setInterval(function(){
    $("#fruit1").css('top', $("#fruit1").position().top + 1);
    if($("#fruit1").position().top > $("#fruitscontainer").height()){
       if(trialsleft > 1){
           $("#fruit1").show();
           chooseFruit();
           $("#fruit1").css({'left': Math.round(550*Math.random()), 'top': -50});
           //step = 1+Math.round(5*Math.random());
           trialsleft -= 1;
           addHearts();
       }
       else{
           $("#gameover").show();
           playing = false;
           $("#startreset").html(' START GAME');
           $("#gameover").html('<p class="over">Game Over!</p><p class="over"> Score:'+ score*10 +'</p>');
		   trialsleft -= 1;
           addHearts();
           stopaction();
       }}
}, 10);
}

function chooseFruit(){
	//console.log(step);
$("#fruit1").attr('src','images/'+fruits[Math.round((Math.random()*8))]+'.png');
}

function stopaction(){
clearInterval(action);
$("#fruit1").hide();
}

});