var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawBlock(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*30,y*30,30,30);
}

var vector=1;

document.addEventListener("keydown", turn);

function turn(e){
    if(e.keyCode==87&&vector!=3)
        vector=1;
    if(e.keyCode==65&&vector!=0)
        vector=2;
    if(e.keyCode==83&&vector!=1)
        vector=3;
    if(e.keyCode==68&&vector!=2)
        vector=0;
}

var x_pos=5;
var y_pos=8;

var snake = [{x_s:x_pos,y_s:y_pos},{x_s:x_pos,y_s:y_pos-1}];
var apple = {x_a:9,y_a:5};

var size=2;

function drawField(){
    ctx.clearRect(0,0,600,600);
    drawBlock(apple.x_a, apple.y_a, "red");
    for(var m=0;m<size;m++){
        drawBlock(snake[m].x_s,snake[m].y_s, "green");
    }
    
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function update(){
    if(vector==1)
    {
        y_pos--;
        if(y_pos<0) y_pos=19;
        if(x_pos==apple.x_a && y_pos==apple.y_a){
            size++;
            apple.x_a=randomInteger(0,19);
            apple.y_a=randomInteger(0,19);
        }
        for(var n=0; n<size;n++){
            if(y_pos==snake[n].y_s && x_pos==snake[n].x_s)
               size=2;
        }
        snake.unshift({x_s:x_pos,y_s:y_pos});
        drawField();
    }
    if(vector==2)
    {
        x_pos--;
        if(x_pos<0) x_pos=19;
        if(x_pos==apple.x_a && y_pos==apple.y_a){
            size++;
            apple.x_a=randomInteger(0,19);
            apple.y_a=randomInteger(0,19);
        }
        for(var n=0; n<size;n++){
            if(y_pos==snake[n].y_s && x_pos==snake[n].x_s)
               size=2;
        }
        snake.unshift({x_s:x_pos,y_s:y_pos});
        drawField();
    }
    if(vector==3)
    {
        y_pos++;
        if(y_pos>19) y_pos=0;
        if(x_pos==apple.x_a && y_pos==apple.y_a){
            size++;
            apple.x_a=randomInteger(0,19);
            apple.y_a=randomInteger(0,19);
        }
        for(var n=0; n<size;n++){
            if(y_pos==snake[n].y_s && x_pos==snake[n].x_s)
               size=2;
        }
        snake.unshift({x_s:x_pos,y_s:y_pos});
        drawField();       
    }
    if(vector==0)
    {
        x_pos++;
        if(x_pos>19) x_pos=0;
        if(x_pos==apple.x_a && y_pos==apple.y_a){
            size++;
            apple.x_a=randomInteger(0,19);
            apple.y_a=randomInteger(0,19);
        }
        for(var n=0; n<size;n++){
            if(y_pos==snake[n].y_s && x_pos==snake[n].x_s)
               size=2;
        }
        snake.unshift({x_s:x_pos,y_s:y_pos});
        drawField();
    }
    ctx.fillStyle = "black";
    ctx.font = "16pt serif";
    var points = (size-2) + " Points";
    ctx.fillText(points, 20, 40)
}

setInterval(update, 1000/5);