const map = document.getElementById('map')
const player = document.getElementById('player')

// character positions

let x = 0
let y = 0

let speed = 1 // player speed

document.addEventListener('keydown', function(event) {
    var key = event.key.toUpperCase()
    if (['W', 'A', 'S', 'D'].includes(key)) {

        switch(key) {
            case 'W':
                y += speed;
                break;
            case 'A':
                x -= speed
                break;
            case 'D':
                x += speed
                break;
            case 'S':
                y -= speed
        }

        console.log('click')
        
    }

    player.style.top += y
});
