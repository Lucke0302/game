let lastKeyPressed = null;

keys = {
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

document.addEventListener("keydown", function(event) {
    if (event.key === "w" || event.key === "W") {
        keys.a.pressed = true;
    }

    if ((event.key === "a" || event.key === "A") && lastKeyPressed == "a") {
        keys.a.pressed = true;
        lastKeyPressed = "a";
    }

    if ((event.key === "d" || event.key === "D") && lastKeyPressed == "d") {
        keys.d.pressed = true;
        lastKeyPressed = "d";
    }

    if (event.key === " ") {
        // Adicione a lógica de ataque aqui
    }

    if (event.key === "q" || event.key === "Q") {
        // Adicione a lógica do primeiro ataque especial aqui
    }

    if (event.key === "w" || event.key === "W") {
        // Adicione a lógica do segundo ataque especial aqui
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "a" || event.key === "A") {
        keys.a.pressed = false;
        keys.a.hold = false;
    }
    if (event.key === "d" || event.key === "D") {
        keys.d.pressed = false;
        keys.d.hold = false;
    }
});