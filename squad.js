//Set up arrays to collect data patterns
let playerArray = [];
let simonArray = [];


//instantiate key variables
const start = document.getElementById('defuse');
console.log(start)

//const text = document.querySelector('text')
const readout = document.querySelector('.readout1');
const readout2 = document.querySelector('.readout2');

let levelCount = 0;

function reset(text) {
    alert(text);
    simonArray=[];
    playerArray=[];
    levelCount = 0;
    readout.textContent = "PRESS DEFUSE TO BEGIN";
    //2
}

//
function playerTurn(levelCount){
    readout.textContent = "YOUR TURN: $(levelCount) Entries$(levelCount>1?'s':");
}

//touchpad activation
function touchpadAction(colorcode) {
    const touched = document.querySelector(`[touchdata='${colorcode}']`);
    //const signal = document.querySelector(`[touchsignal = '${colorcode}']`);

    touched.classList.add('pressed');
    //signal.play();

    setTimeout(() => {
        touched.classList.remove('pressed');
    }, 300);
}

//This function will iterate over the advSimonArray, and stall the iteration so all values arent called at once, turning on all touchpads at the same tine.
function play(advSimonArray) {
    advSimonArray.forEach((colorcode,index) => {
        setTimeout(() => {
            touchpadAction(colorcode);
        }, (index + 1) * 600);
    });
}

function sequenceGenerator() {
    const touchdata = ['red1','white1','gray1','green1'];
    const generate = touchdata[Math.floor(Math.random() * touchdata.length)];
    //Multiplying touchdata.length and Math.random creates a range between 1-4 instead of floats between 0-1. Math floor rounds fractional numbers down to whole numbers (0-3) 
    //referenced: https://discuss.codecademy.com/t/how-do-math-random-and-math-floor-work-together/490890
    return generate;
}

function advanceRound() {
    levelCount +=1;

    readout.textContent = "REMEMBER THIS SEQUENCE";
    readout2.textContent= `LEVEL $(levelCount) of 10`;

    const advSimonArray =[...simonArray];
    //spread operator: p.196 8.3.4 O'Reilly Javascript The Definitive Guide 7th Ed, by David Flanagan
    advSimonArray.push(advanceRound());
    play(advSimonArray);

    simonArray = [...advSimonArray];
    setTimeout(() =>{
        playerTurn(levelCount);
    }, levelCount * 600 + 1000);
}

function captureClick(touchpad) {
    const index = playerArray.push(touchpad)-1;
    //signalplay
    
    const remaining = simonArray.length - playerArray.length;

    if(playerArray[index] !== simonArray[index]) {
        //play exploding gif
        reset('TICK...TICK...BOOM! GAME OVER!');
        return;
    }

    if(playerArray.length === simonArray.length) {
        if (playerArray.length === 14);
        //play applause gif
        reset('TICK...TICK...CLICK! NICE WORK, BOMB DEFUSED!');
        return;
    }

    playerArray = [];
    readout.textContent = "GOOD, STAY FOCUSED!";
    setTimeout(() => {
        advanceRound();
    }, 1000);
    return;

    readout2.textContent = `GO! ${remaining} Entries${
        remaining >1 ? 's' : ''
        }`;
}



function begin() {
    readout = "REMEMBER THIS SEQUENCE";
    advanceRound();
}

start.addEventListener('click', begin, false);

touchpad_set.addEventListener('click',event => {
    const[touchpad] = event.target.touchdata;
    //if (tile) captureClick( //xxxx );
});
