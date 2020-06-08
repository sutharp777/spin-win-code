
var config = {
    // type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload()
{
    // console.log(this);
    this.load.image('background',"./Assets/back.jpg");
    this.load.image('wheel',"./Assets/wheel.png");
    this.load.image('stand',"./Assets/stand.png");
    this.load.image('pin',"./Assets/pin.png");

    // console.log("In preload");
}

function create ()
{
    let W = game.config.width;
    let H = game.config.height;
    let back = this.add.sprite(W/2, H/2,'background');
    this.back = back.setScale(0.25);

    let wheel = this.add.sprite(W/2, H/2,'wheel');
    this.wheel = wheel.setScale(0.25);

    let pin = this.add.sprite(W/2, 20,'pin');
    this.pin = pin.setScale(0.25);
    
    let stand = this.add.sprite(W/2, H-20,'stand');
    this.stand = stand.setScale(0.20);
    back.depth = -2;
    stand.depth=-1;
    // console.log("In create");
    this.input.on("pointerdown",spinwheel, this);
}
j=0;
i = 0.0001;
deg = 1
function update ()
{
    // if(Math.round(101*Math.random())%2)
        // this.wheel.angle += 1;
    // else
        // this.back.angle -= 0.03;
        // this.wheel.angle += deg;
        // this.wheel.setScale(0.25+j);
        // j += i;
        // if(j>0.03 || j<0)
        //     i = -i;
    // console.log("In update");
}
function spinwheel(){
    console.log("time to spin the wheel");
    let rounds = Phaser.Math.Between(2,4); 
    let extra_deg = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_deg; 
    this.wheel.angle+=1300;
    let tweens = this.tweens.add({
        targets:this.wheel,
        // alpha: 0.1
        ease:"Cubic.easeOut",
        angle:total_angle,
        duration:6000
    });
}