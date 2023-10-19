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

const background = new Sprite(
    position = {
        x: 0,
        y: 0
    },
    dimensions = {
        width: bgdimensions.width,
        height: bgdimensions.height
    },
    velocity = {
        x: 0,
        y: 0
    },
    source = "./sprites/bg.gif"
);

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
    source = "./sprites/player.png",
    health = 100
);

player.collisionCooldown = 0;

var lEnemy = [];

lEnemy[0] = new Entity(
    position = {
        x: player.position.x + 400,
        y: 0 
    },
    dimensions = {
        width: 50,
        height: 50
    },
    velocity = {
        x: 0,
        y: 0
    },
    source = "./sprites/lEnemy.png",
    health = 60
);

function checkCollision(entity1, entity2) {
    // Verifica a colisão entre duas entidades
    if (
        entity1.position.x < entity2.position.x + entity2.width &&
        entity1.position.x + entity1.width > entity2.position.x &&
        entity1.position.y < entity2.position.y + entity2.height &&
        entity1.position.y + entity1.height > entity2.position.y
    ) {
        // Colisão detectada
        return true;
    }
    // Nenhuma colisão
    return false;
}



function updateEnemies() {    
    if (player.collisionCooldown > 0) {
        player.collisionCooldown -= 16; // Reduz 16 milissegundos por quadro (supondo 60 FPS)
        if (player.collisionCooldown < 0) {
            player.collisionCooldown = 0;
        }
    }
    for (let i = 0; i < lEnemy.length; i++) {
        let enemy = lEnemy[i];
        // Lógica para atualizar a posição e verificar colisões de inimigos aqui
        enemy.update();
        // Se um inimigo colidir com o jogador, você pode aplicar lógica de dano
        if (player.collisionCooldown <= 0 && checkCollision(player, enemy)) {
            // A colisão ocorreu, e o jogador não está em cooldown
            player.updateHealth(-10); // Aplica o dano ao jogador
            player.collisionCooldown = 3000; // Define o cooldown em milissegundos (por exemplo, 1 segundo)
            if(player.health <= 0)alert("Game Over")
;            console.log(player.health)
        }
    }
    for (let i = 0; i < lEnemy.length; i++) {
        let enemy = lEnemy[i];
        // Calcule a direção do jogador
        let directionX = player.position.x - enemy.position.x;
        let directionY = player.position.y - enemy.position.y;
        // Defina uma velocidade para os inimigos
        const enemySpeed = 1.0; // Ajuste conforme necessário
        // Normalize a direção (isso faz com que os inimigos se movam na direção do jogador com uma velocidade constante)
        let length = Math.sqrt(directionX * directionX + directionY * directionY);
        directionX /= length;
        directionY /= length;
        // Atualize a posição dos inimigos
        enemy.position.x += directionX * enemySpeed;
        enemy.position.y += directionY * enemySpeed;
    }
}

function gameLoop() {
    // Limpe apenas a área ocupada pelo jogador
    ctx.clearRect(player.position.x, player.position.y, player.width, player.height);

    handleControls();  
        
    // Atualize a posição do jogador
        // Atualize o movimento das entidades inimigas
    updateEnemies();
    
    lEnemy[0].update();
    player.update();
    //console.log(player.position.x + " " + player.space.position.x)
    //console.log(player.onAttackCooldown)

    // Desenhe o background (GIF) novamente
    background.draw();

    // Desenhe o jogador na nova posição
    lEnemy[0].draw();

    player.draw();


    // Chame o próximo frame
    requestAnimationFrame(gameLoop);
}

// Inicialize o loop do jogo
requestAnimationFrame(gameLoop);