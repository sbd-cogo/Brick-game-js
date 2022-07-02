let ball_x, ball_y, ball_dx, ball_dy, ball_dia;
let pad_width, pad_height, pad_x, pad_y, pad_dx;
let score, lives, bricks_hit;
let bricks = [];
let temp;
let counter=0;

function setup() {
  createCanvas(400, 400);
  
  score=0;
  lives=3;
  bricks_hit = 0;
  
  //ball init
  ball_dia = 24;
  ball_x = width/2;
  ball_y = height - 30;
  ball_dx = 3; //change in distance i.e speed
  ball_dy = -1;
  
  
  //paddle init
  pad_width = 80;
  pad_height = 15;
  pad_x = width/2 - (pad_width/2);
  pad_y = height-15;
  pad_dx = 3;

  //bricks init
  var dx = 60;
  var dy = 30;
  for(var row=0; row<4; row++){
    let brick_row = [];
    for(var col=0; col<6; col++){

      let brick = {};
      if(row%2==0){
        brick["x"] = 35 + dx*col;
      }else{
        brick["x"] = 15 + dx*col;
      }
      brick["y"] = 50 + dy*row;
      brick["w"] = 50;
      brick["h"] = 20;
      brick["status"] = 1;
      
      brick_row.push(brick);
    }
    bricks.push(brick_row);
  }


}

function draw() {
  background("black")
  let time = int(millis()/1000);
  fill("white")
  text("Score: "+score, width-80, 30)
  text("Lives: "+lives, 60, 30)
  var win = true;

  if(lives){

  ball_x += ball_dx;
  ball_y += ball_dy;
  fill("red")
  circle(ball_x,ball_y,ball_dia);
  strokeWeight(0)
  fill("")
  rect(pad_x, pad_y, pad_width, pad_height);

  
  //ball bounce properties
  //right side and left side
  if(ball_x + (ball_dia)/2 > width || ball_x - (ball_dia)/2 < 0){
    ball_dx = -(ball_dx);
    // ball_dx = 0
  }
  //top side
  if(ball_y - (ball_dia)/2 < 0){
    ball_dy = -(ball_dy);
  }
  
  //paddle movement poperty
  if(keyIsDown(RIGHT_ARROW) && pad_x+pad_width < width ){
    pad_x += pad_dx;
  }
  if(keyIsDown(LEFT_ARROW) && pad_x > 0  ){
    pad_x -= pad_dx;
  }
     
  //paddle ball interaction
  if(ball_y + (ball_dia)/2 > pad_y){
    if(ball_x>=pad_x && ball_x<=pad_x+pad_width){
        ball_dy = -ball_dy;
    }
    else{
      ball_dy=0;
      ball_dx=0;
    } 
  }
  
  
  
  //brick properties
  //brick top
  for(var i=0; i<bricks.length; i++){
    for(var j=0; j<bricks[1].length; j++){
      if(bricks[i][j].status==1){
        strokeWeight(4);
        stroke('red');
        rect(bricks[i][j].x, bricks[i][j].y, bricks[i][j].w, bricks[i][j].h);

        win = false;
        //brick top
        if(ball_x>=bricks[i][j].x && ball_x<=bricks[i][j].x+bricks[i][j].w && ball_y+ball_dia/2>=bricks[i][j].y && ball_y+ball_dia/2<=bricks[i][j].y+bricks[i][j].h){
          ball_dy = -ball_dy;
          score+=1;
          bricks[i][j].status = 0;
        }
        //brick_bottom
        if(ball_x>=bricks[i][j].x && ball_x<=bricks[i][j].x+bricks[i][j].w && ball_y-ball_dia/2>=bricks[i][j].y && ball_y-ball_dia/2<=bricks[i][j].y+bricks[i][j].h){
          ball_dy = -ball_dy;
          score+=1;
          bricks[i][j].status = 0;
        }
        //brick left
        if(ball_y>=bricks[i][j].y && ball_y<=bricks[i][j].y+bricks[i][j].h && ball_x+ball_dia/2>=bricks[i][j].x && ball_x+ball_dia/2<bricks[i][j].x + bricks[i][j].w){
          ball_dx = -ball_dx;
          score+=1;
          bricks[i][j].status = 0;
        }
        //brick right
        if(ball_y>=bricks[i][j].y && ball_y<=bricks[i][j].y+bricks[i][j].h && ball_x-ball_dia/2>bricks[i][j].x && ball_x-ball_dia/2<=bricks[i][j].x+bricks[i][j].w){
          ball_dx = -ball_dx;
          score+=1;    
          bricks[i][j].status = 0;
        }

        //extra part
        if(time%10 == 0){
          bricks[i][j].y += 10/60
        }
      }
    }
  }

  // if((time+1)%7 == 0){
  //   counter+=1;
  //   for(var i=0; i<bricks.length; i++){
  //     for(var j=0; j<bricks[1].length; j++){
  //       bricks[i][j].y += 10/60; //60 is frame rate
  //       //so in 1/60th of sec 10/60th part would move 
  //       //and in 1 sec total of 10px is moved 
  //     }
  //   }
  // }
  stroke(0);
  text("Time: "+time, 10, 30);

  if(ball_dx==0 && ball_dy==0 && lives!=0){
    lives = lives-1;
    ball_x = width/2;
    ball_y = height - 50;
    ball_dx = 3; //change in distance i.e speed
    ball_dy = -1;
    pad_x = width/2 - (pad_width/2);
    pad_y = height-15;

  }
  if(win){
    ball_dx = 0;
    ball_dy = 0;
    textSize(16);
    textAlign(CENTER, [CENTER]);
    text("You Won", 200, 200);
  }
}
  if(lives == 0){
    textSize(16);
    textAlign(CENTER, [CENTER]);
    text("Game Over", 200, 200);
    ball_dx = 0;
    ball_dy = 0;
  }

  
  // text(bricks_hit, 10, 10)
  // text(win, 10, 25)
  
}
