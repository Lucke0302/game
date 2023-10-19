let lastKeyPressed = null;


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
        if(keys.space.pressed && !keys.space.hold){
            player.attackS();            
            keys.space.hold = true;
        }
    }    
}