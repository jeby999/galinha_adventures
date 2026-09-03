const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");

const play_game_button = document.querySelector(".play_game")

game_tick = 1

const keys = {};

play_game_button.addEventListener("touchend", function() {

    iniciar("mobile")

})

play_game_button.addEventListener("mouseup", function() {

    iniciar("pc")

})

mouse = {

    pos:[null, null],
    size:[1,1],
    click:false,

}

canvas.addEventListener("mousedown", (event) => {

    mouse.click = true

    const rect = canvas.getBoundingClientRect()

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    mouse.x = (event.clientX - rect.left) * scaleX
    mouse.y = (event.clientY - rect.top) * scaleY

    mouse.click = false

})

canvas.addEventListener("moseup", function() {

    mouse.click = false

})

function buttons_satrt() {

    const up_button_m = document.createElement("button")
    const down_button_m = document.createElement("button")
    const left_button_m = document.createElement("button")
    const right_button_m = document.createElement("button")
    const a_button_m = document.createElement("button")
    const b_button_m = document.createElement("button")
    const mobile_buttons = [up_button_m, down_button_m, left_button_m, right_button_m, a_button_m, b_button_m]

    up_button_m.style.left = "32dvh"
    down_button_m.style.left = "32dvh"
    left_button_m.style.left = "7dvh"
    right_button_m.style.left = "57dvh"

    a_button_m.style.right = "5dvh"
    b_button_m.style.right = "5dvh"


    up_button_m.addEventListener("touchstart", function() {

        keys["w"] = true

    })

    down_button_m.addEventListener("touchstart", function() {

        keys["s"] = true

    })

    left_button_m.addEventListener("touchstart", function() {

        keys["a"] = true

    })

    right_button_m.addEventListener("touchstart", function() {

        keys["d"] = true



    })

    a_button_m.addEventListener("touchstart", function() {

        keys["Enter"] = true

    })

    b_button_m.addEventListener("touchstart", function() {

        keys["Escape"] = true

    })

    up_button_m.addEventListener("touchend", function() {

        keys["w"] = false

    })

    down_button_m.addEventListener("touchend", function() {

        keys["s"] = false

    })

    left_button_m.addEventListener("touchend", function() {

        keys["a"] = false

    })

    right_button_m.addEventListener("touchend", function() {

        keys["d"] = false

    })

    a_button_m.addEventListener("touchend", function() {

        keys["Enter"] = false

    })

    b_button_m.addEventListener("touchend", function() {

        keys["Escape"] = false

    })

    for (let i = 0; i < mobile_buttons.length; i++) {

        mobile_buttons[i].id = "button"

    }

    mobile_buttons[0].classList.add("up_button_m")
    mobile_buttons[1].classList.add("down_button_m")
    mobile_buttons[2].classList.add("left_button_m")
    mobile_buttons[3].classList.add("right_button_m")
    mobile_buttons[4].classList.add("a_button_m")
    mobile_buttons[5].classList.add("b_button_m")

    document.body.appendChild(mobile_buttons[0])
    document.body.appendChild(mobile_buttons[1])
    document.body.appendChild(mobile_buttons[2])
    document.body.appendChild(mobile_buttons[3])
    document.body.appendChild(mobile_buttons[4])
    document.body.appendChild(mobile_buttons[5])

}

function Collision(a, b) {
    return (
        a.pos[0] < b.pos[0] + b.size[0] &&
        a.pos[0] + a.size[0] > b.pos[0] &&
        a.pos[1] < b.pos[1] + b.size[1] &&
        a.pos[1] + a.size[1] > b.pos[1]
    );
}

function draw_cube(pos, size, color, alpha, inter, stroke) {

    ctx.globalAlpha = alpha

    if (stroke != undefined || false) {

        ctx.strokeStyle = stroke[0]
        ctx.lineWidth = stroke[1]
        ctx.strokeRect(pos[0], pos[1], size[0], size[1])

    }else{

        ctx.strokeStyle = null
        ctx.lineWidth = 0

    }
    
    if (inter) {

        ctx.fillStyle = color
        ctx.fillRect(pos[0], pos[1], size[0], size[1])

    }

}

