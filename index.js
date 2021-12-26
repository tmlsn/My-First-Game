const canvas = document.getElementById("my-Canvas");
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton")
const bgImg = new Image();
bgImg.src = "./images/background4.jpg"

const dimitri = {
    img : '',
    x : canvas.width / 2 - 50,
    y : canvas.height - 100,
    gravity : 1,
    gravitySpeed : 2,
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
    jumps : function () {
        if (this.isOnTheFloor) {
            this.y -= 10
        } else {
            this.y += this.gravity * this.gravitySpeed
        }
    },
    draw : function () {
        ctx.fillRect(this.x, this.y, 100, 100)
    },
    moveRight : function () {
        if(this.x < canvas.width - 100){
            this.x += 10
        } else {this.x += 0}
    },
    moveLeft : function () {
        if(this.x > 0){
            this.x -= 10
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
    constructor() {
        this.x = Math.floor(Math.random * 750);
        this.y = 0;
        this.width = 50;
        this.heigth = 100;
        this.speed = 6;
        this.color = 'red'
    }

    //draw() 

}

class BigMac {
    constructor(){
        this.x = Math.floor(Math.random * 750)
        this.y = 0
        this.width = 50;
        this.height = 50;
        this.speed = 4;
        this.color = 'green'
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
    console.log(3)
}, 10)
}

