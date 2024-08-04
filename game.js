var gamepattern=[];
var userClickedpattern=[];

var buttoncolours=["red","blue","green","yellow"];

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
})


function nextsequence(){
    userClickedpattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomnumber=Math.floor(Math.random()*3+1);

    var randomChosencolour=buttoncolours[randomnumber];

    gamepattern.push(randomChosencolour);

    $("#" + randomChosencolour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosencolour);

}


$(".btn").click(function(){
    var userChosencolour= $(this).attr("id");
    userClickedpattern.push(userChosencolour);

    playsound(userChosencolour);
    animatepress(userChosencolour);
    checkanswer(userClickedpattern.length-1);
});

function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function animatepress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolour).removeClass("pressed");
    },100);
};


function checkanswer(currentlevel){

    if(gamepattern[currentlevel]==userClickedpattern[currentlevel]){
        console.log("success");
        if(userClickedpattern.length==gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    } 
    else{
        console.log("wrong");
        var wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to restart");
        startover();
    }

};

function startover(){
    gamepattern=[];
    level=0;
    started=false;
}