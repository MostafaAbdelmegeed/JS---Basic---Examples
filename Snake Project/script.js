
// Using the onload to initialize my script on loading
// of the DOM
var canvas, ctx, w, h, snake, direction, prevDirection, apple;

class Snake {
    constructor(age, speed, xhead, yhead, xbody, ybody) {
        this.age = age;
        this.speed = speed;
        this.head = { x: xhead, y: yhead };
        this.body = [{ x: xbody, y: ybody }];
    }
};

class Apple {
    constructor() {
        this.x = Math.random() * (w - 32);
        this.y = Math.random() * (h - 32);
        this.isEaten = false;
    }
};


window.onload = init;

function init() {

    console.log("DOM Loaded!");
    // Canvas 
    canvas = document.querySelector("#gameWindow");

    if (canvas) {
    canvas.addEventListener('keydown', move );

    // Object to draw with 
    ctx = canvas.getContext('2d');

    w = canvas.width;
    h = canvas.height;
    snake = new Snake(1,8,1,1,w/2,h/2);
    apple = new Apple();
    ctx.fillStyle = 'slategrey';

    drawSnake();
    drawFood();

    //feedSnake();
    //deadSnake();
    }
}

function drawSnake() {

    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(snake.head.x,snake.head.y,16,8);
    ctx.restore();
}

function drawFood(){
    if (apple.isEaten){
        console.log("Created new Apple");
        apple = new Apple();
        console.log("is it eaten ? " + apple.isEaten);
    }

    ctx.save();
    ctx.fillRect(apple.x,apple.y,8,8);
    ctx.restore();
} 

function move(evt){
    direction = evt.keyCode;

    if ( Math.abs(direction - prevDirection) % 2){
    switch (evt.keyCode){
        case 38:
            moveUp();
            break;
        case 40:
            moveDown();
            break;
        case 37:
            moveLeft();
            break;
        case 39:
            moveRight();
            break;
    }
}
    if (prevDirection != direction)
    prevDirection = direction

    console.log(prevDirection);
}

function moveUp(){
    if (snake.head.y > 8 && (direction === 38 || direction === 40) ){
    console.log("Moving up at speed: "+ snake.speed);
    snake.head.y -= snake.speed;
    drawSnake();
    drawFood();
    if ((snake.head.x >= apple.x-8*2 && snake.head.x <= apple.x+8*2) && (snake.head.y <= apple.y+8 && snake.head.y >= apple.y-8))
    apple.isEaten = true;
    if (apple.isEaten){
        console.log("THE APPLE JUST GOT EATEN AT SNAKE COORDINATES: (" + snake.head.x +","+ snake.head.y +")");
        console.log("AND APPLE COORDINATES: (" + apple.x +","+apple.y+")");
        }
    setTimeout(moveUp,2000/snake.speed);
    }
}
function moveDown(){
    if (snake.head.y <= h-8 && (direction === 38 || direction === 40) ){
    console.log("Moving down at speed: "+ snake.speed);
    snake.head.y += snake.speed;
    drawSnake();
    drawFood();
    if ((snake.head.x >= apple.x-8*2 && snake.head.x <= apple.x+8*2) && (snake.head.y <= apple.y+8 && snake.head.y >= apple.y-8)){
        apple.isEaten = true;
        if (apple.isEaten){
            console.log("THE APPLE JUST GOT EATEN AT SNAKE COORDINATES: (" + snake.head.x +","+ snake.head.y +")");
            console.log("AND APPLE COORDINATES: (" + apple.x +","+apple.y+")");
            }
        }
    setTimeout(moveDown,2000/snake.speed);
    }
}
function moveLeft(){
    if (snake.head.x >= 8 && (direction === 37 || direction === 39) ){
    console.log("Moving left at speed: "+ snake.speed);
    snake.head.x -= snake.speed*2;
    drawSnake();
    drawFood();
    if ((snake.head.x >= apple.x-8*2 && snake.head.x <= apple.x+8*2) && (snake.head.y <= apple.y+8 && snake.head.y >= apple.y-8)){
    apple.isEaten = true;
    if (apple.isEaten){
    console.log("THE APPLE JUST GOT EATEN AT SNAKE COORDINATES: (" + snake.head.x +","+ snake.head.y +")");
    console.log("AND APPLE COORDINATES: (" + apple.x +","+apple.y+")");
    }
    }
    setTimeout(moveLeft,2000/snake.speed);
    }
}
function moveRight(){
    if (snake.head.x <= w-16 && (direction === 37 || direction === 39) ){
    console.log("Moving right at speed: "+ snake.speed);
    snake.head.x += snake.speed*2;
    drawSnake();
    drawFood();
    if ((snake.head.x >= apple.x-8*2 && snake.head.x <= apple.x+8*2) && (snake.head.y <= apple.y+8 && snake.head.y >= apple.y-8)){
        apple.isEaten = true;
        if (apple.isEaten){
            console.log("THE APPLE JUST GOT EATEN AT SNAKE COORDINATES: (" + snake.head.x +","+ snake.head.y +")");
            console.log("AND APPLE COORDINATES: (" + apple.x +","+apple.y+")");
            }
        }
    setTimeout(moveRight,2000/snake.speed);
    }
}

function redraw(){

}

function reset(){
    init();
}