function draw_image(pos, size, alpha, image, angle) {

    if (angle != undefined) {

        ctx.globalAlpha = alpha

        ctx.save()
        ctx.translate(pos[0] + size[0] / 2, pos[1] + size[1] / 2)
        ctx.rotate(angle * Math.PI / 180)
        ctx.drawImage(image, -size[0] / 2, -size[1] / 2, size[0], size[1])
        ctx.restore()

    }else {

        ctx.globalAlpha = alpha
        ctx.drawImage(image, pos[0], pos[1], size[0], size[1])

    }

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

function play_sound(sound, volume, start, loop) {

    sound.currentTime = start
    sound.volume = volume
    sound.loop = loop
    sound.play()

}

//carregabdo musicas

const musica_fundo_1 = new Audio("sprites/musica_game_1.mp3");

//caregando imagens imagens

const background_style_1 = new Image
background_style_1.src = "sprites/background.png"

const player_skin_1 = new Image
player_skin_1.src = "sprites/player_skin_1.png"

const player_skin_2 = new Image
player_skin_2.src = "sprites/player_skin_2.png"

const player_skin_3 = new Image
player_skin_3.src = "sprites/player_skin_3.png"

const player_skin_4 = new Image
player_skin_4.src = "sprites/player_skin_4.png"


const player_skin_1_w = [new Image, new Image]
player_skin_1_w[0].src = "sprites/player_skin_1_w1.png"
player_skin_1_w[1].src = "sprites/player_skin_1_w2.png"

const player_skin_2_w = [new Image, new Image]
player_skin_2_w[0].src = "sprites/player_skin_2_w1.png"
player_skin_2_w[1].src = "sprites/player_skin_2_w2.png"

const player_skin_3_w = [new Image, new Image]
player_skin_3_w[0].src = "sprites/player_skin_3_w1.png"
player_skin_3_w[1].src = "sprites/player_skin_3_w2.png"

const player_skin_4_w = [new Image, new Image]
player_skin_4_w[0].src = "sprites/player_skin_4_w1.png"
player_skin_4_w[1].src = "sprites/player_skin_4_w2.png"


const car_skin_1 = new Image
car_skin_1.src = "sprites/car_skin_1.png"

const car_skin_2 = new Image
car_skin_2.src = "sprites/car_skin_2.png"

const car_skin_3 = new Image
car_skin_3.src = "sprites/car_skin_3.png"

const car_skin_4 = new Image
car_skin_4.src = "sprites/car_skin_4.png"

const car_skin_5 = new Image
car_skin_5.src = "sprites/car_skin_5.png"

const car_skin_6 = new Image
car_skin_6.src = "sprites/car_skin_6.png"


const power_spr_1 = new Image
power_spr_1.src = "sprites/power_1.png"

const power_spr_2 = new Image
power_spr_2.src = "sprites/power_2.png"

const life_heart_spr = new Image
life_heart_spr.src = "sprites/vida.png"

class car {
    constructor(pos, size, color, alpha, render, type, image, index) {
        
        this.pos = pos
        this.size = size
        this.color = color
        this.alpha = alpha
        this.angle = 0
        this.render = render
        this.speed = 0
        this.type = type
        this.render = true
        this.image = image
        this.index = index

        if (this.type == "g") {this.speed = 6*game_tick}

    }

    draw() {

        if (this.render) {

            draw_cube(this.pos, this.size, this.color, this.alpha[1], false)
            
            if (this.type == "y" || "y2" || "y3") {

                draw_image(this.pos, [81, 152], this.alpha[0], this.image, this.angle)

            }else{

                draw_image(this.pos, this.size, this.alpha[0], this.image, this.angle)

            }

        }

    }

    update() {

        if (this.type == "g") {

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(240, 620), -this.size[1]]

            }

        }

        else if (this.type == "g2" && distance.m >= 10) {

            if (this.speed == 0) {

                this.speed = 6*game_tick

            }

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(240, 620), -this.size[1]]

            }

        }

        else if (this.type == "g3" && distance.m >= 20) {

            if (this.speed == 0) {

                this.speed = 6*game_tick

            }

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(240, 620), -this.size[1]]

            }

        }

        else if (this.type == "r" && distance.m >= 60) {

            this.speed = 5*game_tick
            this.pos[1] += this.speed

            if (this.pos[1] >= 600) {

                if (this.speed <= 25) {
                        
                    this.speed += 1
                    this.pos = [randint(240, 620), -5000]

                }else {

                    this.speed = 1

                }

            }

        }

        else if (this.type == "r2" && distance.m >= 70) {

            this.speed = 5*game_tick
            this.pos[1] += this.speed

            if (this.pos[1] >= 600) {

                if (this.speed <= 25) {
                        
                    this.speed += 1
                    this.pos = [randint(240, 620), -5200]

                }else {

                    this.speed = 1

                }

            }

        }

        else if (this.type == "r3" && distance.m >= 80) {

            this.speed = 5*game_tick
            this.pos[1] += this.speed

            if (this.pos[1] >= 600) {

                if (this.speed <= 25) {
                        
                    this.speed += 1
                    this.pos = [randint(240, 620), -4800]

                }else {

                    this.speed = 1

                }

            }

        }

        else if (this.type == "y" && distance.m >= 30) {

            if (this.speed <= 0) {

                this.speed = 7*game_tick

            }

            this.pos[0] += this.speed
            this.angle += this.speed

            if (this.pos[0] >= 1000) {

                this.pos = [-1000, randint(40, 460)]

            }

        }

        else if (this.type == "y2" && distance.m >= 40) {

            if (this.speed <= 0) {

                this.speed = 7*game_tick

            }

            this.pos[0] += this.speed
            this.angle += this.speed

            if (this.pos[0] >= 1000) {

                this.pos = [-1000, randint(40, 460)]

            }

        }

        else if (this.type == "y3" && distance.m >= 50) {

            if (this.speed <= 0) {

                this.speed = 7*game_tick

            }

            this.pos[0] += this.speed
            this.angle += this.speed

            if (this.pos[0] >= 1000) {

                this.pos = [-1000, randint(40, 460)]

            }

        }

        else if (this.type == "o" && distance.m >= 100) {

            if (this.speed == 0) {

                this.speed = 1*game_tick

            }

            if (this.pos[0] > 240 && this.pos[0] < 620) {

                this.speed = 4*game_tick

            }else{

                this.speed = 10

            }

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(0, 1000-this.size[0]), -this.size[1]]

            }

        }

        else if (this.type == "o2" && distance.m >= 120) {

            if (this.speed == 0) {

                this.speed = 1*game_tick

            }

            if (this.pos[0] > 240 && this.pos[0] < 620) {

                this.speed = 4*game_tick

            }else{

                this.speed = 10

            }

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(0, 1000-this.size[0]), -this.size[1]]

            }

        }

        else if (this.type == "o3" && distance.m >= 140) {

            if (this.speed == 0) {

                this.speed = 1*game_tick

            }

            if (this.pos[0] > 240 && this.pos[0] < 620) {

                this.speed = 4*game_tick

            }else{

                this.speed = 10*game_tick

            }

            this.pos[1] += this.speed
            
            if (this.pos[1] >= 600) {

                this.pos = [randint(0, 1000-this.size[0]), -this.size[1]]

            }

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
        this.image = null
        this.culdown = 0

        if (this.type == 0) { this.image = power_spr_1 }
        else if (this.type == 1) { this.image = life_heart_spr }

    }

    update() {

        if (this.type == 0) {

            //culdown = 1000

            if (Collision(this, player) && this.render == true) {

                if (ineventario.length <= 3) {

                    ineventario.unshift("vel")

                }

                this.render = false
                
            }

            if (this.culdown > 0 && this.culdown-700 == frame) {
            
                player.vel /= 2
                player.acc /= 2
                distance.wait *= 2
                camera.vely /= 2

            }

            else if (this.culdown > 0 && this.culdown == frame){

                this.render = true

            }

        }

        if (this.type == 1) {

            //culdown = 1000

            if (Collision(this, player) && this.render == true) {

                if (ineventario.length <= 3) {

                    ineventario.unshift("life")

                }

                this.render = false
                
            }

            if (this.culdown > 0 && this.culdown-700 == frame) {
            
                player.life == 100

            }

            else if (this.culdown > 0 && this.culdown == frame){

                this.render = true

            }

        }

    }

    draw() {

        if (this.render) {
             
            draw_image(this.pos, this.size, this.alpha, this.image)

        }

    }
}

