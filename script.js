kaboom({
    width: 1000,
    height: 500,
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 0, ],
    burp:true,
})

// ()=> ({ 
const loadData = async ()=>{
    await loadSprite("tank1up", "assets/player1_tank_up.png")
    await loadSprite("tank1down", "assets/player1_tank_down.png")
    await loadSprite("tank1left", "assets/player1_tank_left.png")
    await loadSprite("tank1right", "assets/player1_tank_right.png")
    await loadSprite("tank2up", "assets/player2_tank_up.png")
    await loadSprite("tank2down", "assets/player2_tank_down.png")
    await loadSprite("tank2left", "assets/player2_tank_left.png")
    await loadSprite("tank2right", "assets/player2_tank_right.png")
    await loadSprite("breakbrick", "assets/break_brick.jpg")
    await loadSprite("solidbrick", "assets/solid_brick.jpg")
    await loadSprite("helth", "assets/helth.png")
    await loadSprite("Bullet","assets/enemy_bullet.png")
    await loadSound("shoot", "assets/laser-gun.mp3")
    await loadSound("engine", "assets/engine.mp3")
    await loadSound("helth", "assets/helth.mp3")
    await loadSound("pang", "assets/bulletPang.mp3")
    await loadSound("thud", "assets/thud.mp3")
    await loadSound("explosion", "assets/explosion.mp3")
    await loadSound("bricks", "assets/brick-falling.mp3")
}
loadData().then(()=>{
    start()
})
//win scene
scene("win", ({ winner }) => {

    burp()
	add([
		text("Winner is "+ winner ),
		anchor("center"),
		pos(width() / 2, height() / 2),
	])
	add([
		text("Press Enter to play again"),
		anchor("center"),
		pos(width() / 2, height()-50),
	])
    onKeyDown("enter",()=>{
        
        start();
    })
    // wait(10,go("game"))

})
//game scene
scene("game", () => {
        let t1=0;
        let t2=1;
        const SPEED = 320
        const BULLET_SPEED = 600
        const breakHealth = 3
        const tank1Health = 20
        const tank2Health = 20
        
        const LEVELS = 
        [
            "=====================",
            "=   =  =+@  @  =   =",
            "=   =@@@@@@ @  =   =",
            "=    @   @# @@@@@@@=",
            "=    #   =@ @      =",
            "=    @   @= #      =",
            "=@@@@@@@ #@ @      =",
            "=   =  @ @@@@@@=   =",
            "=   =  @  @+=  =   =",
            "=====================",
        ]
        const level = addLevel(LEVELS, {
            tileWidth: 50,
            tileHeight: 50,
            pos: vec2(0, 0),
            tiles: {
                "@": () => [
                    sprite("breakbrick"),
                    area(),
                    body({isStatic:true}),
                    health(breakHealth),
                    "break"
                ],
                "+": () => [
                    sprite("helth"),
                    area(),
                    body({isStatic:true}),
                    health(breakHealth),
                    "helth"
                ],
                "#": () => [
                    rect(50,50),
                    area(),
                    body({mass:10}),
                    color(192,192,192),
                    "Iron"
                ],
                "=": () => [
                    sprite("solidbrick"),
                    area(),
                    body({ isStatic: true }),
                    "steel"
                ],
                
            },
        })
        let isSpacePressed = false;
        const player1 = add([
            sprite("tank1down"),
            pos(100, 80),
            rotate(0),
            area(),
            body(),
            health(tank1Health),
            anchor("center"),
            "tank1"
        ])
        const player2 = add([
            sprite("tank2up"),   
            pos(width()-120,height()-80),     
            body(),
            area(),
            rotate(0),        
            anchor("center"), 
            health(tank2Health),
            "tank2"
        ])
        // player 1 movement
        onKeyDown("left", () => {
            player1.use(sprite('tank1left'))
            player1.move(-SPEED, 0)
            t1=3
        })
        onKeyDown("right", () => {
            player1.use(sprite('tank1right'))
            player1.move(SPEED, 0)
            t1=2
        })
        onKeyDown("up", () => {
            player1.use(sprite('tank1up'))
            player1.move(0, -SPEED)
            t1=1
        })      
        onKeyDown("down", () => {
            player1.use(sprite('tank1down'))
            player1.move(0, SPEED)
            t1=0
        })
        // player 2 movement
        onKeyDown("a", () => {
            player2.use(sprite('tank2left'))
            player2.move(-SPEED, 0)
            t2=3
        })
        onKeyDown("d", () => {
            player2.use(sprite('tank2right'))
            player2.move(SPEED, 0)
            t2=2        
        })
        onKeyDown("w", () => {
            player2.use(sprite('tank2up'))
            player2.move(0, -SPEED)
            t2=1
        })
        onKeyDown("s", () => {
            player2.use(sprite('tank2down'))
            player2.move(0, SPEED)
            t2=0
        })
        //player 1 bullet
        function spawnBullet(p,q) {
            if(q===0)
            add([
                sprite("Bullet"),
                // rect(6, 12),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(DOWN, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
                {
                    dir:1,
                }
            
            ])
            else if(q===1)
            add([
                sprite("Bullet"),
                // rect(6, 12),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(UP, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
                {
                    dir:1,
                }
            ])
            else if(q===2)
            add([
                sprite("Bullet"),
                // rect(12, 6),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(RIGHT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
                {
                    dir:1,
                }
            ])
            else
            add([
                sprite("Bullet"),
                // rect(12, 6),
                area(),
                body(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(LEFT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
                {
                    dir:1,
                }
            ])
        }
        //player 2 bullet
        function spawnBullet1(p,q) {
            if(q===0)
            add([
                sprite("Bullet"),
                // rect(6, 12),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(DOWN, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else if(q===1)
            add([
                sprite("Bullet"),
                // rect(6, 12),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(UP, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else if(q===2)
            add([
                // rect(12, 6),
                sprite("Bullet"),
                area(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(RIGHT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
            else
            add([
                // rect(12, 6),
                sprite("Bullet"),
                area(),
                body(),
                pos(p),
                anchor("center"),
                // color(127, 127, 255),
                // outline(4),
                move(LEFT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet1",
            ])
        }
        //bullet collision with bricks
        onCollide("bullet", "break", (b, e) => {
            e.hurt(1)
            if(e.hp()==0)
            {
                destroy(e);
                play("bricks")
            }
            console.log(e.hp())
            destroy(b)
        })
        onCollide("bullet1", "break", (b, e) => {
            e.hurt(1)
            if(e.hp()==0){
                destroy(e);
                play("bricks")
            }
            console.log(e.hp())
            destroy(b)
        })
        //bullet collision with tanks
        onCollide("bullet", "tank2", (b, e) => {
            e.hurt(1)
            if(e.hp()==0)
            destroy(e);
            console.log(e.hp())
            destroy(b)
        })
        onCollide("bullet1", "tank1", (b, e) => {
            e.hurt(1)
            if(e.hp()==0)
            destroy(e);
            console.log(e.hp())
            destroy(b)
        })
        //tanks when hurt
        on("hurt", "tank2", (e) => {
            shake(1)
            play("thud")
        })
        on("hurt", "tank1", (e) => {
            shake(1)
            play("thud")
        })
        //tanks on death
        on("death", "tank1", (e) => {
            shake(3)
            play("explosion")
            addKaboom(e.pos)
            // alert("game over! Player 2 wins")
        })
        on("death", "tank2",(e) => {
            shake(3)
            play("explosion")
            addKaboom(e.pos)
            // alert("game over! Player 1 wins")
        })
        //tanks collision
        onCollide("tank1","tank2",()=>{
            play("thud")
            shake(2)
        })
        //tanks powerup
        onCollide("helth","tank1",(h,e)=>{
            e.heal(20-e.hp())
            play("helth")
            h.destroy()
        })
        onCollide("helth","tank2",(h,e)=>{
            e.heal(20-e.hp())
            play("helth")
            h.destroy()
        })
        //bullet on white bricks
        onCollide("bullet", "steel", (b, e) => {
            console.log(b)
            destroy(b)
        })
        onCollide("bullet1", "steel", (b, e) => {
            destroy(b)
        })
        //bullet on steel
        onCollide("bullet", "Iron", (b, e) => {
            // b.dir=-1;
            // b.move(BULLET_SPEED*b.dir,0)
            play("pang")
            destroy(b)
        })
        onCollide("bullet1", "Iron", (b, e) => {
            play("pang")
            destroy(b)
        })
        //player1 shooting
        onKeyPress("space", () => {
            spawnBullet(player1.pos.sub(0, 0),t1)
            // burp()
            play("shoot", {
                volume: 0.3,
                detune: rand(-1200, 1200),
            })
        })
        //player2 shooting
        onKeyPress("k", () => {
            spawnBullet1(player2.pos.sub(0, 0),t2)
            play("shoot", {
                volume: 0.3,
                detune: rand(-1200, 1200),
            })
        })
        //Healthbars
        const healthbar = add([
            rect(width()/2, 20),
            pos(0, 0),
            color(107, 201, 108),
            fixed(),
            {
                max: 20,
                set(hp) {
                    this.width = width()/2 * hp / this.max
                    this.flash = true
                },
            },
        ])
        const healthbar2 = add([
            rect(width()/2, 20),
            pos(width()/2, 0),
            color(107, 201, 108),
            fixed(),
            {
                max: 20,
                set(hp) {
                    this.width = width()/2 * hp / this.max
                    this.flash = true
                },
            },
        ])
        //hurt and heal
        player1.onHurt(() => {
            healthbar.set(player1.hp())
        })
        player1.onHeal(() => {
            healthbar.set(20)
        })
        player2.onHeal(() => {
            healthbar2.set(20)
        })
        player2.onHurt(() => {
            healthbar2.set(player2.hp())
        })
        //healthbar update
        healthbar.onUpdate(() => {
            if (healthbar.flash) {
                healthbar.color = rgb(255, 255, 255)
                healthbar.flash = false
            } else {
                healthbar.color = rgb(127, 255, 127)
            }
        })
        healthbar2.onUpdate(() => {
            if (healthbar2.flash) {
                healthbar2.color = rgb(255, 0, 0)
                healthbar2.flash = false
            } else {
                healthbar2.color = rgb(255, 120, 127)
            }
        })
        //after death
            player1.onDeath(() => {
            wait(3,go("win", { winner: "tank2" ,}))
            })
            player2.onDeath(() => {
                wait(3,go("win", {winner: "tank1" }))
            })
})
//start function
function start() {
        // Start with the "game" scene, with initial parameters
        go("game")
}