const gravity = 0.6;

class Sprite {

    constructor(position, dimensions, velocity, source){
        this.position = {
            x: position.x,
            y: position.y
        };
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        };
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.source = source
        this.image = new Image();
        this.image.src = this.source;

    }

    draw() {
        this.image.onload = () => {
            this.draw();
        }; 
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);    
    }

    update(){
        // Aplicar a gravidade
        this.velocity.y += gravity;

        // Atualizar a posição vertical
        this.position.y += this.velocity.y;
                        
        // Evitar que o jogador ultrapasse o chão
        if (this.position.y > bgdimensions.height - this.height) {
            this.position.y = bgdimensions.height - this.height;
            this.velocity.y = 0; // Impede que o jogador caia mais
        }
    }

    clear(){
        ctx.drawImage();
    }

}

