let snake = [];
let food;
let dir = 'right';
let sz = 20;
let score = 0;
let gameOver = false;
let speed = 10;

function setup() {
  createCanvas(400, 400);
  frameRate(speed);
 
  // Cria cobra inicial (3 partes)
  for (let i = 2; i >= 0; i--) {
    snake.push({x: i * sz, y: 0});
  }
 
  // Cria primeira comida
  food = {
    x: floor(random(width/sz)) * sz,
    y: floor(random(height/sz)) * sz
  };
}

function draw() {
  background(0);
   
  if (!gameOver) {
    // Movimento
    let head = {x: snake[0].x, y: snake[0].y};
    if (dir === 'right') head.x += sz;
    if (dir === 'left') head.x -= sz;
    if (dir === 'up') head.y -= sz;
    if (dir === 'down') head.y += sz;
   
    snake.unshift(head);
    snake.pop();
   
    // Colisão com comida
    if (head.x === food.x && head.y === food.y) {
      snake.push({...snake[snake.length-1]});
      score++;
      food = {
        x: floor(random(width/sz)) * sz,
        y: floor(random(height/sz)) * sz
      };
    }
   
    // Colisão com paredes
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      gameOver = true;
    }
   
    // Colisão com próprio corpo
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver = true;
      }
    }
  }
 
  // Desenha cobra
  fill(0, 255, 0);
  for (let part of snake) {
    rect(part.x, part.y, sz, sz);
  }
 
  // Desenha comida
  fill(255, 0, 0);
  rect(food.x, food.y, sz, sz);
 
  // Placar
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Pontos: " + score, width/2, 30);
   
  // Game Over
  if (gameOver) {
    fill(255, 0, 0);
    textSize(40);
    text("FIM DE JOGO", width/2, height/2);
    textSize(20);
    text("Pressione ESPAÇO", width/2, height/2 + 40);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && dir !== 'down') dir = 'up';
  if (keyCode === DOWN_ARROW && dir !== 'up') dir = 'down';
  if (keyCode === LEFT_ARROW && dir !== 'right') dir = 'left';
  if (keyCode === RIGHT_ARROW && dir !== 'left') dir = 'right';
  if (key === ' ' && gameOver) reset();
}

function reset() {
  snake = [];
  for (let i = 2; i >= 0; i--) {
    snake.push({x: i * sz, y: 0});
  }
  dir = 'right';
  score = 0;
  gameOver = false;
  food = {
    x: floor(random(width/sz)) * sz,
    y: floor(random(height/sz)) * sz
  };
}