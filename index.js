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
let strikerImg = new Image();
strikerImg.src = './images/strikerRight.png'

const bottles = []
const bigMacs = []
const strikers = []
let frames = 0

const dimitri = {
    img : dimitriImg,
    x : canvas.width / 2 - 50,
    y : canvas.height - 150,
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
        ctx.drawImage(this.img, this.x, this.y, 90, 130)
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
     /*  let bottle = new Bottle(Math.floor(Math.random() * 1150), 0, 50, 100, 6, 'red')
      bottle.draw()
      console.log(bottle)
 */
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
    /*  let bottle = new Bottle(Math.floor(Math.random() * 1150), 0, 50, 100, 6, 'red')
     bottle.draw()
     console.log(bottle)
*/
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
    constructor(argX, argY, argWidth, argHeight, argSpeed, argColor){
        this.x = argX;
        this.y = argY;
        this.width = argWidth;
        this.height = argHeight;
        this.speed = argSpeed;
        this.color = argColor
    }

    move() {
        this.x += this.speed
    }

    draw () {
        ctx.fillStyle = this.color
        ctx.drawImage(strikerImg, this.x, this.y, this.width, this.height)
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
        if (side === 1)  {
            speed = -7 ; 
            x = 1200;
            strikerImg.src = './images/strikerLeft.png'
        }
        /* else if (side === 0) {
            speed = 7;
            x = - 50
        } */   
        strikers.forEach((striker) => {
            striker.draw();
            striker.move()
          });
          
          if (frames % 400 === 0) {
            strikers.push(
                new Striker(x, canvas.height - 90, 70, 90, speed, 'black')
            );
          }
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
}, 10)
}