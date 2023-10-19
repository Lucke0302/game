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
        
        ctx.fillStyle = "green";
        ctx.fillRect(this.position.x, this.position.y - (this.height/3), this.health, 10);
        if(this.health < this.initHealth){
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x+this.health, this.position.y - (this.height/3), Math.abs(this.health - 100), 10);
        }
        
        if(this.isAttacking){
            console.log("atacando")
            ctx.fillStyle = "red";
            ctx.fillRect(this.space.position.x, this.space.position.y, this.space.width, this.space.height);
        }  

    }

}

class Entity extends Sprite {
    constructor(position, dimensions, velocity, source, health) {
        super(position, dimensions, velocity, source);
        this.health = health;       
        this.initHealth =  this.health;
        this.onGround = false;
        this.isAttacking = false;
        
        this.space = {
            width: 100,
            height: 150,
            duration: 1,
            position :{
                x: this.position.x + 100,
                y: this.position.y
            },
            onAttackCooldown: false,
            attackCooldown: 200
        };
    }

    update(){

        // Aplicar a gravidade
        this.velocity.y += gravity;
        
        this.space.position.x = this.position.x + 100;
        this.space.position.y = this.position.y;

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
        if(this.isAttacking){
            ctx.fillStyle = "red";
            ctx.fillRect(this.space.position.x, this.space.position.y, this.space.width, this.space.height);
        }        
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

    attackS(){
        if(this.onAttackCooldown)return;
        this.isAttacking = true;
        this.onAttackCooldown = true;

        setTimeout(()=>{
            this.isAttacking = false;
        }, 200);

        setTimeout(() => {
            this.onAttackCooldown = false;
        }, this.space.attackCooldown);
    }
}