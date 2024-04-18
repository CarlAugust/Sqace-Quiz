

const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasHalfX = canvas.width/2
const canvasHalfY = canvas.height/2

c = canvas.getContext("2d")

let a = 0;

// Variable for how fast the game runs
let runSpeed = 0.0002


// A global a variable which increments up to 20*PI
function globalNum(){
    a += runSpeed

    if (a > Math.PI * 8) {
        a -= Math.PI * 8
    }

    console.log(a)
}



let planets = [];

class planet {

    constructor(radius, speed, xPath, yPath, func) {

        this.radius = radius
        this.speed = speed
        this.xPath = xPath
        this.yPath = yPath
        this.func = func

        planets.push(this)



    }



    

}

// Function that draws planets to the canvas
function drawPlanet(obj) {

    /*
    Calculates a angle based on a global variable a
    Uses the formula used is (x*180)/PI to find a angle
    based on a inputed x
    */
    let angle = ((a/obj.speed)*180) / 3.14


    // Uses cos and sin to find the x and y based on the distance from origo and angle
    let x = Math.cos(angle) * obj.xPath
    let y = Math.sin(angle) * obj.yPath

    // Changes the x and y based on the canvas length
    obj.xPos = Math.round(x + canvasHalfX)
    obj.yPos = Math.round(y + canvasHalfY)

    // Draws to canvas
    c.beginPath()
    c.arc(obj.xPos, obj.yPos, obj.radius, Math.PI*2, false)
    c.fill()
    c.stroke();

}

// planets objects
let blackHole = new planet(50, 1, 0, 0)
let mercury = new planet(12, 1, 125, 100)
let venus = new planet(18, 1.2, 185, 160)
let earth = new planet(20, 1.5, 250, 225)
let mars = new planet(14, 1.8, 300, 290)
let jupiter = new planet(40, 2.5, 400, 400)
let saturn = new planet(28, 3, 500, 480)
let uranus = new planet(20, 3.4, 670, 680)
let neptune = new planet(19, 4, 750, 740)


// The function that loops every aniation frame
function animate(){

    requestAnimationFrame(animate);
    globalNum();


    // Clears the canvas
    c.beginPath();
    c.fillStyle = '#000000'
    c.fillRect(-canvas.width,-canvas.height, canvas.width*2, canvas.height*2)
    c.closePath()

    // Sets colors to white
    c.strokeStyle = '#ffffff';
    c.fillStyle = '#ffffff';
    
    // Loops through the planets array and draws them onto the canvas
    for (let val in planets) {
        drawPlanet(planets[val])

    }


}

animate();


// Event listeren for click events
canvas.addEventListener('click', (event) => {

    // Finds the cord which the user clicked on
    let xC = event.clientX
    let yC = event.clientY

    // Loops through all the planets and check if the user cords match with the planet cords

    for (let val in planets) {
        let x = planets[val].xPos, y = planets[val].yPos, r = planets[val].radius

        /*
        Using the differnce in position of the planet and client
        It checks if a square based on the differnce is smaller
        then a square based on the radius
        */
        let dx = x - xC;
        let dy = y - yC;

        let dist = dx*dx+dy*dy

        if (Math.abs(r * r) > dist) {
            console.log(planets[val].speed)
        }
    }

})