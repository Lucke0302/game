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

}

class Entity extends Sprite {
    constructor(position, dimensions, velocity, source, health) {
        super(position, dimensions, velocity, source);
        this.health = health;
        this.onGround = false;
    }

    update(){

        // Aplicar a gravidade
        this.velocity.y += gravity;

        // Atualizar a posição vertical
        this.position.y += this.velocity.y;
                        
        // Evitar que o jogador ultrapasse o chão
        if (this.position.y > bgdimensions.height - this.height) {
            this.position.y = bgdimensions.height - this.height;            
            this.onGround = true;
            this.velocity.y = 0; // Impede que o jogador caia mais
        }     
        else{        
            this.onGround = false;    
        }       
        this.position.x += this.velocity.x;
    }

    jump() {
        if (this.onGround) {
            this.velocity.y = -16; // Ajuste a força do pulo conforme necessário
            this.onGround = false; // Marque o jogador como não estando mais no chão
        }
    }

    checkCollision(otherEntity) {

    }

    updateHealth(amount) {
        this.health += amount;
    }

    movement(){
        this.position.x += this.velocity.x;
    }
}