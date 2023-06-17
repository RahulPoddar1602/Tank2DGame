kaboom({
    width: 1000,
    height: 500,
    font: "sans-serif",
    canvas: document.querySelector("#mycanvas"),
    background: [ 0, 0, 0, ],
    burp:true,
})

// ()=> ({
    loadSprite("tank1up", "assets/player1_tank_up.png")
    loadSprite("tank1down", "assets/player1_tank_down.png")
    loadSprite("tank1left", "assets/player1_tank_left.png")
    loadSprite("tank1right", "assets/player1_tank_right.png")
    loadSprite("tank2up", "assets/player2_tank_up.png")
    loadSprite("tank2down", "assets/player2_tank_down.png")
    loadSprite("tank2left", "assets/player2_tank_left.png")
    loadSprite("tank2right", "assets/player2_tank_right.png")
    loadSprite("breakbrick", "assets/break_brick.jpg")
    loadSprite("solidbrick", "assets/solid_brick.jpg")
    loadSprite("helth", "assets/helth.png")
    loadSprite("Bullet","assets/enemy_bullet.png")
    loadSound("shoot", "assets/laser-gun.mp3")
    loadSound("engine", "assets/engine.mp3")
    loadSound("helth", "assets/helth.mp3")
    loadSound("pang", "assets/bulletPang.mp3")
    loadSound("thud", "assets/thud.mp3")
    loadSound("explosion", "assets/explosion.mp3")
    loadSound("bricks", "assets/brick-falling.mp3")
// })() 
// }

// load()

    let t1=0;
    let t2=1;
    const SPEED = 320
    const BULLET_SPEED = 600
    const breakHealth = 3
    const tank1Health = 10
    const tank2Health = 10
    
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
    
    scene("game", () => {
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
            ])
            else if(q===2)
            add([
                sprite("Bullet"),
                // rect(12, 6),
                area(),
                pos(p),
                anchor("center"),
                color(127, 127, 255),
                outline(4),
                move(RIGHT, BULLET_SPEED),
                offscreen({ destroy: true }),
                "bullet",
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
            ])
        }
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
        on("hurt", "tank2", (e) => {
            shake(1)
            play("thud")
        })
        on("hurt", "tank1", (e) => {
            shake(1)
            play("thud")
        })
        on("death", "tank1", (e) => {
            shake(3)
            play("explosion")
            addKaboom(e.pos)
            alert("game over! Player 2 wins")
        })
        on("death", "tank2", (e) => {
            shake(3)
            play("explosion")
            addKaboom(e.pos)
            alert("game over! Player 1 wins")
        })
        onCollide("helth","tank1",(h,e)=>{
            h.destroy()
            play("helth")
            e.heal(10)
        })
        onCollide("helth","tank2",(h,e)=>{
            e.heal(10)
            play("helth")
            h.destroy()
        })
        onCollide("bullet", "steel", (b, e) => {
            console.log(b)
            destroy(b)
        })
        onCollide("bullet1", "steel", (b, e) => {
            destroy(b)
        })
        onCollide("bullet", "Iron", (b, e) => {
            play("pang")
            destroy(b)
        })
        onCollide("bullet1", "Iron", (b, e) => {
            play("pang")
            destroy(b)
        })
        onKeyPress("space", () => {
            spawnBullet(player1.pos.sub(0, 0),t1)
            // burp()
            play("shoot", {
                volume: 0.3,
                detune: rand(-1200, 1200),
            })
        })
        onKeyPress("k", () => {
            spawnBullet1(player2.pos.sub(0, 0),t2)
        })
        
       
          
    })
    
    function start() {
        // Start with the "game" scene, with initial parameters
        go("game")
    }
    
    start()