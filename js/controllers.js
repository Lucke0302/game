let lastKeyPressed = null;

const space = {
    width: 100,
    height: 150,
    duration: 1
};

const keys = {
    w: {
        pressed: false,
        hold: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    },
    z: {
        pressed: false,
        hold: false
    },
    x: {
        pressed: false,
        hold: false
    }
}


window.addEventListener("keydown", e =>{
    let key = e.key;
    switch(key){
        case "a":
            keys.a.pressed = true;
            player.lastKeyPressed = key;
            break;
        case "d":
            keys.d.pressed = true;
            player.lastKeyPressed = key;
            break;
        case "w":
            keys.w.pressed = true;
            break;
        case " ":
            keys.space.pressed = true;
            console.log("Barra de espaço pressionada.");
            break;
    }
});

window.addEventListener("keyup", e =>{
    let key = e.key;
    switch(key){
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;            
            keys.w.hold = false;
            break;
        case " ":
            keys.space.pressed = false;            
            keys.space.hold = false;
            break;
    }
});



function handleControls(){
    movement();
    attacks();

    function movement(){
        player.velocity.x = 0;        

        if(keys.a.pressed && "a".includes(player.lastKeyPressed)){
            player.velocity.x = -1.5 * 3.4;
        }

        if(keys.d.pressed && "d".includes(player.lastKeyPressed)){
            player.velocity.x = 1.5 * 3.4;
        }

        if(keys.w.pressed && !keys.w.hold){
            player.jump();
            keys.w.hold = true;
        }
    }
    function attacks() {
        // Atualize a duração do ataque
        if (space.duration > 0) {
            space.duration -= 1 / 60; // Suponha que o jogo rode a 60 quadros por segundo
        }
        
        // Verifique se a barra de espaço foi pressionada e a duração do ataque é maior que zero
        if (keys.space.pressed && space.duration > 0) {
            // Desenhe o ataque à frente do jogador
            ctx.fillStyle = "red"; // Cor do ataque (pode ser ajustada)
            ctx.fillRect(
                player.position.x + player.width,
                player.position.y - space.height,
                space.width,
                space.height
            );
        }
    }
}