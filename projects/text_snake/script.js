const field_char="+ ";
const apple_char="@";
const snacke_char="W";

var turn_s=1;

var x_start=5;
var y_start=5;

var size_snake=2;

document.addEventListener("keydown",turn);

function turn(e){
    if(e.keyCode==87)
        turn_s=1;
    if(e.keyCode==65)
        turn_s=2;
    if(e.keyCode==83)
        turn_s=3;
    if(e.keyCode==68)
        turn_s=0;
}

var field = [];
var snacke = [];
snacke.unshift({x_s:x_start,y_s:y_start},{x_s:x_start+1,y_s:y_start});

var apple = {x_a:8, y_a:8};

var dom = document.getElementById("field");

var score = document.getElementById("Score");

function draw_field(){
    dom.innerHTML="";
    for(var x=0;x<16;x++){
        field[x]=[];
        for(var y=0;y<16;y++){
            field[x][y]=field_char;
        }
    }
    
    for(var m=0;m<size_snake;m++){
        field[snacke[m].x_s][snacke[m].y_s]=snacke_char;
    }
    
   field[apple.x_a][apple.y_a]=apple_char;
    
    for(var x=0;x<16;x++){
        for(var y=0;y<16;y++){
            dom.innerHTML+=field[x][y];
        }
        dom.innerHTML+="<br>";
    }    
    
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function update(){
    if(turn_s==1){
        draw_field();
        x_start--;
        if(x_start<0) x_start+=16;
        snacke.unshift({x_s:x_start,y_s:y_start});
        if(field[x_start][y_start]==snacke_char) size_snake=2;
        if(x_start==apple.x_a && y_start==apple.y_a){
            size_snake++;
            apple.x_a=randomInteger(0,16);
            apple.y_a=randomInteger(0,16);
        }
    }
    if(turn_s==2){
        draw_field();
        y_start--;
        if(y_start<0) y_start+=16;
        snacke.unshift({x_s:x_start,y_s:y_start});
        if(field[x_start][y_start]==snacke_char) size_snake=2;
        if(x_start==apple.x_a && y_start==apple.y_a){
            size_snake++;
            apple.x_a=randomInteger(0,16);
            apple.y_a=randomInteger(0,16);
        }
    }
    if(turn_s==3){
        draw_field();
        x_start++;
        if(x_start>15) x_start=0;
        snacke.unshift({x_s:x_start,y_s:y_start});
        if(field[x_start][y_start]==snacke_char) size_snake=2;
        if(x_start==apple.x_a && y_start==apple.y_a){
            size_snake++;
            apple.x_a=randomInteger(0,16);
            apple.y_a=randomInteger(0,16);
        }
    }
    if(turn_s==0){
        draw_field();
        y_start++;
        if(y_start>15) y_start=0;
        snacke.unshift({x_s:x_start,y_s:y_start});
        if(field[x_start][y_start]==snacke_char) size_snake=2;
        if(x_start==apple.x_a && y_start==apple.y_a){
            size_snake++;
            apple.x_a=randomInteger(0,16);
            apple.y_a=randomInteger(0,16);
        }
    }
     score.innerHTML = "Score: " + (size_snake-2);

}

setInterval(update,1000/5);