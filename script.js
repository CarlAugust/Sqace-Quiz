const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
c = canvas.getContext("2d")
c.translate(canvas.width/2,canvas.height/2);

c.beginPath();

c.arc(0, 0, 100, 0, Math.PI * 2, false);
c.stroke();