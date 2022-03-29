//Set up arrays to collect data patterns

let simonArray = []
let playerArray = []

//start of game
const startSimon = document.querySelector('#defuse')
startSimon.addEventListener('click',tbd)

function beginGame() {
    deliver.command = "REMEMBER THIS SEQUENCE";
}

//game pattern generator(TBD)
let levelCount=0

function sequenceGenerator() {
    const touchdata = ['red1','wht1','gra1','grn1']
    const generate = touchdata[Math.floor(Math.random() * touchdata.length)]
    //Multiplying touchdata.length and Math.random creates a range between 1-4 instead of floats between 0-1. Math floor rounds fractional numbers down to whole numbers (0-3) 
    //referenced: https://discuss.codecademy.com/t/how-do-math-random-and-math-floor-work-together/490890
    return random;
}

function advanceRound() {
    levelCount +=1;
    const advSimonArray =[...simonArray];
    //spread operator: p.196 8.3.4 O'Reilly Javascript The Definitive Guide 7th Ed, by David Flanagan
    advSimonArray.push(advanceRound)
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

function play











//computer turn




//player turn




//tracking


//status window updates


//
