const canvas = document.getElementById("my-Canvas");
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton")

const highscoreDiv = document.getElementById('highscore')
const healthDiv = document.getElementById('health')
const scoreDiv = document.getElementById('score')

const bgImg = new Image();
bgImg.src = "./images/background4.jpg"

const bigMacImg = new Image();
bigMacImg.src = './images/bigmac.png'

const landingImg = new Image()
landingImg.src = './images/landingPage.jpg'

const dimitriImg = new Image();
dimitriImg.src = './images/dimitriHD.png'
const dimitriMiddleImg = new Image()
dimitriMiddleImg.src = './images/dimitriMoyen.png'
const dimitriLowImg = new Image()
dimitriLowImg.src = './images/dimitriBas.png'
const dimitriDownImg = new Image()
dimitriDownImg.src = './images/dimitriDown.png'


const bottleImg = new Image();
bottleImg.src = './images/christaline.png'

const strikerImgRight = new Image();
strikerImgRight.src = './images/strikerRight.png'
const strikerImgLeft = new Image();
strikerImgLeft.src = './images/strikerLeft.png'

const gameOverImg = new Image();
gameOverImg.src = './images/gameOver.png'

const highscoreImg = new Image();
highscoreImg.src = './images/highscore.png'

const bgSound = new Audio()
bgSound.src = './sound/backgroundSound.mp3'
bgSound.volume = 0.35
const hitSound = new Audio()
hitSound.src = './sound/hitSound.mp3'
hitSound.volume = 0.65
const bonusSound = new Audio()
bonusSound.src = './sound/soundBonus.mp3'
bonusSound.volume = 0.65
const youLoseSound = new Audio()
youLoseSound.src = './sound/youLoseSound.mp3'
const hornSound = new Audio()
hornSound.src = './sound/horn.mp3'
const applauseSound = new Audio('./sound/applause.mp3')
const whistleSound = new Audio('./sound/whistle.mp3')

const bottles = []
const bigMacs = []
const strikers = []
let frames = 0
let highScore = 0
let myGame



const dimitri = {
    img : dimitriImg,
    x : canvas.width / 2 - 45,
    y : canvas.height - 130,
    width : 90,
    height : 130,
    gravity : 2 ,
    gravitySpeed : 1.2 ,
    health : 100,
    jump : false,
    isOnTheFloor : true,
    score : 0,
    canJump : function () {
        if(this.y === canvas.height - this.height){
            this.isOnTheFloor = true
        } else {
            this.isOnTheFloor = false
        }
    },
    gravityOn : function () {
        if (this.y < canvas.height - this.height ){
            let fall = this.gravity * this.gravitySpeed
            this.y += fall
        } else if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height
        }
    },
    jumps : function () {
        if (this.isOnTheFloor) {
            this.y -= 200
        } else this.gravityOn()
    },
    draw : function () {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    },
    moveRight : function () {
        if(this.x < canvas.width - 100){
            this.x += 40
        } else {this.x += 0}
    },
    moveLeft : function () {
        if(this.x > 0){
            this.x -= 40
        }  else {this.x += 0}
    },
    updateScore : function () {
        if (frames % 45 === 0) {
            this.score += 1
            scoreDiv.innerHTML = `Score : ${dimitri.score}`
        }
        console.log(this.score)
    },
    colision : function (obstacle) {
        if (dimitri.img === dimitriImg){
            if (obstacle.x > this.x + this.width - 25 || this.x + 22 > obstacle.x + obstacle.width  || obstacle.y > this.y + this.height || this.y > obstacle.y + obstacle.height ){
                return false
            } else return true
        } else {
            if (obstacle.x > this.x + this.width - 10 || this.x + 10 > obstacle.x + obstacle.width  || obstacle.y > this.y + this.height || this.y > obstacle.y + obstacle.height ){
                return false
            } else return true
        }
    },
    stateOfDimitri : function () {
        if (this.health >= 75){
            this.img = dimitriImg
            this.height = 130
            this.width = 90
        }
        else if(this.health < 75 && this.health >= 40){
            this.img = dimitriMiddleImg
            this.height = 120
            this.width = 85

        }
        else if(this.health < 40 && this.health > 0){
            this.img = dimitriLowImg
            this.height = 80
            this.width = 60
        }
        else if (this.health <= 0){
            this.img = dimitriDownImg
            this.width = 140
            this.height = 50
            this.y = canvas.height - 50
        }

    }
}

/* const gameOver = {
    img : gameOverImg,

    draw : function () {
        ctx.drawImage(this.img, 50, canvas.height, 394, 666)
    },

    move : function () {

    }
} */

/* function updateScore () {
    let score = 0
    if (frames % 45 === 0) score += 1
    console.log(score)
    return score
} */



