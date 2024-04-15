const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
c = canvas.getContext("2d")
c.translate(canvas.width/2,canvas.height/2);

let a = 0;
let angle = 0

function globalNum(){
    a += 0.001
    if (a > 6.28) {
        a = 0
    }
}

function orbit() {

    angle = Math.round((a*180) / 3.14)

}

function animate(){
    requestAnimationFrame(animate);
    globalNum();
    orbit();

    let x = Math.round(Math.cos(angle) * 200)
    let y = Math.round(Math.sin(angle) * 200)

    c.beginPath();
    c.clearRect(-canvas.width,-canvas.height, canvas.width*2, canvas.height*2)
    c.arc(0, 0, 50, 0, Math.PI*2, false)
    c.stroke();
    c.closePath()
    c.beginPath()
    c.arc(x, y, 10, 0, Math.PI*2, false)
    c.stroke()

}

animate();