let frame = 0
let player
let cars
let camera
let powers
let background = {

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

}

let money = 0
let beter_distance = 0
let cena_id = 1
let skins
let ineventario = []
let pause = false

const cena_1 = {

    id:0,

    create:function() {

        powers = [new power_up([randint(0, 830), randint(0, 880)], [223, 223], 0, true, [1, 0]),
        new power_up([randint(0, 830), randint(0, 880)], [99, 93], 1, true,[1,0])]

        ineventario = []

        distance = { m:0, wait:60*game_tick, waiter:frame+60, color:"white", draw:function() {

            write_text(`M: ${this.m}`, "bold 60px Arial", [430, 80], this.color, 0.8)

            if (frame == this.waiter && !pause) {

                this.waiter = frame + this.wait
                this.m += 1

            }

            if (this.m > beter_distance && !pause) {

                this.color = "yellow"

                beter_distance = this.m

            }
        
        }}

        player = {

            pos:[100, 300],
            size:[50, 80],
            sk_size:[102, 102],
            sk_pos:[90, 280],
            color:"orange",
            alpha:[1,0],
            vel:8000*game_tick,
            velx:0,
            vely:0,
            acc:500*game_tick,
            life:50,
            skin_incator:0,
            waiter:50*game_tick +frame,
            skin:skins_selector.skin_use[2],

            morer:function() {

                camera.vely = 0
                this.vely = 0
                this.alpha[0] = 0

                if (this.life < 0) {this.life = 0}

                console.log(distance.m)

                distance.waiter = 0

                menu.op[2].cansave = true
                menu.op[2].alpha = 1

                write_text("game over", "90px Arial", [320, 270], "red", 1)

                if (keys["Enter"]) {

                    money += distance.m
                    cena_id = 1
                    keys["Enter"] = false

                }

                for (let i = 0; i < cars.length-2; i++) {

                    cars[i].alpha = [0,0]
                        
                }

                //cena_id = 1

            },

            draw:function(active) {

                if (active == true) {

                    draw_cube(this.pos, this.size, this.color, this.alpha[1])
                    draw_image(this.sk_pos, this.sk_size, this.alpha[0], this.skin[this.skin_incator])


                    draw_cube([220, 15], [200, 70], "red", 1, true)
                    draw_cube([220, 15], [this.life*4, 70], "rgb(0, 254, 0)", 1, true)
                    draw_cube([220, 15], [200, 70], "", 1, false, ["black", 2])

                }

            },

            update:function(active) {
                if (active) {

                    if (this.waiter == frame) {

                        if (this.skin_incator == 0) {

                            this.skin_incator = 1

                        }else if (this.skin_incator == 1) {

                            this.skin_incator = 0

                        }

                        this.waiter = 50*game_tick +frame

                    }

                    this.pos[0] += this.velx/1000
                    this.pos[1] += this.vely/1000

                    this.sk_pos = [this.pos[0]-10, this.pos[1]-20]

                    this.pos[0] = Math.max(0, Math.min(this.pos[0], canvas.width - this.size[0]))
                    this.pos[1] = Math.max(0, Math.min(this.pos[1], canvas.height - this.size[1]))

                    this.alpha[0] = 1

                    for (let i = 0; i < cars.length; i++) {
                    
                        if (Collision(this, cars[i])) {

                            this.life--
                            this.alpha[0] = 0.67

                        }

                    }

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

                    if (this.velx > this.vel) { this.velx = this.vel }
 
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

        cars = [new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "g", car_skin_1),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "g2", car_skin_1),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "g3", car_skin_1),
        new car([-100, randint(0, 448)], [100, 100], "red", [1,0], true, "y", car_skin_3),
        new car([-100, randint(0, 448)], [100, 100], "red", [1,0], true, "y2", car_skin_3),
        new car([-100, randint(0, 448)], [100, 100], "red", [1,0], true, "y3", car_skin_3),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "r", car_skin_2),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "r2", car_skin_2),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "r3", car_skin_2),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "o", car_skin_4),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "o2", car_skin_4),
        new car([randint(240, 620), -152], [81, 152], "red", [1,0], true, "o3", car_skin_4),
        ]

        camera = {

            vely:1

        }

    },

    update:function() {

        if (!pause) {

            if (keys["Escape"]) {

                pause = true
                musica_fundo_1.pause()
                keys["Escape"] = false

            }

            player.update(true)

            for (let i = 0; i < powers.length; i++) {

                powers[i].update()

            }

            for (let i = 0; i < cars.length; i++) {

                cars[i].update()
                
            }

            background.update(true)

            if (keys["Enter"] && camera.vely != 0) {

                if (ineventario[0] == "vel") {

                    player.vel *= 2
                    player.acc *= 2
                    distance.wait /= 2
                    camera.vely *= 2
                    powers[0].culdown = frame + 2000

                    ineventario.shift()
                    keys["Enter"] = false

                }
                else if (ineventario[0] == "life") {

                    player.life = 50
                    powers[0].culdown = frame + 2000

                    ineventario.shift()
                    keys["Enter"] = false

                }

            }

        }else{

            if (keys["Escape"]) {

                pause = false
                musica_fundo_1.play()
                keys["Escape"] = false

            }

        }
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
        distance.draw()

        draw_cube([10, 15], [200, 70], "grey", 0.4, true, [6, "black"])
        draw_cube([10, 15], [70, 70], "grey", 0.4, true, [6, "black"])

        for (let i = 0; i < ineventario.length; i++) {
            
            if (ineventario[i] == "vel") {

                if (i==0) {
                
                    draw_image([20+60*i,25], [50,50], 1, power_spr_1)

                }else{

                    draw_image([30+60*i,25], [50,50], 1, power_spr_1)

                }

            }
            else if (ineventario[i] == "life") {

                if (i==0) {
                
                    draw_image([20+60*i,25], [50,50], 1, life_heart_spr)

                }else{

                    draw_image([30+60*i,25], [50,50], 1, life_heart_spr)

                }

            }
            
        }

    }

}

