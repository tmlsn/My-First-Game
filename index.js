const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const startButton = document.getElementById("startButton")

const dimitri = {
    img : '',
    x : canvas.width / 2,
    y : canvas.heigth,
    gravity : 1,
    gravitySpeed : .5,
    health : 100,
    jump : false,
    draw : function () {
        ctx.fillRect(this.x, this.y, 100, 100)
    },
    moveRight : function () {
        if(x < 700){
            this.x += 5
        } 
    },
    moveLeft : function () {
        if(x > 0){
            this.x -= 5
        }
    },
}

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
    ctx.fillStyle = 'grey';
    console.log(2)
    ctx.fillRect(0, 0, canvas.width, canvas.heigth);
    ctx.fillStyle = 'blue'
    dimitri.draw()
    console.log(3)
}, 20)
}

