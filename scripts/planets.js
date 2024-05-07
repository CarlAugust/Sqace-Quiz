const canvas = document.querySelector('canvas')
let root = document.querySelector('.root')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasHalfX = canvas.width/2
const canvasHalfY = canvas.height/2

c = canvas.getContext("2d")

let a = 0;

// Variable for how fast the game runs
let originalSpeed = -0.00005
let runSpeed = originalSpeed


// A global a variable which increments up to 8*PI
// This variable is used by all planets to calculate angles
function globalNum(){
    a += runSpeed
    if (a <  -Math.PI * 8) {
        a += Math.PI * 8
    }

}

// Array that stores all planet objects
let planets = [];

// planet class, planet refers to all celestial objects including the sun
class planet {

    /* A constructor that makes all the values in the planet object
    it takes a radius for the size, a speed for how fast it rotaes around the center
    Takes a xPath and yPath, both contributes to making oval shaped
    planet orbit paths */
    constructor(radius, speed, xPath, yPath, obj) {

        this.radius = radius
        this.speed = speed
        this.xPath = xPath
        this.yPath = yPath
        this.obj = obj

        planets.push(this)
    }

    planetInfo() {
    
        let element = document.createElement('div')

        // A header for the html in every planet
        let text = document.createElement('h1')
        element.classList.add('planetText')
        text.innerHTML = `Hello this is ${this.obj.name}`
        element.appendChild(text)

        text = document.createElement('p');
        element.classList.add('planetText')
        text.innerHTML = `${this.obj.question}`;
        element.appendChild(text)

        let input = document.createElement('input');

        element.appendChild(input)
        text = document.createElement('p')
        element.appendChild(text)

        let submit = document.createElement('button');
        submit.innerHTML = 'submit';

        submit.addEventListener('click', () => {
            if (input.value == this.obj.solution) {
                
                if (this.obj.name == "Sun") {
                    root.removeChild(element);
                    text.innerHTML =
                    "<h1>You did it lets go</h1>" +
                    "<p>How does it feel? Are you happy?</p>" +
                    "<p>You have just wasted a few minutes of your life</p>" +
                    "<p>And the answer was just 0, 0... 0... 0... 0... </p>" +
                    "<p>Well your stuck now, with me and this text</p>" + 
                    "<p>Well you could just close the tab, but thats</p>" +
                    "<p>but thats kinda rude, so i hope you stay :) </p>" +
                    "<p> o </p>" + "<p> o </p>" + "<p> o </p>" +
                    "<p>Did you know that planets are round?</p>" +
                    "<p>Kinda cool right, oh you already knew?</p>" +
                    "<p>No your stupid thats impossiblebles</p>" +
                    "<p>Okay bye now</p>";

                    element = document.createElement('div');
                    element.classList.add("planetText")
                    element.appendChild(text);
                    root.appendChild(element);
                    answerDiv.style.display = "none";

                    
                } else {

                    text = document.createElement('h1');
                    text.innerHTML = "correct answer, now go back :)"
                    element.appendChild(text)

                    document.getElementById(`${this.obj.variableName}`).innerHTML = `${this.obj.variableName} = ${this.obj.solution}`
                }

            }
        })
        element.appendChild(submit)

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

// Objects for information in the the planets
let arrOfPlanetInfo = []

function planetInfo(name, question, solution, variableName) {
    
    let obj = {};

    obj.name = name;
    obj.question = question;
    obj.solution = solution;
    obj.variableName = variableName

    arrOfPlanetInfo.push(obj);


}

planetInfo("Sun", "What is the soultion to:   m^2 * ( sqrt(v)/E^2 ) + j^s - d/dx( u*m ) * d/dx( n ) ", "0", "io");
planetInfo("Mercury", "What is the soultion to: m = 9 + 10", "21", "m");
planetInfo("Venus", "What is the soultion to: ?", "?", "v");
planetInfo("Earth", "What is the soultion to: ?", "?", "E");
planetInfo("Mars", "What is the soultion to: ?", "?", "M");
planetInfo("Jupiter", "What is the soultion to: ?", "?", "j");
planetInfo("Saturn", "What is the soultion to: ?", "?", "s");
planetInfo("Uranus", "What is the soultion to: ?", "?", "u");
planetInfo("Neptune", "What is the soultion to: ?", "?", "n");



// planets objects
let sun = new planet(40, 1, 0, 0, arrOfPlanetInfo[0])
let mercury = new planet(10, 1, 100, 75, arrOfPlanetInfo[1])
let venus = new planet(15, 1.2, 160, 145, arrOfPlanetInfo[2])
let earth = new planet(17, 1.5, 225, 200, arrOfPlanetInfo[3])
let mars = new planet(11, 1.8, 275, 265, arrOfPlanetInfo[4])
let jupiter = new planet(32, 2.5, 350, 350, arrOfPlanetInfo[5])
let saturn = new planet(22, 3, 440, 440, arrOfPlanetInfo[6])
let uranus = new planet(17, 3.4, 500, 520, arrOfPlanetInfo[7])
let neptune = new planet(16, 4, 600, 570, arrOfPlanetInfo[8])

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