const skins_selector = {

    id:2,
    skins_price:[-2, 100, 260, 340],
    skin_use:[player_skin_1, 0, player_skin_1_w],
    skins:[player_skin_1, player_skin_2, player_skin_3, player_skin_4],
    adx:152,
    ady:172,
    add:0,
    pos:[80, 150],
    coll:0,
    seleced:[0, 1, 3, 1],
    selec_rect:{

        pos:[65, 140],
        size:[122, 162],
        alpha:1,
        color:"chartreuse",
        waiter:null,

        piscar:function() {

            if (this.waiter == null) {

                this.waiter = frame + 67

            }

            if (frame = this.waiter) {

                if (this.alpha == 1) {

                    this.alpha = 0
                    this.waiter = frame + 67

                }else{

                    this.alpha = 1
                    this.waiter = frame + 67

                }
            }

        },

    },

    update:function() {

        if (keys["d"]) {

            if (this.seleced[0] < this.seleced[2]) {

                this.selec_rect.pos[0] += this.adx
                this.seleced[0]++

            }

            keys["d"] = false

        }

        if (keys["a"]) {

            if (this.seleced[0] > 0) {

                this.selec_rect.pos[0] -= this.adx
                this.seleced[0]--

            }

            keys["a"] = false

        }

        if (keys["w"]) {

            if (this.seleced[1] < this.seleced[3]) {

                this.selec_rect.pos[1] -= this.ady
                this.seleced[1]++

            }

            keys["w"] = false

        }

        if (keys["s"]) {

            if (this.seleced[1] > 0) {

                this.selec_rect.pos[1] += this.ady
                this.seleced[1]--

            }

            keys["s"] = false

        }

        if (this.seleced[1] == 0) { this.add = 6 }
        else { this.add = 0 }

        if (keys["Enter"]) {

            if (this.skins_price[this.seleced[0]+this.add] > 0 && money >= this.skins_price[this.seleced[0]+this.add]) {
                
                money -= this.skins_price[this.seleced[0]+this.add]
                this.skins_price[this.seleced[0]+this.add] = -1
                
            }

            else if (this.skins_price[this.seleced[0]+this.add] == -1) {

                for (let i = 0; i < this.skins_price.length; i++) {

                    if (this.skins_price[i] == -2) { this.skins_price[i] = -1 }

                }

                this.skin_use[0] = this.skins[this.seleced[0]+this.add]
                this.skin_use[1] = this.seleced[0]+this.add

                console.log(this.skin_use[1])

                if (this.skin_use[1] == 0) {

                    this.skin_use[2] = player_skin_1_w

                }else if (this.skin_use[1] == 1) {

                    this.skin_use[2] = player_skin_2_w

                }else if (this.skin_use[1] == 2) {

                    this.skin_use[2] = player_skin_3_w

                }else if (this.skin_use[1] == 3) {

                    this.skin_use[2] = player_skin_4_w

                }

                console.log(this.skin_use)
                
                this.skins_price[this.seleced[0]+this.add] = -2
                //this.skin_use[1] = this.seleced[0]+this.add

            }

            keys["Enter"] = false

        }

        if (keys["Escape"]) {

            cena_id = 1
            keys["Escape"] = false

        }

    },

    draw:function() {
        
        background.draw(true)

        for (let i = 0; i < this.skins.length; i++) {

            if (i >= 6) {

                this.coll = 1
                this.pos[0] = 80 + this.adx * (i-6)
                

            }else{

                this.pos[0] = 80 + this.adx * i
                this.coll = 0

            }

            this.pos[1] = 150 + 172 * this.coll
            
            draw_image(this.pos, [102, 102], 1, this.skins[i])
            
            if (this.skins_price[i] == -1) {

                write_text("tem", "40px Arial", [this.pos[0]+10, this.pos[1]+142], "green", 1)

            }else if (this.skins_price[i] == -2) {

                write_text("uso", "40px Arial", [this.pos[0]+10, this.pos[1]+142], "chartreuse", 1)

            }else{

                write_text(this.skins_price[i], "40px Arial", [this.pos[0]+10, this.pos[1]+142], "red", 1)

            }

            write_text(`money: ${money}`, "50px Arial", [400, 50], "green", 0.6)

            draw_cube(this.selec_rect.pos, this.selec_rect.size, this.selec_rect.color, this.selec_rect.alpha, false, ["red", 3])  
            write_text("voltar para o menu(esc)", "25px Arial", [400, 570], "black", 0.6)          

        }

    }

}

