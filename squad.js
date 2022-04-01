//Set up arrays to collect data patterns
let computerArray = [];
let playerArray = [];
//shifted advcomputerArray here as global variable
let advcomputerArray =[...computerArray];


//setup
const start = document.getElementById('defuse');
const readout = document.querySelector('.readout');
const readout2 = document.querySelector('.readout2');
const touchpad_set=document.querySelector('.touchpad_set');

let levelCount = 0;

function reset(text) {
    alert(text);
    computerArray=[];
    playerArray=[];
    levelCount = 0;
    start.classList.remove('hidden');
    readout.textContent = "PRESS DEFUSE TO BEGIN";
    readout.classList.add('hidden');
    touchpad_set.classList.add('unclickable');
}

//note 2.5
function playerTurn(levelCount){
    touchpad_set.classList.remove('unclickable');
    readout.textContent = `YOUR TURN: ${levelCount} ENTRIES${levelCount > 1 ? '': ''}`;
}

//touchpad activation
function touchpadAction(color) {
    //const dataTouchpad = document.querySelector(`[data-touchpad='${'#id'}']`);
    const dataTouchpad = document.getElementById(color)
    //const dataTouchpad = document.querySelector('.touchpad');
    const sound = document.querySelector('.hidden');
    // const dataTouchpad= document.getElementsByName(`[data-touchpad='${color}']`);
    //console.log(dataTouchpad)

    
    dataTouchpad.classList.add('activated');
    sound.play();
 // console.log(dataTouchpad.classList)


    setTimeout(() => {
        dataTouchpad.classList.remove('activated');
    }, 350);
}

//This function will iterate over the advcomputerArray, and stall the iteration so all values arent called at once, turning on all touchpads at the same tine.
function playNext(advcomputerArray) {
    advcomputerArray.forEach((color,index) => {
        setTimeout(() => {
            touchpadAction(color);
        }, (index + 1) * 600);
    });
}
//shifted outside of function to make global variable
const touchpads = ['red','white','gray','green'];

function sequenceGenerator() {
    //NOTE: tested generate on its own in console and it is functioning
    const generate = touchpads[Math.floor(Math.random() * touchpads.length)];
    //console.log(generate)
    //Multiplying data-touch.length and Math.random creates a range between 1-4 instead of floats between 0-1. Math floor rounds fractional numbers down to whole numbers (0-3) 
    //referenced: https://discuss.codecademy.com/t/how-do-math-random-and-math-floor-work-together/490890
    return generate;
}


function advanceRound() {
    levelCount +=1;

    readout.textContent = "REMEMBER THIS SEQUENCE";
    readout2.textContent= `LEVEL ${levelCount} of 15`;

    
    //spread operator: p.196 8.3.4 O'Reilly Javascript The Definitive Guide 7th Ed, by David Flanagan
    advcomputerArray.push(sequenceGenerator());
    //console.log(advcomputerArray);
    playNext(advcomputerArray);

    computerArray = [...advcomputerArray];
    setTimeout(() =>{
        playerTurn(levelCount);
    }, levelCount * 550 + 1100);
}


function capture(touchpad) {
    const index = playerArray.push(touchpad) -1;
    //console.log(index)

    const sound = document.querySelector(`[data-sfx='${touchpad}']`);
    sound.play();

    const remaining = computerArray.length - playerArray.length;
    //console.log
    
    //console.log(playerArray[index])
    //console.log(computerArray[index])

    if(playerArray[index] !== computerArray[index]) {
        //play exploding gif
        reset('TICK...TICK...BOOM! GAME OVER!');
        return;
    }

    if(playerArray.length === computerArray.length) {
        if (playerArray.length === 15);
        //play applause gif
       reset('TICK...TICK...CLICK! NICE WORK, BOMB DEFUSED!');
        return;
    }

    //playerArray = [];
    readout.textContent = "GOOD, STAY FOCUSED!";
    setTimeout(() => {
        advanceRound();
    }, 1100);
    //return;

    readout2.textContent = `GO! ${remaining} Entries${
        remaining >1 ? '' : ''
    }`;

}

function begin() {
    readout.textContext = "REMEMBER THIS SEQUENCE";
    advanceRound();
}

start.addEventListener('click', begin);

touchpad_set.addEventListener('click', event => {
    const {
        touchpad
    } = event.target.dataset;

    if (touchpad) capture(touchpad);
});


//modified code from https://jsfiddle.net/wr1ua0db/17/
function startTimer(duration, display) {
    let timer = duration, minutes, seconds; //mills;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        //mills = parseInt(timer / 1000/60);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //mills   = mills < 10   ? "0" + mills : mills;

        display.textContent = minutes + ":" + seconds; //+ ":" + mills;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
     const sevenMinutes = 60 * 7,
        display = document.querySelector('#time');
    startTimer(sevenMinutes, display);
};