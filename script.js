
var config = {
    // type: Phaser.AUTO,
    width: 900,
    height: 600,
    backgroundColor:0xffffff,
    scene: {
        preload: preload,
        create: create,
        update: update
    }

};

var game = new Phaser.Game(config);

function preload()
{
    this.load.image('light',"./Assets/light.png");
    this.load.image('background',"./Assets/back.jpg");
    this.load.image('stand',"./Assets/stand.png");
    this.load.image('wheel',"./Assets/wheel.png");
    this.load.image('pin',"./Assets/pin.png");
    this.load.image('button',"./Assets/button.png");
    this.load.image('cover',"./Assets/cover.png");
}

function create ()
{

    let x = 230
    let W = game.config.width;
    let H = game.config.height;



    let back = this.add.sprite(W/2+x, H/2+50,'background');
    this.back = back.setScale(0.30);

    let wheel = this.add.sprite(W/2+x, H/2+50,'wheel');
    this.wheel = wheel.setScale(0.15);

    let pin = this.add.sprite(W/2+x, 190,'pin');
    this.pin = pin.setScale(0.20);
    
    let stand = this.add.sprite(W/2+x, H-90,'stand');
    this.stand = stand.setScale(0.20);

    let light = this.add.sprite(W/2, H/2+50,'light');
    this.light = light.setScale(1.2);

    back.depth = -2;
    stand.depth=-1;

    let cover = this.add.sprite(204, H-102,'cover');
    this.cover = cover.setScale(.71);

    let button = this.add.sprite(200, H-100,'button').setInteractive();
    this.button = button.setScale(.21);
    
    // button.on("pointerdown",spinwheel, this);
    ref = this;

    button.on('pointerdown', function (pointer) {

        this.setTint(0xff00ff);
        spinwheel(ref);
    });

    button.on('pointerout', function (pointer) {

        this.clearTint();

    });

    button.on('pointerup', function (pointer) {

        this.clearTint();

    });

    let tweens0 = this.tweens.add({
        targets: this.back,
        alpha: .4,
        ease:"Cubic.easeOut",
        dealy:1
    });

}

function update ()
{

}

function spinwheel(ref){
    console.log("time to spin the wheel");
    let rounds = Phaser.Math.Between(2,4); 

    let extra_deg = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_deg; 
    ref.wheel.angle+=1300;

    let tweens = ref.tweens.add({
        targets: ref.wheel,
        ease:"Cubic.easeOut",
        angle:total_angle,
        duration:6000
    });


    let tweens3 = ref.tweens.add({
        targets: ref.back,
        ease:"Cubic.easeOut",
        dealy:1,
        angle: -total_angle,
        duration:7000
    });

}
