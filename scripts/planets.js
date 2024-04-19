

const canvas = document.querySelector('canvas')
let root = document.querySelector('.root')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasHalfX = canvas.width/2
const canvasHalfY = canvas.height/2

c = canvas.getContext("2d")

let a = 0;

// Variable for how fast the game runs
let originalSpeed = 0.00005
let runSpeed = originalSpeed


// A global a variable which increments up to 20*PI
function globalNum(){
    a += runSpeed

    if (a > Math.PI * 8) {
        a -= Math.PI * 8
    }

}



let planets = [];

class planet {

    constructor(radius, speed, xPath, yPath, name) {

        this.radius = radius
        this.speed = speed
        this.xPath = xPath
        this.yPath = yPath
        this.name = name

        planets.push(this)
    }

    planetInfo() {
    
        let element = document.createElement('div')

        // A header for the html in every planet
        let text = document.createElement('h1')
        element.classList.add('planetText')
        text.innerHTML = `Hello this is ${this.name}`
        element.appendChild(text)

        // A back button to return to the solar system
        let back = document.createElement('button')
        back.innerHTML = 'go back'
        back.addEventListener('click', () => {

            root.removeChild(element)
            canvas.style.display = 'block'
            root.style.display = 'none'
            runSpeed = originalSpeed 
        } )

        element.appendChild(back)
        
        root.appendChild(element);
    
        // Pauses the solar system, removes it from view and views the planets html
        canvas.style.display = 'none';
        root.style.display = 'block';
        runSpeed = 0;

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
    obj.xPos = x + canvasHalfX
    obj.yPos = y + canvasHalfY

    // Draws to canvas
    c.beginPath()
    c.arc(obj.xPos, obj.yPos, obj.radius, Math.PI*2, false)
    c.fill()
    c.stroke();

}

// A function that takes a array, the array will specifically
// contain specific information based on the index before inputed



// planets objects
let sun = new planet(50, 1, 0, 0, 'Sun')
let mercury = new planet(12, 1, 125, 100, 'Mercury')
let venus = new planet(18, 1.2, 185, 160, 'Venus')
let earth = new planet(20, 1.5, 250, 225, 'Earth')
let mars = new planet(14, 1.8, 300, 290, 'Mars')
let jupiter = new planet(40, 2.5, 400, 400, 'Jupiter')
let saturn = new planet(28, 3, 500, 480, 'Saturn')
let uranus = new planet(20, 3.4, 620, 600, 'Uranus')
let neptune = new planet(19, 4, 700, 690, 'Neptune')


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
            planets[val].planetInfo()
        }
    }

})