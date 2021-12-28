const canvas = document.getElementById("my-Canvas");
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton")
const bgImg = new Image();
bgImg.src = "./images/background4.jpg"

const bottles = []
const bigMacs = []
let frames = 0

const dimitri = {
    img : '',
    x : canvas.width / 2 - 50,
    y : canvas.height - 100,
    gravity : 2 ,
    gravitySpeed : 1.2 ,
    health : 100,
    jump : false,
    isOnTheFloor : true,
    canJump : function () {
        if(this.y === canvas.height - 100){
            this.isOnTheFloor = true
        } else {
            this.isOnTheFloor = false
        }
    },
    gravityOn : function () {
        if (this.y < canvas.height - 100 ){
            let fall = this.gravity * this.gravitySpeed
            this.y += fall
        } else if (this.y > canvas.height - 100) {
            this.y = canvas.height - 100
        }
    },
    jumps : function () {
        if (this.isOnTheFloor) {
            this.y -= 200
        } else this.gravityOn()
    },
    draw : function () {
        ctx.fillRect(this.x, this.y, 100, 100)
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

}

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
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
            new Bottle(Math.floor(Math.random() * 1150), -100, 50, 100, 6, 'red')
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
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
    constructor(argX, argSpeed){
        this.x = argX;
        this.y = canvas.heigth;
        this.speed = argSpeed;
        this.width = 60;
        this.heigth = 80;
        this.color = 'black'
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
        console.log(1)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue'
    dimitri.draw(); 
    dimitri.gravityOn()
    console.log(3)
    updateBottles()
    console.log(Math.floor(Math.random() * 750))
    updateBigMacs()
}, 10)
}