window.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowRight') {
      dimitri.moveRight();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.code === 'ArrowLeft') {
      dimitri.moveLeft();
    }
  }); 

  window.addEventListener("keydown", (event) => {
      dimitri.canJump()
    if (event.code === "Space" && dimitri.isOnTheFloor === true || event.code === "ArrowUp" && dimitri.isOnTheFloor === true) {
      dimitri.jumps();
    }
    
  });
  
  window.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") {
      dimitri.jump = false;
    }
  });

  /*  window.addEventListener("touchstart", () => {
      if (Touch.clientX >= canvas.width / 3) dimitri.moveLeft();
      else if (Touch.clientX > canvas.width / 3 || Touch.clientX < canvas.width - (canvas.width/3)) dimitri.jumps();
      else if (Touch.clientX > canvas.width - (canvas.width/3)) dimitri.moveRight();
  })  */

const bgImgAnime = {
    img: bgImg,
    x: 0,
    draw: function () {
      ctx.drawImage(this.img, this.x, 0);
    },
  };

class Bottle {
    constructor(argX, argY, argWidth, argHeight, argSpeed, argColor) {
        this.x = argX;
        this.y = argY;
        this.width = argWidth;
        this.height = argHeight;
        this.speed = argSpeed;
        this.color = argColor
    }

    move() {
        this.y += this.speed
    }
    
    draw() {
        ctx.fillStyle = this.color
        ctx.drawImage(bottleImg, this.x, this.y, this.width, this.height)
    }

}

function updateBottles() {
    
      bottles.forEach((bottle) => {
        bottle.draw();
        bottle.move()
      });
      frames++;
      if (frames % 60 === 0 && dimitri.score < 250) {
        bottles.push(
            new Bottle(Math.floor(Math.random() * 1150), -100, 40, 110, 6, 'red')
        );
      }
      else if (frames % 50 === 0 && dimitri.score >= 250 && dimitri.score < 500 ) {
        bottles.push(
            new Bottle(Math.floor(Math.random() * 1150), -100, 40, 110, 6, 'red')
        );
      }
      else if (frames % 40 === 0 && dimitri.score >= 500 ) {
        bottles.push(
            new Bottle(Math.floor(Math.random() * 1150), -100, 40, 110, 6, 'red')
        );
      }
    }
    
      

class BigMac {
    constructor(argX, argY, argWidth, argHeight, argSpeed, argColor) {
        this.x = argX;
        this.y = argY;
        this.width = argWidth;
        this.height = argHeight;
        this.speed = argSpeed;
        this.color = argColor
    }

    move() {
        this.y += this.speed
    }
    
    draw() {
        ctx.fillStyle = this.color
        ctx.drawImage(bigMacImg, this.x, this.y, this.width, this.height)
    }
}

function updateBigMacs() {
   
     bigMacs.forEach((bigmac) => {
       bigmac.draw();
       bigmac.move()
     });
     
     if (frames % 100 === 0 && dimitri.score < 250) {
       bigMacs.push(
           new BigMac(Math.floor(Math.random() * 1150), -50, 50, 50, 4, 'green')
       );
     }
     else if (frames % 150 === 0 && dimitri.score >= 250 && dimitri.score < 500 ) {
        bigMacs.push(
            new BigMac(Math.floor(Math.random() * 1150), -50, 50, 50, 4, 'green')
        );
      }
      else if (frames % 200 === 0 && dimitri.score >= 500 ) {
        bigMacs.push(
            new BigMac(Math.floor(Math.random() * 1150), -50, 50, 50, 4, 'green')
        );
      }
   }

class Striker {
    constructor(argX, argY, argImg, argWidth, argHeight, argSpeed, argColor){
        this.x = argX;
        this.y = argY;
        this.img = argImg;
        this.width = argWidth;
        this.height = argHeight;
        this.speed = argSpeed;
        this.color = argColor
    }

    move() {
        this.x += this.speed
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

function strikerSide () {
    let index = Math.floor(Math.random() * 2);
    return index
}

function updateStriker () {
    let speed = 7
    let x = - 50
    let side = strikerSide()
          
        strikers.forEach((striker) => {
            striker.draw()
            striker.move()
          });
          
          if (frames % 400 === 0 && side === 1 && dimitri.score < 250) {
            speed = -7 ; 
            x = 1200 ;
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgLeft, 70, 100, speed, 'black')
            );
          }
          else if (frames % 400 === 0 && side === 0 && dimitri.score < 250) {
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgRight, 70, 100, speed, 'black')
            );
          }
          else if (frames % 350 === 0 && side === 1 && dimitri.score >= 250 && dimitri.score < 500) {
            speed = -7 ; 
            x = 1200 ;
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgLeft, 70, 100, speed, 'black')
            );
          }
          else if (frames % 350 === 0 && side === 0 && dimitri.score >= 250 && dimitri.score < 500) {
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgRight, 70, 100, speed, 'black')
            );
          }
          else if (frames % 300 === 0 && side === 1 && dimitri.score >= 500) {
            speed = -7 ; 
            x = 1200 ;
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgLeft, 70, 100, speed, 'black')
            );
          }
          else if (frames % 300 === 0 && side === 0 && dimitri.score >= 500) {
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgRight, 70, 100, speed, 'black')
            );
          }
}

