var prizes_config = {
    count:12,
    prize_names : ["3000 Credits", "35% Off", "Hard Luck", "70% OFF", "Swagpack", "100% OFF", "Netflix Subscription", "50% Off", "Amazon Voucher", "2 Extra Spin", "CB Tshirt", "CB Book" ]
};


var config = {
    width: 900,
    height: 600,
    type: Phaser.AUTO,
    backgroundColor:0xffffff,
    pixleArt:true,
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
    this.load.image('button',"./Assets/btn.png");
    this.load.image('gift',"./Assets/gifts.png");
    this.load.image('title',"./Assets/spin-n-win.png");
    this.load.audio('spining',["./Assets/sound/spining.ogg", "./Assets/sound/spining.ogg"]);
}

function create ()
{

    let x = 235
    let W = game.config.width;
    let H = game.config.height;

    font_style = {
        font : "bold 40px Arial",
        align : "center",
        // border: "black",
        color : "black"
    }
    // this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    this.game_text = this.add.text(100,161,"Welcome to Spin & Win",font_style);
    this.game_text.depth = 10;

    this.spining = this.sound.add('spining');

    let back = this.add.sprite(W/2+x, H/2+50,'background');
    this.back = back.setScale(0.33);

    let wheel = this.add.sprite(W/2+x, H/2+50,'wheel');
    this.wheel = wheel.setScale(0.15);

    let pin = this.add.sprite(W/2+x, 190,'pin');
    this.pin = pin.setScale(0.20);
    
    let stand = this.add.sprite(W/2+x, H-90,'stand');
    this.stand = stand.setScale(0.20);

    let light = this.add.sprite(W/2, H/2+50,'light');
    this.light = light.setScale(1.2);
    this.light.scaleX = 1.35;

    back.depth = -2;
    stand.depth=-1;

    let gift = this.add.sprite(300, H/2,'gift').setInteractive();
    this.gift = gift.setScale(.30);

    let title = this.add.sprite(300, H/2,'title');
    this.title = title.setScale(.20);


    let button = this.add.sprite(200, H-100,'button').setInteractive();
    this.button = button.setScale(.91);

    // this.game_text.setVisible(true);

    gift.setVisible(false);
    ref = this;
    ref.stateOfWheel = 'rest';

    gift.on('pointerdown', function (pointer){
        gift.setTint(0xffffff);
        game_text.setText("Welcome to Spin & Win");
        // button.setInteractive();
        // button.setVisible(true);
        title.setVisible(true);
        gift.setVisible(false);
        // game_text.setVisible(false);

    });

    button.on('pointerdown', function (pointer){

        this.setTint(0xff00ff);
        if(ref.stateOfWheel=='rest'){
            ref.stateOfWheel = 'move';
            spinwheel(ref);
        }

    });

    button.on('pointerout', function (pointer) {
        this.clearTint();
    });

    button.on('pointerup', function (pointer) {
        this.clearTint();
    });


}

function reset(){
    ref.title.setVisible(false);
    ref.gift.setVisible(true);
    ref.stateOfWheel = 'rest';
    ref.spining.pause();

    ref.game_text.setText("You Got " + prizes_config.prize_names[ref.idx]);
    ref.game_text.setVisible(true);

}

function update ()
{
}

function spinwheel(ref){

    console.log("time to spin the wheel");
    let rounds = Phaser.Math.Between(2,4); 

    let extra_deg = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + extra_deg; 
    ref.wheel.angle += 1300;

    ref.spining.play();

    ref.idx = prizes_config.count - 1 - Math.floor(total_angle%360 / (30));

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

    ref.time.addEvent({
        delay: 8000,
        callbackScope: ref,
        callback: reset
    });

}