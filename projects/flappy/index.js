"use strict";

let imgFlappy = new Image();
imgFlappy.src = "flappy.png";

let imgFon = new Image();
imgFon.src = "fon.png";


const sizeFlappy = 50;
const gravity = 0.5 ;
const jump = 10;
const passh = 200;
const passw = 100;
const groundH = 100;

let start = false;

let pass_pos_y1 = randomInteger(100, 400);
let stoneX1 = 500;

let pass_pos_y2 = randomInteger(100, 400);
let stoneX2 = 800;

let stoneSpeed = 2.5;

let xF = 50;
let yF = 250;
let speedFy = 0;

let points = 0;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.addEventListener("keydown", jumpt);

function jumpt(event){
    if(event.keyCode == 32){
        speedFy = -jump;
        start = true;
    }
}

function drawFlappy(x, y){
    //ctx.fillRect(x, y, sizeFlappy, sizeFlappy);
    ctx.drawImage(imgFlappy, x, y);
}

function drawStone1(x){
    ctx.fillRect(x, 0, passw, pass_pos_y1);
    ctx.fillRect(x, pass_pos_y1+passh, passw, 700);
}

function drawStone2(x){
    ctx.fillRect(x, 0, passw, pass_pos_y2);
    ctx.fillRect(x, pass_pos_y2+passh, passw, 700);
}

function drawGround(h){
    ctx.fillRect(0, 700, 700, -groundH);

}

function isCollision(){
    if(xF+sizeFlappy > stoneX1 && xF < stoneX1+passw){
        if(yF < pass_pos_y1 || yF+sizeFlappy > pass_pos_y1+passh){
            stoneX1 = 500;
            stoneX2 = 800
            yF = 250;
            speedFy = 0;
            points = 0;
            pass_pos_y1 = randomInteger(100, 400);
            pass_pos_y2 = randomInteger(100, 400);
            start = false;
        }
    }
    if(yF+sizeFlappy>700-groundH){
        stoneX1 = 500;
        stoneX2 = 800;
        yF = 250;
        speedFy = 0;
        points = 0;
        pass_pos_y1 = randomInteger(100, 400);
        pass_pos_y2 = randomInteger(100, 400);
        start = false;
    }
    
    if(xF+sizeFlappy > stoneX2 && xF < stoneX2+passw){
        if(yF < pass_pos_y2 || yF+sizeFlappy > pass_pos_y2+passh){
            stoneX1 = 500;
            stoneX2 = 800
            yF = 250;
            speedFy = 0;
            points = 0;
            pass_pos_y1 = randomInteger(100, 400);
            pass_pos_y2 = randomInteger(100, 400);
            start = false;
        }
    }
    
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function update(){
        ctx.fillStyle = "black";
        ctx.drawImage(imgFon, 0, 0);
        drawGround();
        drawFlappy(xF, yF);
        drawStone1(stoneX1);
        drawStone2(stoneX2);
        ctx.fillStyle = "white";
        ctx.font = "40px arial";
        if(start==false) ctx.fillText("Press space to start", 75, 670 );
        if(start==true){
        yF += speedFy;
        speedFy += gravity;
        stoneX1 -= stoneSpeed;
        stoneX2 -= stoneSpeed;
        if(stoneX1+passw < 0){
            stoneX1 = 400+passw;
            pass_pos_y1 = randomInteger(100, 400);
            points++;
        }
        if(stoneX2+passw < 0){
            stoneX2  = 400+passw;
            pass_pos_y2 = randomInteger(100, 400);
            points++;
        }
        isCollision();
        ctx.fillStyle = "white";
        ctx.font = "40px arial";
        ctx.fillText(points, 250, 670 );
    }
}

setInterval(update, 1000/60);