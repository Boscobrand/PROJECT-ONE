//Set up arrays to collect data patterns
let computerArray = [];
let playerArray = [];

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
    readout.textContent = "PRESS DEFUSE TO BEGIN";
    //note 2
}

//note 2.5
function playerTurn(levelCount){
    readout.textContent = `YOUR TURN: ${levelCount} Entries${levelCount > 1 ? 's': ''}`;
}


//touchpad activation
function touchpadAction(color) {
    
    const dataTouchpadA = [document.getElementsByName('#data-touchpad')]
    console.log(dataTouchpadA)
    
    const dataTouchpad= document.getElementsByName(`[data-touchpad='${color}']`);
    //const sfx = document.getElementsByName(`[data-sfx = '${color}']`);
    console.log(dataTouchpad)

    dataTouchpad.classList.add('activated');
    // sfx.play();
 

    setTimeout(() => {
        dataTouchpad.classList.remove('activated');
    }, 350);
}

//This function will iterate over the advcomputerArray, and stall the iteration so all values arent called at once, turning on all touchpads at the same tine.
function play(advcomputerArray) {
    advcomputerArray.forEach((color,index) => {
        setTimeout(() => {
            touchpadAction(color);
        }, (index + 1) * 600);
    });
}

function sequenceGenerator() {
    const touchpads = ['red','white','gray','green'];
    const generate = touchpads[Math.floor(Math.random() * touchpads.length)];
    //Multiplying data-touch.length and Math.random creates a range between 1-4 instead of floats between 0-1. Math floor rounds fractional numbers down to whole numbers (0-3) 
    //referenced: https://discuss.codecademy.com/t/how-do-math-random-and-math-floor-work-together/490890
    return generate;
}

function advanceRound() {
    levelCount +=1;

    readout.textContent = "REMEMBER THIS SEQUENCE";
    readout2.textContent= `LEVEL ${levelCount} of 15`;

    const advcomputerArray =[...computerArray];
    //spread operator: p.196 8.3.4 O'Reilly Javascript The Definitive Guide 7th Ed, by David Flanagan
    advcomputerArray.push(sequenceGenerator);
    //console.log(advcomputerArray);
    play(advcomputerArray);

    computerArray = [...advcomputerArray];
    setTimeout(() =>{
        playerTurn(levelCount);
    }, levelCount * 550 + 1100);
}

const remainingEntries = computerArray.length - playerArray.length;

function capture(touchpad) {
    const index = playerArray.push(touchpad)-1;
    //const sfx = document.querySelector(`[data-sfx='${touchpad}']`);
   // sfx.play()
    
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

    playerArray = [];
    readout.textContent = "GOOD, STAY FOCUSED!";
    setTimeout(() => {
        advanceRound();
    }, 1100);
    return;
}
    readout2.textContent = `GO! ${remainingEntries} Entries${
        remainingEntries >1 ? 's' : ''
    }`;


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