const menu = {

    id:1,
    angle:0,
    op:[{

        x:canvas.width/2-60,
        y:370,
        font:"bold 60px Arial",
        text:"jogar",
        color:"red",
        alpha:1,

        active:function() {

            cena_1.create()
            cena_id = 0

        }

    },
    {

        x:canvas.width/2-110,
        y:440,
        font:"bold 60px Arial",
        text:"galinhas",
        color:"white",
        alpha:1,

        active:function() {

            cena_id = 2

        }

    },
    {

        x:canvas.width/2-65,
        y:490,
        font:"bold 60px Arial",
        text:"save",
        color:"white",
        alpha:1,

        active:function() {

            localStorage.setItem("money", money)
            localStorage.setItem("distance", beter_distance)
            localStorage.setItem("skins_player", skins_selector.skin_use[1])
            localStorage.setItem("skins", JSON.stringify(skins_selector.skins_price))
            
        }

    },0],

    update:function() {

        if (keys["w"]) {

            this.op[this.op.length-1]--
            keys["w"] = false

            for (let i = 0; i < this.op.length-1; i++) {
                
                this.op[i].color = "white"
                
            }

        }
        
        if (keys["s"]) {

            this.op[this.op.length-1]++
            keys["s"] = false

            for (let i = 0; i < this.op.length-1; i++) {
                
                this.op[i].color = "white"
                
            }

        }

        this.op[this.op.length-1] = Math.max(0, Math.min(this.op[this.op.length-1], this.op.length-2))

        switch(this.op[this.op.length-1]) {

            case 0:
                this.op[0].color = "red"
            break

            case 1:
                this.op[1].color = "red"
                break

            case 2:
                this.op[2].color = "red"
                break

        }

        if (keys["Enter"]) {

            this.op[this.op[this.op.length-1]].active()
            keys["Enter"] = false

        }

    },

    draw:function() {

        background.draw(true)

        write_text("galinha adventures", "bold 80px Arial", [50, 200], "white", 1)

        for (let i = 0; i < this.op.length; i++) {
             
            write_text(this.op[i].text, this.op[i].font, [this.op[i].x, this.op[i].y], this.op[i].color, this.op[i].alpha)

        }

        draw_image([820, 110], [153, 153], 1, skins_selector.skin_use[0], this.angle)

        this.angle++

    }

}