function checkForColisionBottle (){
    bottles.forEach((bottle) => {
        let colision = dimitri.colision(bottle)
        if(colision === true){
            dimitri.health -= 30
            //healthDiv.innerHTML = `Health : ${dimitri.health}`
            bottles.splice(bottle.index, 1)
            console.log(dimitri.health)
            hitSound.play()
            
        }
        else if (bottle.y > canvas.height) bottles.splice(bottle.index, 1)
        
         console.log(colision)
      });
}

function checkForColisionStriker (){
    strikers.forEach((striker) => {
        let colision = dimitri.colision(striker)
        if(colision === true){
            dimitri.health -= 15
            //healthDiv.innerHTML = `Health : ${dimitri.health}`
            strikers.splice(striker.index, 1)
            hitSound.play()
        }
        else if (striker.x > canvas.width + striker.width || striker.x < -striker.width) strikers.splice(striker.index, 1)
        
      });
}

function checkForColisionBigMacs (){
    bigMacs.forEach((bigMac) => {
        let colision = dimitri.colision(bigMac)
        if(colision === true){
            dimitri.health += 10
            //healthDiv.innerHTML = `Health : ${dimitri.health}`
            dimitri.score += 15
            bigMacs.splice(bigMac.index, 1)
            bonusSound.play()
        }
        else if (dimitri.health > 100) dimitri.health = 100
        else if (bigMac.y > canvas.height) bigMacs.splice(bigMac.index, 1)
        
      });
}

/* function healthBar () {
    if(dimitri.health <= 50 && dimitri.health > 25) {
        ctx.fillStyle = 'green'
        ctx.fillRect(10, 10, dimitri.health, 10);
        
    } 
    else if(dimitri.health <= 50 && dimitri.health > 25) {
        ctx.fillStyle = 'orange'
        ctx.fillRect(10, 10, dimitri.health, 10);
    }
    else if(dimitri.health <= 25) {
        ctx.fillStyle = 'red'
        ctx.fillRect(10, 10, dimitri.health, 10);
    }
} */

function checkForGameOver () {
    const checkForHighScore = () =>  {
        if(dimitri.score > highScore) {
            highScore = dimitri.score
            highscoreDiv.innerHTML = `Highscore : ${highScore}` 
            setTimeout(() => {
                applauseSound.play()
            }, 500)
            
            setTimeout(() => {
                ctx.drawImage(highscoreImg, canvas.width - 500, canvas.height -320, 450, 320);
                hornSound.play()
                
            }, 3500)
            
            
        }
    }

    if(dimitri.health <= 0) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        dimitri.stateOfDimitri()
        dimitri.draw()
        checkForHighScore()
        clearInterval(myGame)
        bottles.splice(0, bottles.length)
        strikers.splice(0, strikers.length)
        bigMacs.splice(0, bigMacs.length)
        console.log(dimitri)
        dimitri.health = 100
        dimitri.score = 0
        dimitri.x = canvas.width / 2 - 50
        dimitri.y = canvas.height - 150
        whistleSound.play()
        bgSound.loop = false
        bgSound.pause()
        bgSound.currentTime = 0
        setTimeout(() => {
            ctx.drawImage(gameOverImg, 50, canvas.height -  550, 394, 666)
            youLoseSound.play()
        },1500)
        setTimeout(() => {
            startButton.disabled = false
        }, 3000)
        
    }
    
}

function health () {
    if(dimitri.health < 0) healthDiv.innerHTML = `Health : 0`
    else healthDiv.innerHTML = `Health : ${dimitri.health}`
}



highscoreDiv.innerHTML = `Highscore : ${highScore}` 
healthDiv.innerHTML = `Health : ${dimitri.health}`
scoreDiv.innerHTML = `Score : ${dimitri.score}`

window.onload = function() {
    ctx.drawImage(landingImg, 0, 0, canvas.width, canvas.height)
    startButton.onclick = function () {
        startButton.disabled = true
        startGame();
        bgSound.play()
        bgSound.loop = true
    }
}

function startGame() {
    myGame = setInterval(() => {
    applauseSound.pause()
    applauseSound.currentTime = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue'
    dimitri.stateOfDimitri()
    dimitri.draw(); 
    dimitri.gravityOn()
    updateBottles()
    updateBigMacs()
    updateStriker()
    dimitri.updateScore()
    checkForColisionBottle()
    checkForColisionStriker()
    checkForColisionBigMacs()
    console.log(dimitri.health)
    console.log(dimitri.score)
    health()
    checkForGameOver()
    //healthBar()
    console.log(highScore)
}, 10)
}