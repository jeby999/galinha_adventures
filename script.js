const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const play_game_button = document.querySelector(".play_game")

const keys = {};


play_game_button.addEventListener("touchend", function() {

    iniciar("mobile")

})

play_game_button.addEventListener("mouseup", function() {

    iniciar("pc")

})

function Collision(a, b) {
    return (
        a.pos[0] < b.pos[0] + b.size[0] &&
        a.pos[0] + a.size[0] > b.pos[0] &&
        a.pos[1] < b.pos[1] + b.size[1] &&
        a.pos[1] + a.size[1] > b.pos[1]
    );
}

function draw_cube(pos, size, color, alpha) {

    ctx.globalAlpha = alpha
    ctx.fillStyle = color;
    ctx.fillRect(pos[0], pos[1], size[0], size[1]);

}

function draw_image(pos, size, alpha, image) {

    ctx.globalAlpha = alpha
    ctx.drawImage(image, pos[0], pos[1], size[0], size[1])

}

function write_text(text, font, pos, color, alpha) {

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha

    ctx.fillText(text, pos[0], pos[1]);

}

function randint(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

//caregando imagens imagens

const background_style_1 = new Image
background_style_1.src = "sprites/background.jpg"

const player_skin_1 = new Image
player_skin_1.src = "sprites/player_skin_1.png"

const car_skin_1 = new Image
car_skin_1.src = "sprites/car_skin_1.png"

const car_skin_2 = new Image
car_skin_2.src = "sprites/car_skin_2.png"

const power_spr_1 = new Image
power_spr_1.src = "sprites/power_1.png"

const life_heart_spr = new Image
life_heart_spr.src = "sprites/vida.png"

class car {
    constructor(pos, size, speed, color, alpha, render, type, image) {
        
        this.pos = pos
        this.size = size
        this.color = color
        this.alpha = alpha
        this.speed = speed
        this.type = type
        this.render = true
        this.image = image

        if (this.type == "r") {

            let limit = 2400

        }else if (this.type == "g") {

            let limit = 600

        }

    }

    draw() {

        if (this.render) {

            draw_cube(this.pos, this.size, this.color, this.alpha[1])
            draw_image(this.pos, this.size, this.alpha[0], this.image)

        }

    }

    update() {

        this.pos[1] += this.speed

        if (this.pos[1] > 600) {

                
            if (this.type == "r") {

                if (this.speed <= 18) {
                        
                    this.speed += 1

                }else {

                    this.speed = 1

                }

            }

            this.pos = [randint(240, 620), -340]

        }

    }

}
//240 - 620

class power_up {
    constructor(pos, size, type, render, alpha) {
        
        this.pos = pos
        this.size = size
        this.type = type
        this.render = true
        this.alpha = alpha
        this.culdown = 0

    }

    update() {

        if (this.type == 0) {

            //culdown = 1000

            if (Collision(this, player) && this.render == true) {

                this.pos = [randint(0, 1000-this.size[0]), randint(0, 600-this.size[1])]
                player.vel *= 2
                player.acc *= 2
                this.render = false
                this.culdown = frame + 2000
                
            }

            if (this.culdown > 0 && this.culdown-700 == frame) {
                
                player.vel /= 2
                player.acc /= 2

            }else if (this.culdown > 0 && this.culdown == frame){

                this.render = true

            }

        }

    }

    draw() {

        if (this.render) {

            if (this.type == 0) {
             
                draw_image(this.pos, this.size, this.alpha, power_spr_1)
            
            }

        }

    }
}

let frame = 0

let player
let cars
let camera
let powers
let background

const cena_1 = {

    id:0,

    craete:function() {

        powers = [new power_up([randint(0, 901), randint(0, 507)], [99, 93], 0, true, 1)]

        player = {

            pos:[100, 300],
            size:[50, 80],
            sk_size:[102, 102],
            sk_pos:[90, 280],
            color:"orange",
            alpha:[1,0],
            vel:8,
            velx:0,
            vely:0,
            acc:0.5,
            life:50,
            skin:player_skin_1,

            morer:function() {

                camera.vely = 0
                this.vely = 0
                this.alpha[0] = 0

                //write_text("game over", "90px Arial", [500, 270], "red", 1)

                for (let i = 0; i < cars.length-2; i++) {

                    cars[i].alpha = [0,0]
                        
                }

                cena_id = 1

            },

            draw:function(active) {

                if (active == true) {

                    draw_cube(this.pos, this.size, this.color, this.alpha[1])
                    draw_image(this.sk_pos, this.sk_size, this.alpha[0], this.skin)

                    write_text("VIDA", "bold 40px Arial", [20, 540], "white", 0.8)
                    draw_cube([20, 570], [100*0.9, 20], "red", 1)
                    draw_cube([20, 570], [this.life*1.9, 20], "rgb(0, 254, 0)", 1)

                }

            },

            update:function(active) {
                if (active) {

                    this.pos[0] += this.velx
                    this.pos[1] += this.vely

                    this.sk_pos = [this.pos[0]-10, this.pos[1]-20]

                    this.pos[0] = Math.max(0, Math.min(this.pos[0], canvas.width - this.size[0]))
                    this.pos[1] = Math.max(0, Math.min(this.pos[1], canvas.height - this.size[1]))

                    for (let i = 0; i < cars.length-2; i++) {
                    
                        if (Collision(this, cars[i])) {

                            this.life--

                        }

                    }

                    /*
                    if (this.cd_invincible == frame && this.invincible == true) {

                        this.cd_invincible = null
                        this.alpha[0] = 1

                        this.invincible = false

                    }*/

                    if (this.life <= 0) {

                        this.morer()

                    }

                    if (keys["w"]) {

                        if (this.vely > -this.vel) {

                            this.vely -= this.acc

                        }

                    }else if (keys["s"]) {

                        if (this.vely < this.vel) {

                            this.vely += this.acc

                        }

                    }else {

                        if (this.vely > 0) {

                            this.vely -= this.acc

                        }else if (this.vely < 0) {

                            this.vely += this.acc

                        }

                    }

                    if (keys["a"]) {

                        if (this.velx > -this.vel) {

                            this.velx -= this.acc

                        }

                    }else if (keys["d"]) {

                        if (this.velx < this.vel) {

                            this.velx += this.acc

                        }

                    }else {

                        if (this.velx > 0) {

                            this.velx -= this.acc

                        }else if (this.velx < 0) {

                            this.velx += this.acc

                        }

                    }

                }

            }

        }

        background = {

            pos:[0,0],
            size:[1000,600],
            alpha:1,
            image:background_style_1,

            draw:function(active) {
                if (active) {
                
                    draw_image(this.pos, this.size, this.alpha, this.image)
                    draw_image([this.pos[0], this.pos[1]-599], this.size, this.alpha, this.image)
                    draw_image([this.pos[0], this.pos[1]-1198], this.size, this.alpha, this.image)
                
                }

            },

            update:function(active) {
                if (active) {

                    this.pos[1] += camera.vely

                    if (this.pos[1] >= 600) {

                        this.pos[1] = 0

                    }

                }

            }

        }

        cars = [new car([randint(240, 620), -152], [81, 152], 5, "red", [1,0], true, "g", car_skin_1),
        new car([randint(240, 620), -152], [81, 152], 6, "red", [1,0], true, "g", car_skin_1),
        new car([randint(240, 620), -152], [81, 152], 7, "red", [1,0], true, "g", car_skin_1),]

        camera = {

            vely:1

        }

    },

    update:function() {

        player.update(true)

        for (let i = 0; i < powers.length; i++) {

            powers[i].update()

        }

        for (let i = 0; i < cars.length; i++) {

            cars[i].update()
            
        }

        background.update(true)

    },


    draw:function() {

        background.draw(true)

        for (let i = 0; i < powers.length; i++) {

            powers[i].draw()

        }

        for (let i = 0; i < cars.length; i++) {

            cars[i].draw()
            
        }

        player.draw(true)

    }

}

const menu = {

    id:1,

    update:function() {

        if (keys["Enter"]) {

            cena_1.craete()
            cena_id = 0

        }

    },

    draw:function() {

        write_text("galinha adventures", "bold 80px Arial", [50, 200], "white")

        write_text("ernter para começar", "50px Arial", [200, 400], "white")

        draw_image([820, 110], [153, 153], 1, player_skin_1)

    }

}


let cena_id = 1

function mainloop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cena_id == cena_1.id) {

        cena_1.draw()
        cena_1.update()

    }else if (cena_id == menu.id) {

        menu.draw()
        menu.update()

    }


    frame++

    requestAnimationFrame(mainloop);
}

function iniciar(mode) {

    if (mode == "pc") {

        canvas.width = 1000
        canvas.height = 600

        canvas.style.width = "1000px"
        canvas.style.height = "600px"

        document.addEventListener("keydown", (event) => {
            keys[event.key] = true;
        });

        document.addEventListener("keyup", (event) => {
            keys[event.key] = false;
        });

    }

    if (mode == "mobile") {

        canvas.width = 1000
        canvas.height = 600

    }

    mainloop()

    play_game_button.style.left = "-100vh"
    
}
