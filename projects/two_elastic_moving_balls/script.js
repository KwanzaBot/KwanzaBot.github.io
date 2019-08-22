var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ball_radius=40;

var speed_x_blue = 7;
var speed_y_blue = 1;
var ball_x_blue=100;
var ball_y_blue=423;

var speed_x_yellow = 5;
var speed_y_yellow = -3;
var ball_x_yellow=60;
var ball_y_yellow=100;

var speed_yellow=Math.sqrt(Math.pow(speed_x_yellow,2)+Math.pow(speed_y_yellow,2));
var speed_blue=Math.sqrt(Math.pow(speed_x_blue,2)+Math.pow(speed_y_blue,2));

var distance;

function draw_ball_blue()
{
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(ball_x_blue,ball_y_blue,ball_radius,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function draw_ball_yellow()
{
    ctx.beginPath();
    ctx.fillStyle = "rgb(203, 152, 0)";
    ctx.arc(ball_x_yellow,ball_y_yellow,ball_radius,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function draw()
{
    ctx.clearRect(0,0,600,600);
    
    draw_ball_blue();
    ball_x_blue += speed_x_blue;
    ball_y_blue += speed_y_blue;
    
    if(ball_y_blue>=600-ball_radius)
        speed_y_blue *= -1;
    if(ball_y_blue<=0+ball_radius)
        speed_y_blue *= -1;
    if(ball_x_blue>=600-ball_radius)
        speed_x_blue *= -1;
    if(ball_x_blue<=0+ball_radius)
        speed_x_blue *= -1;
    
    draw_ball_yellow();
    ball_x_yellow += speed_x_yellow;
    ball_y_yellow += speed_y_yellow;
    
    if(ball_y_yellow>=600-ball_radius)
        speed_y_yellow *= -1;
    if(ball_y_yellow<=0+ball_radius)
        speed_y_yellow *= -1;
    if(ball_x_yellow>=600-ball_radius)
        speed_x_yellow *= -1;
    if(ball_x_yellow<=0+ball_radius)
        speed_x_yellow *= -1;
    
    distance=Math.sqrt((Math.pow((ball_x_yellow-ball_x_blue)^2,2))+Math.pow((ball_y_yellow-ball_y_blue)^2,2));
    
    if(distance<=(ball_radius*2)){
        speed_x_yellow=(ball_x_yellow-ball_x_blue)/(Math.abs(ball_x_yellow-ball_x_blue))*speed_yellow;
        speed_y_yellow=(ball_y_yellow-ball_y_blue)/(Math.abs(ball_y_yellow-ball_y_blue))*speed_blue;
        speed_x_blue=speed_x_yellow*-1;
        speed_y_blue=speed_y_yellow*-1;
        
    }
        
}

setInterval(draw, 1000/60);