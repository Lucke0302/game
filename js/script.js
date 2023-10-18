const canvas = document.getElementById("canvas");
const bgdimensions = {
    width: 1024,
    height: 556
};
canvas.width = bgdimensions.width;
canvas.height = bgdimensions.height;
const ctx = canvas.getContext("2d");

function drawBackground() {    
    ctx.fillStyle = "#1c1c1c";
    ctx.fillRect(0, 0, 1024, 556);
    //ctx.drawImage(backgroundGif, 0, 0, canvas.width, canvas.height);
}

var player = new Entity(
    position = {
        x: 0,
        y: 0
    },
    dimensions = {
        width: 100,
        height: 150
    },
    velocity = {
        x: 0,
        y: 0
    },
    source = "./sprites/player.png"
);

function gameLoop() {
    // Limpe apenas a área ocupada pelo jogador
    ctx.clearRect(player.position.x, player.position.y, player.width, player.height);

    handleControls();
    // Atualize a posição do jogador
    player.update();

    // Desenhe o background (GIF) novamente
    drawBackground();

    // Desenhe o jogador na nova posição
    player.draw();

    // Chame o próximo frame
    requestAnimationFrame(gameLoop);
}

// Inicialize o loop do jogo
requestAnimationFrame(gameLoop);