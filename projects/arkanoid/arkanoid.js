"use strick";

//
let game_stage=0;
//Сколько очов
let points = 0;
//Параметры платформы
const platform_size_w = 100;
const platform_size_h = 20;
let platform_speed = 10;
let platform_x_position = 250;

//Параметры шарика
const radiusBall = 7;
let angleBall = 197;
let speedBall = 0;
let x_ball = 300;
let y_ball = 570;
let x_ort = 1;
let y_ort = 1;

//параметры блока
let block_x = 200;
let block_y = 200;
const block_w = 100;
const block_h = 25;

//создаем блоки в массиве
let blocks = [];
function create_blocks(){
for(let i = 0; i < 5; i++){
    blocks[i] = [];
    for(let m = 0; m < 8; m++){
        blocks[i][m] = {
            block_x : i+block_w*i+50,
            block_y : m+block_h*m+100,
        }
    }
}
}

create_blocks();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", key_down);
document.addEventListener("keyup", key_up);

let a_key = false;
let d_key = false;

function key_down(event){
    speedBall = 6;
    if(event.keyCode==65){
        a_key=true;
    }
    if(event.keyCode==68){
        d_key=true;
    }
}

function key_up(event){
    if(event.keyCode==65){
        a_key=false;
    }
    if(event.keyCode==68){
        d_key=false;
    }
}

function drawPlatform(x, y){
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, platform_size_w, platform_size_h);
    ctx.fillStyle = "darkred";
    ctx.fillRect(x+5, y+5, platform_size_w-10, platform_size_h-10);
}

function drawBall(x, y){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, radiusBall, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radiusBall-2, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

let grad_block;

function drawBlock(x, y){
    grad_block = ctx.createLinearGradient(x, y, x, y+block_h+30);
    grad_block.addColorStop(0, "green");
    grad_block.addColorStop(0.5, "black");
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, block_w, block_h);
    ctx.fillStyle = grad_block;
    ctx.fillRect(x+5, y+5, block_w-10, block_h-10);
}

let grad = ctx.createLinearGradient(0, 0, 0, 600);
grad.addColorStop(0, "blue");
grad.addColorStop(1, "lightblue");

function update(){
    //ctx.clearRect(0, 0, 600, 600);
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 600)
    //Управляем платформой
    if(a_key && platform_x_position > 0){
        platform_x_position -= platform_speed;
    }
    if(d_key && (platform_x_position < (600-platform_size_w))){
        platform_x_position += platform_speed;
    }
    drawPlatform(platform_x_position, 575);
    //механика шара с платформой и стенами
    drawBall(x_ball, y_ball);
    x_ball += ((Math.sin(Math.PI/180*angleBall)*speedBall)*x_ort);
    y_ball += ((Math.cos(Math.PI/180*angleBall)*speedBall)*y_ort);
    
    if(x_ball>(600-radiusBall)){
        x_ort *= -1;
    }
    if(x_ball<radiusBall){
        x_ort *= -1;
    }
    if(y_ball<radiusBall){
        y_ort *= -1;
    }
    if((y_ball>(600-radiusBall-platform_size_h)) && x_ball > platform_x_position && x_ball < (platform_x_position+platform_size_w/2)){
            x_ort = -1;
            y_ort = -1;
            angleBall = 45*(platform_size_w/2+platform_x_position-x_ball)/(platform_size_w/2);
    }
    
    if((y_ball>(600-radiusBall-platform_size_h)) && x_ball >= (platform_x_position+platform_size_w/2) && x_ball < (platform_x_position+platform_size_w)){
            x_ort = -1;
            y_ort = -1;
            angleBall = -45*((x_ball-platform_x_position)/(platform_size_w/2)-1);
    }
    //Если шарик упал
    if(((x_ball > 0 && x_ball < (platform_size_w+platform_x_position)) && y_ball > 600)){
       create_blocks();
        speedBall = 0;
        x_ball = 300;
        y_ball = 570;
        platform_x_position = 250;
        points = 0;
       }
    
    if(((x_ball > (platform_size_w+platform_x_position) && x_ball < 600) && y_ball > 600)){
       create_blocks();
        speedBall = 0;
        x_ball = 300;
        y_ball = 570;
        platform_x_position = 250;
        points = 0;
       }
    
    if(points==40){
       create_blocks();
        speedBall = 0;
        x_ball = 300;
        y_ball = 570;
        platform_x_position = 250;
        points = 0;
       }
    
    // столкновение со всеми блоками
    for(let i = 0; i < 5; i++){
        for(let m = 0; m < 8; m++){
            drawBlock(blocks[i][m].block_x, blocks[i][m].block_y);
            
            //столкновение с правой стороной
            if((y_ball > blocks[i][m].block_y && y_ball < (blocks[i][m].block_y+block_h)) && (x_ball-radiusBall < (blocks[i][m].block_x+block_w)) && ((x_ball) > (blocks[i][m].block_x+block_w))){
               x_ort *= -1;
                blocks[i][m].block_y=1000; blocks[i][m].block_x=1000;
                points++;;
            }
            //столкновение с верхней стороной
            if((x_ball > blocks[i][m].block_x && x_ball < (blocks[i][m].block_x+block_w)) && (y_ball < (blocks[i][m].block_y)) && ((y_ball+radiusBall) > (blocks[i][m].block_y))){
                y_ort *= -1;
                blocks[i][m].block_x=1000; blocks[i][m].block_y=1000;
                points++;
            }
            //столкновение с нижней стороной
            if((x_ball > blocks[i][m].block_x && x_ball < (blocks[i][m].block_x+block_w)) && (y_ball-radiusBall < (blocks[i][m].block_y+block_h)) && ((y_ball+radiusBall) > (blocks[i][m].block_y+block_h))){
                y_ort *= -1;
                blocks[i][m].block_x=1000; blocks[i][m].block_y=1000;
                points++;
            }
            //столкновение с левой стороной
            if((y_ball > blocks[i][m].block_y && y_ball < (blocks[i][m].block_y+block_h)) && (x_ball-radiusBall < (blocks[i][m].block_x)) && ((x_ball+radiusBall) > (blocks[i][m].block_x))){
                x_ort *= -1;
                blocks[i][m].block_x=1000; blocks[i][m].block_y=1000;
                points++;
            }
        }
    } 
            ctx.fillStyle = "white";
            ctx.font="20px Georgia";
            ctx.fillText("Points: " + points,20,40);
    
    
}

setInterval(update, 1000/60);