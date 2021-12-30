const canvas = document.getElementById("my-Canvas");
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton")
const bgImg = new Image();
bgImg.src = "./images/background4.jpg"
const bigMacImg = new Image();
bigMacImg.src = './images/bigmac.png'
const dimitriImg = new Image();
dimitriImg.src = '/images/dimitriHD.png'
const bottleImg = new Image();
bottleImg.src = './images/christaline.png'
const strikerImgRight = new Image();
strikerImgRight.src = './images/strikerRight.png'
const strikerImgLeft = new Image();
strikerImgLeft.src = './images/strikerLeft.png'

const bottles = []
const bigMacs = []
const strikers = []
let frames = 0

const dimitri = {
    img : dimitriImg,
    x : canvas.width / 2 - 50,
    y : canvas.height - 150,
    width : 90,
    height : 130,
    gravity : 2 ,
    gravitySpeed : 1.2 ,
    health : 100,
    jump : false,
    isOnTheFloor : true,
    score : 0,
    canJump : function () {
        if(this.y === canvas.height - 130){
            this.isOnTheFloor = true
        } else {
            this.isOnTheFloor = false
        }
    },
    gravityOn : function () {
        if (this.y < canvas.height - 130 ){
            let fall = this.gravity * this.gravitySpeed
            this.y += fall
        } else if (this.y > canvas.height - 130) {
            this.y = canvas.height - 130
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
        if (frames % 45 === 0) this.score += 1
        console.log(this.score)
    },
    colision : function (obstacle) {
        if (obstacle.x > this.x + this.width - 25 || this.x + 22 > obstacle.x + obstacle.width  
            || obstacle.y > this.y + this.height || this.y > obstacle.y + obstacle.height ){
                return false
            }
             return true
            
    }
}

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
    if (event.code === "Space" && dimitri.isOnTheFloor === true) {
      dimitri.jumps();
    }
    
  });
  
  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      dimitri.jump = false;
    }
  });

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
      if (frames % 50 === 0) {
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
     
     if (frames % 120 === 0) {
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
          
          if (frames % 400 === 0 && side === 1 ) {
            speed = -7 ; 
            x = 1200 ;
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgLeft, 70, 100, speed, 'black')
            );
          }
          else if (frames % 400 === 0 && side === 0 ) {
            strikers.push(
                new Striker(x, canvas.height - 100, strikerImgRight, 70, 100, speed, 'black')
            );
          }
}

function checkForColisionBottle (){
    bottles.forEach((bottle) => {
        let colision = dimitri.colision(bottle)
        if(colision === true){
            //dimitri.health -= 30
            bottles.splice(bottle.index, 1)
            console.log(dimitri.health)
            return true
        }
        console.log(colision)
       if(colision === true) dimitri.health -= 30
      });
}

function checkForColisionStriker (){
    strikers.forEach((striker) => {
        let colision = dimitri.colision(striker)
        if(colision === true){
            dimitri.health -= 15
            strikers.splice(striker.index, 1)
            
        }
        
      });
}

function checkForColisionBigMacs (){
    bigMacs.forEach((bigMac) => {
        let colision = dimitri.colision(bigMac)
        if(colision === true){
            dimitri.health += 10
            dimitri.score += 15
            bigMacs.splice(bigMac.index, 1)
            
        }
        
      });
}

window.onload = function() {
    startButton.onclick = function () {
        startButton.disabled = true
        startGame();
    }
}

function startGame() {
    setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue'
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
}, 10)
}