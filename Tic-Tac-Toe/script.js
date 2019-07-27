window.onload = init;

var w, h, ctx;
var board = ['','','',
             '','','',
             '','',''];
var players = ['O','X'];
var canvas = [];
var turn;
var winner = null;

function init(){
    console.log("DOM Started!")
    fillCanvas();
    assignEventListeners();
    turn = getRandomPlayer();
}

function fillCanvas(){
    console.log("Delivering canvas!")
    canvas.push(document.getElementById("oneone"));
    canvas.push(document.getElementById("onetwo"));
    canvas.push(document.getElementById("onethree"));
    canvas.push(document.getElementById("twoone"));
    canvas.push(document.getElementById("twotwo"));
    canvas.push(document.getElementById("twothree"));
    canvas.push(document.getElementById("threeone"));
    canvas.push(document.getElementById("threetwo"));
    canvas.push(document.getElementById("threethree"));
    console.log("No. of canvas= "+ canvas.length);
    console.log("Type of canvas: "+ canvas[0]);
}

function assignEventListeners(){
    for (let i=0; i<9; i++){
        canvas[i].addEventListener('mousedown', play);
    }
    console.log("Event Listeners attached successfully!");
}

function play(evt){
    let slot = whichSlot(evt.target.id);
    console.log("Clicked Canvas: "+ slot);
    if (turn === 0) {
        playO(slot);
    }
    else {
        playX(slot);
    }
}

function whichSlot(id){
    switch (id){
        case 'oneone': 
            return 0;

        case 'onetwo': 
            return 1;

        case 'onethree': 
            return 2;

        case 'twoone': 
            return 3;

        case 'twotwo': 
            return 4;

        case 'twothree': 
            return 5;

        case 'threeone': 
            return 6;

        case 'threetwo': 
            return 7;

        case 'threethree': 
            return 8;

    }
}

function playX(slot){

    if (!board[slot]){
    board[slot] = players[0];
    let clickedCanvas = canvas[slot];
    getDimensions(clickedCanvas);
    ctx = clickedCanvas.getContext('2d');
    ctx.save();
    ctx.moveTo(0,0);
    ctx.lineTo(w,h);
    ctx.moveTo(w,0);
    ctx.lineTo(0,h);
    ctx.strokeStyle = 'greenyellow';
    ctx.lineWidth = 5;
    ctx.stroke();
    if (checkWinner()){
        let results =document.getElementById("results");
        results.textContent = players[turn] + " Wins the game!"
        endGame();
    } else {
    nextPlayerTurn();
    }
    }
}

function playO(slot){

    if (!board[slot]){
    board[slot] = players[1];
    let clickedCanvas = canvas[slot];
    getDimensions(clickedCanvas);
    ctx = clickedCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(w/2, h/2, 70 , 0, 2 * Math.PI);
    ctx.strokeStyle = 'greenyellow';
    ctx.lineWidth = 5;
    ctx.stroke();
    if (checkWinner()){
        let results =document.getElementById("results");
        results.textContent = players[turn] + " Wins the game!"
        endGame();
    } else {
    nextPlayerTurn();
    }
    }
}

function getDimensions(clickedCanvas){
    w = clickedCanvas.width;
    h = clickedCanvas.height;
}

function getRandomPlayer(){
    if (Math.random() > 0.5) return 1;
    else return 0;
}

function nextPlayerTurn(){
    if (turn === 1) turn = 0;
    else turn = 1;
}

function checkWinner(){
    return checkHorizontal() || checkVerical() || checkSlopy() ; 
}

function checkHorizontal(){
    if (board[0] == board [1] && board[1] == board[2] && board[0] != ''){
        return true;
    }
    else if (board[3] == board [4] && board[4] == board[5] && board[3] != ''){
        return true;
    }
    else if (board[6] == board [7] && board[7] == board[8] && board[6] != ''){
        return true;
}
    else return false;
}

function checkVerical(){
    if (board[0] == board [3] && board[3] == board[6] && board[0] != ''){
        return true;
    }
    else if (board[1] == board [4] && board[4] == board[7] && board[1] != ''){
        return true;
    }
    else if (board[2] == board [5] && board[5] == board[8] && board[2] != ''){
        return true;
    }
    else return false;
}

function checkSlopy(){
    if (board[0] == board [4] && board[4] == board[8] && board[0] != ''){
        return true;
    }
    else return false;
}

function endGame(){
    removeEventListeners();
    let playAgainButton = document.getElementById("playAgain");
    playAgainButton.style.visibility = 'visible';
}
function removeEventListeners(){
    for (let i=0; i<9; i++){
        canvas[i].removeEventListener('mousedown', play)
    }
}

function clearCanvas(canvas){
    ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function playAgain(){
    board = ['','','',
             '','','',
             '','',''];
    turn=null;
    winner = null;
    for (let i=0; i<9; i++){
        clearCanvas(canvas[i])
    }
    let playAgainButton = document.getElementById("playAgain");
    playAgainButton.style.visibility = 'hidden';
    let results =document.getElementById("results");
    results.textContent ='';
    init();
}
