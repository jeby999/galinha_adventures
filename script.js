const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const play_game_pc_button = document.querySelector(".play_game_pc")
const play_game_mobile_button = document.querySelector(".play_game_mobile")

play_game_mobile_button.addEventListener("touchend", function() {

    iniciar("mobile")
    console.log("mobile")

})

play_game_pc_button.addEventListener("mouseup", function() {

    iniciar("pc")
    console.log("pc")

})

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

function draw_cube(pos, size, color, alpha) {

    ctx.globalAlpha = alpha
    ctx.fillStyle = color;
    ctx.fillRect(pos[0], pos[1], size[0], size[1]);

}

function draw_image(pos, size, alpha, image) {

    ctx.globalAlpha = alpha
    ctx.drawImage(image, pos[0], pos[1], size[0], size[1])

}

//caregando imagens imagens

let background_style_1 = new Image
background_style_1.src = "sprites/background.jpg"

let player_skin_1 = new Image
player_skin_1.src = "sprites/player_skin_1.png"

let player = {

    pos:[500, 300],
    size:[102, 102],
    color:"orange",
    alpha:[1,0],
    vel:8,
    velx:0,
    vely:0,
    acc:2,
    skin:player_skin_1,

    draw:function(active) {

        if (active == true) {

            draw_cube(this.pos, this.size, this.color, this.alpha[1])
            draw_image(this.pos, this.size, this.alpha[0], this.skin)

        }

    },

    update:function(active) {
        if (active) {

            this.pos[0] += this.velx
            this.pos[1] += this.vely

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

const background = {

    pos:[0,0],
    size:[1000,600],
    alpha:1,
    image:background_style_1,

    draw:function(active) {
        if (active) {
        
            draw_image(this.pos, this.size, this.alpha, this.image)
            draw_image([this.pos[0], this.pos[1]-600], this.size, this.alpha, this.image)
        
        }

    },

    update:function(active) {
        if (active) {

            this.pos[1]++

            if (this.pos[1] == 600) {

                this.pos[1] = 0

            }

        }

    }

}

keys["w"] = false
keys["s"] = false

let frame = 0
let pressed = [keys["w"], keys["s"]]

let cena_1 = {

    id:0,

    update:function() {

        player.update(true)

        background.update(true)

        pressed = [keys["w"], keys["s"]]

    },


    draw:function() {

        background.draw(true)

        player.draw(true)

    }

}


let cena_id = 0

function mainloop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cena_1.draw()
    cena_1.update()


    frame++

    requestAnimationFrame(mainloop);
}

function iniciar(mode) {

    if (mode == "pc") {

        canvas.width = 1000
        canvas.height = 600

        canvas.style.width = "1200px"
        canvas.style.height = "720px"

    }

    if (mode == "mobile") {

        canvas.width = 1000
        canvas.height = 600

    }

    mainloop()

    play_game_mobile_button.style.left = "-100vh"
    play_game_pc_button.style.left = "-100vh"
    
}