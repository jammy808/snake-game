const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetB = document.querySelector("#reset");
const Gwidth = gameboard.clientWidth;
const Gheight = gameboard.clientHeight;
const boardBg  = "white";
const snakeColor = "lightgreen";
const foodColor = "red";
const unitSize = 25;
let running =false;
let xVelocity = unitSize;
let yVelocity =0;
let foodX;
let foodY;
let  score=0;
let snake= [
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
];
//Variable decleration complete

window.addEventListener("keydown",changeDirection);
resetB.addEventListener("click",resetGame);

gameStart();

function gameStart(){
    running=true;
    scoreText.textContent= score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },100);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle= boardBg;
    ctx.fillRect(0,0,Gwidth,Gheight);
};
function createFood(){
    function randFood(min,max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    foodX = randFood(0,Gwidth-unitSize);
    foodY = randFood(0,Gwidth-unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food eaten
    if(snake[0].x==foodX && snake[0].y ==foodY){
        score+=1;
        scoreText.textContent=score;
        createFood();
    }
    else{
        snake.pop()
    }
};
function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle="darkgreen";
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    });
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const l=37;
    const u=38;
    const r=39;
    const d=40;
    
    const goingUp = (yVelocity== -unitSize);
    const goingDown = (yVelocity== unitSize);
    const goingLeft = (xVelocity== -unitSize);
    const goingRight = (xVelocity== unitSize);
    
    switch(true){
        case(keyPressed==l &&!goingRight):
            xVelocity= -unitSize;
            yVelocity=0;
            break;
        
        case(keyPressed==u &&!goingDown):
            xVelocity= 0;
            yVelocity=-unitSize;
            break;

        case(keyPressed==r &&!goingLeft):
            xVelocity= unitSize;
            yVelocity=0;
            break;

        case(keyPressed==d &&!goingUp):
            xVelocity= 0;
            yVelocity= unitSize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running=false;
            break;
        case(snake[0].x >= Gwidth):
            running=false;
            break;
        case(snake[0].y < 0):
            running=false;
            break;
        case(snake[0].y >= Gheight):
            running=false;
            break;
    }
    
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
               running=false;    
        }
    }
};
function displayGameOver(){
    ctx.font = "50px Permanent Marker";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Snake is Dead!",Gwidth/2,Gheight/2);
    running=false;
};
function resetGame(){
    score=0;
    xVelocity=unitSize;
    yVelocity=0;
    snake= [
        {x:unitSize*4,y:0},
        {x:unitSize*3,y:0},
        {x:unitSize*2,y:0},
        {x:unitSize,y:0},
        {x:0,y:0}
    ];
    gameStart();
};