let save = null

function mainloop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cena_id == cena_1.id) {

        cena_1.draw()
        cena_1.update()

    }else if (cena_id == menu.id) {

        menu.draw()
        menu.update()

    }else if (cena_id == skins_selector.id) {

        skins_selector.draw()
        skins_selector.update()

    }

    if (!pause) {

        frame++

    }

    requestAnimationFrame(mainloop);
}

function iniciar(mode) {

    console.log(mode)

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

        canvas.width = window.innerWidth+150
        canvas.height = window.innerHeight+140

        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`

        game_tick = 0.7

        buttons_satrt()

    }
    try {

        money = Number(localStorage.getItem("money"))
        beter_distance = Number(localStorage.getItem("distance"))

        if (JSON.parse(localStorage.getItem("skins")) != null) {

            skins_selector.skins_price = JSON.parse(localStorage.getItem("skins"))
            console.log(skins_selector.skins_price)

            for (let i = 0; i < skins_selector.skins_price.length; i++) {

                if (skins_selector.skins_price[i] == -2) {

                    skins_selector.skin_use[0] = skins_selector.skins[i]

                }

            }

        }

        if (money == null) { money = 0 }
        if (beter_distance == null) { beter_distance = 0 }

        console.log("save carregado")

    } catch (error) {

        localStorage.setItem("money", money)
        localStorage.setItem("distance", beter_distance)
        localStorage.setItem("skins", JSON.stringify(skins_selector.skins_price))

        console.error(`erro em:\n${error}`)

    }

    //canvas.style.marginTop = "-11vh"
    canvas.style.opacity = 1

    play_game_button.style.width = "0px"
    play_game_button.width = 0
    play_game_button.style.height = "0px"
    play_game_button.height = 0
    play_game_button.style.opacity = 0

    mainloop()
    play_sound(musica_fundo_1, 0.67, 0, true)
    
}
