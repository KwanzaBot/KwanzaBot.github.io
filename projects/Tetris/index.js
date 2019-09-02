"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let randomForm = 1;

let speed = 1000/3;

let field;

function newField(){
    field = 
    [   [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],  ];
}

newField();

let activeFigure;
let activeFigure_x = 3 * 40;
let activeFigure_y = -40 ;
let activeFigureH;
let activeFigureW;
let turn = 0;

function newFigure(figure, turn){
    if(figure == 0 && turn == 0){
        activeFigure = [[0, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    
    if(figure == 0 && turn == 1){
        activeFigure = [[1, 0, 0, 0],[1, 1, 0, 0],[1, 0, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    
    if(figure == 0 && turn == 2){
        activeFigure = [[1, 1, 1, 0],[0, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    
    if(figure == 0 && turn == 3){
        activeFigure = [[0, 1, 0, 0],[1, 1, 0, 0],[0, 1, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    if(figure == 1 && (turn == 0 || turn == 2)){
        activeFigure = [[1, 0, 0, 0],[1, 0, 0, 0],[1, 0, 0, 0],[1, 0, 0, 0]];
        activeFigureH = 4*40; activeFigureW = 1*40;
    }
    
    if(figure == 1 && (turn == 1 || turn == 3)){
        activeFigure = [[1, 1, 1, 1],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 1*40; activeFigureW = 4*40;
    }
    
    if(figure == 2){
        activeFigure = [[1, 1, 0, 0],[1, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 2*40;
    }
    
    if(figure == 3 && turn == 0){
        activeFigure = [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    if(figure == 3 && turn == 1){
        activeFigure = [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    if(figure == 3 && turn == 2){
        activeFigure = [[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    if(figure == 3 && turn == 3){
        activeFigure = [[1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    
    if(figure == 4 && turn == 0){
        activeFigure = [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    if(figure == 4 && turn == 1){
        activeFigure = [[1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    if(figure == 4 && turn == 2){
        activeFigure = [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    if(figure == 4 && turn == 3){
        activeFigure = [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    if(figure == 5 && (turn == 0 || turn == 2)){
        activeFigure = [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    if(figure == 5 && (turn == 1 || turn == 3)){
        activeFigure = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
    
    if(figure == 6 && (turn == 0 || turn == 2)){
        activeFigure = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 2*40; activeFigureW = 3*40;
    }
    if(figure == 6 && (turn == 1 || turn == 3)){
        activeFigure = [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
        activeFigureH = 3*40; activeFigureW = 2*40;
    }
}

function drawActiveFigure(x, y){
    for(let l = 0; l <= 3; l++){
        for(let m = 0; m <= 3; m++){
            if(activeFigure[l][m]==1){
                ctx.fillStyle = "blue";
                ctx.fillRect(activeFigure_x+40*m,activeFigure_y+40*l , 40, 40);
                
            }
        }
    }
}

function moveDown(){
    activeFigure_y += 40;
}

function addToField(){
    for(let l = 0; l <= 3; l++){
        for(let m = 0; m <= 3; m++){
            if(activeFigure[l][m]==1) field[l+activeFigure_y/40][m+activeFigure_x/40] = activeFigure[l][m];
            if((l+activeFigure_y/40)==1){
                newField();
                activeFigure_x = 3 * 40;
                activeFigure_y = 0 * 40 ;
            }
        }
    }
}

function collGround(){
    if(activeFigure_y+activeFigureH > 19*40){
        addToField();
        activeFigure_y = -40;
        activeFigure_x = 3 * 40;
        randomForm = randomInteger(0, 6);
    }
}

function collBlocks(){
    stop : for(let l = 0; l <= 3; l++){
        for(let m = 0; m <= 3; m++){
            if(activeFigure[l][m]==1 && field[activeFigure_y/40+1+l][activeFigure_x/40+m]==1){
                addToField();
                activeFigure_y = -40;
                activeFigure_x = 3 * 40;
                randomForm = randomInteger(0, 6);
                break stop;
            }
        }
    }   
}

function RColl(){
    for(let l = 0; l <= 3; l++){
        for(let m = 0; m <= 3; m++){
            if(activeFigure[l][m]==1 && field[activeFigure_y/40+l][activeFigure_x/40+m+1]==1){
                return false;
            }else{
                return true;
            }
        }
    }  
}

function LColl(){
    for(let l = 0; l <= 3; l++){
        for(let m = 0; m <= 3; m++){
            if(activeFigure[l][m]==1 && field[activeFigure_y/40+l][activeFigure_x/40+m-1]==1){
                return false;
            }else{
                return true;
            }
        }
    }  
}

document.addEventListener("keydown", move);
document.addEventListener("keyup", moveup);

function moveup(event)
{
    if(event.keyCode==83) {
        clearInterval(interval);
        speed = 1000/3;
        interval = setInterval(update, speed);
    }
}

function move(event){
    if(event.keyCode==65 && activeFigure_x > 0 && LColl()){
        ctx.clearRect(0, 0, 400, 800);
        activeFigure_x -= 40;
        drawActiveFigure(activeFigure_x, activeFigure_y);
        drawField();
    }
    if(event.keyCode==68 && activeFigure_x + activeFigureW < 400 && RColl()){
        ctx.clearRect(0, 0, 400, 800);
        activeFigure_x += 40;
        drawActiveFigure(activeFigure_x, activeFigure_y);
        drawField();
    }
    if(event.keyCode==87 && turn <= 3) {
        turn++;
    }else if(event.keyCode==87 && turn > 3){
        turn = 0;
        newFigure(randomForm, turn);
        drawActiveFigure(activeFigure_x, activeFigure_y);
    }
    
    if(event.keyCode==83) {
        clearInterval(interval);
        speed = 1000/50;
        interval = setInterval(update, speed);
    }
}

function drawField(){
    for(let l = 0; l < 10; l++){
        for(let m = 0; m < 20; m++){
            if(field[m][l]){
                ctx.fillStyle = "blue";
                ctx.fillRect(l*40, m*40, 40, 40);
            }
        }
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function destroyLine(){
    for(let y = 0; y < 20; y++){
        if(field[y][0]&&field[y][1]&&field[y][2]&&field[y][3]&&field[y][4]
        &&field[y][5]&&field[y][6]&&field[y][7]&&field[y][8]&&field[y][9]){
               for(let t = 0; t < 10; t++){
                    field[y][t] = 0;
               }
                
                for(let l = y; l >= 0; l--){
                    for(let m = 0; m < 10; m++){
                        if(field[l][m]==1)
                        {
                            field[l][m] = 0;
                            field[l+1][m] = 1;
                        }
                    }
                }
            
           }
    }
}

function update(){
    ctx.clearRect(0, 0, 400, 800);
    newFigure(randomForm, turn);
    drawActiveFigure(activeFigure_x, activeFigure_y);
    collGround();
    collBlocks();
    destroyLine();
    moveDown();
    drawField();
}

let interval = setInterval(update, speed);