const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const canvasHalfX = canvas.width/2
const canvasHalfY = canvas.height/2

c = canvas.getContext("2d")

let a = 0;

function globalNum(){
    a += 0.0001

    if (a > Math.PI * 20) {
        a -= Math.PI * 20
    }
}

/*function planet(xPath, yPath, size, factor) {
    let angle = ((a/factor)*180) / 3.14

    let x = Math.cos(angle) * xPath
    let y = Math.sin(angle) * yPath

    c.beginPath()
    c.arc(x, y, size, Math.PI*2, false)
    c.fill()
    c.stroke();

} */

class planet {

    constructor(radius, factor, xPath, yPath) {

        this.radius = radius
        this.factor = factor
        this.xPath = xPath
        this.yPath = yPath

    }

    

}

function createPlanet(obj) {

    let angle = ((a/obj.factor)*180) / 3.14

    let x = Math.cos(angle) * obj.xPath
    let y = Math.sin(angle) * obj.yPath

    obj.xPos = Math.round(x + canvasHalfX)
    obj.yPos = Math.round(y + canvasHalfY)
    c.beginPath()
    c.arc(obj.xPos, obj.yPos, obj.radius, Math.PI*2, false)
    c.fill()
    c.stroke();

}


let blackHole = new planet(50, 1, 0, 0)
let mercury = new planet(10, 1, 125, 100)
let venus = new planet(10, 1.2, 185, 160)

function animate(){
    requestAnimationFrame(animate);
    globalNum();

    c.beginPath();
    c.fillStyle = '#000000'
    c.fillRect(-canvas.width,-canvas.height, canvas.width*2, canvas.height*2)
    c.closePath()

    c.strokeStyle = '#ffffff';
    createPlanet(blackHole)
    c.fillStyle = '#ffffff';
    createPlanet(mercury)
    createPlanet(venus)

}

animate();

canvas.addEventListener('click', (event) => {
    // const Rect = canvas.getBoundingClientRect();
    console.log(event.clientX + "    " + event.clientY)
    console.log(mercury.xPos + '    ' + mercury.yPos)
})