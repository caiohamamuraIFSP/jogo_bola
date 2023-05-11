let canvas = document.createElement('canvas')
let cabecalho = document.getElementById('cabecalho')
canvas.height = window.innerHeight - 84
canvas.width = window.innerWidth;
let bola = document.getElementById('bola')
let pega = document.getElementById('pega')

document.body.append(canvas)

let ctx = canvas.getContext('2d')

const ACEL_FACTOR = 0.12
let velX = 0
let velY = 0
let posX = canvas.width / 2
let posY = canvas.height / 2
let tam_bola = 50
let raio_bola = tam_bola / 2
let mouseX = canvas.width / 2
let mouseY = canvas.height / 2

let xPega;
let yPega;
let pontuacao = -10;
let pontos = document.getElementById('pontos');

function novoPega() {
    xPega = 10 + (Math.random()  * (canvas.width-40))
    yPega = 10 + (Math.random()  * (canvas.height-40))
    yPega += 84
    pega.style.setProperty('left', xPega + 'px')
    pega.style.setProperty('top', yPega + 'px')
    pontuacao += 10;
    pontos.innerHTML = pontuacao;
    tam_bola += 5;
    raio_bola = tam_bola/2;
}

novoPega();

function taDentro(x, y, x2, y2, raio) {
    y -= 70
    x += 10
    raio -= 10
    let dist = Math.sqrt(((x - x2) ** 2 + (y - y2) ** 2));
    return dist <= raio;
}

function loopJogo() {

    let diffX = mouseX - posX;
    let diffY = mouseY - posY;
    velX = diffX * ACEL_FACTOR;
    velY = diffY * ACEL_FACTOR;
    posX += velX;
    posY += velY;

    if (taDentro(xPega, yPega, posX, posY, raio_bola)) {
        novoPega()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bola, posX - (tam_bola/2),  posY - tam_bola / 2, tam_bola, tam_bola)
    
    requestAnimationFrame(loopJogo)
}

loopJogo();


canvas.addEventListener('mousemove', (evt) => {
    mouseX = evt.offsetX
    mouseY = evt.offsetY
})