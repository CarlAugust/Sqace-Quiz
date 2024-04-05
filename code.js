const map = document.getElementById('map')
const player = document.getElementById('player')

let speed = 5 // player speed
let x = 0
let y = 0

function move(key) {

    switch(key) {
        case 'W':
            y -= speed;
            break;
        case 'A':
            x -= speed;
            break;
        case 'D':
            x += speed;
            break;
        case 'S':
            y  += speed;
    } 
    player.style.top = y + "px"
    player.style.left = x + "px"
}

document.addEventListener('keydown', function(event) {

    let key = event.key.toUpperCase()
    if (['W', 'A', 'S', 'D'].includes(key)) {
        move(key);
    }

        
});
