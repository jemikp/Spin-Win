let prizes_config = {
    count: 12,
    prizes_name: ["300 Credits","35% OFF","Hard Luck","70% OFF","SwagPack","100% OFF","NetFlix",
    "50% OFF","Amazon Voucher","2 Extra Spin","CB T-Shirt","CB Book"],
}


isSpinning = false;


let config = {
    type: Phaser.CANVAS, //Canvas api to render game on web browser
    width: 1000,
    height: 1000,
    backgroundColor: 0xffcc00,
    
    //scene == level of your game   1.Loading Assets    2.Create assets as objects in the memory    3.Continously update
    
    scene: {
        preload: preload,
        create: create,
        update : update,
    },
    audio: {
        disableWebAudio: true
    }
    
};

let game = new Phaser.Game(config);

function preload(){
    
    this.load.image('background','../Assets/back.jpg'); //.. -> to come out of directory
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('win','../Assets/win4.jpg');
    
    this.load.image('buttonBG', '../Assets/button-bg.png');
    this.load.image('buttonText', '../Assets/button-text.png');
    this.load.spritesheet('button', '../Assets/flixel-button.png', { frameWidth: 80, frameHeight: 20 });
    
    this.load.audio('theme', [
        '../Audio/Paisa hi paisa hoga.ogg',
        '../Audio/Paisa-hi-paisa-hoga.mp3'
    ]);
    
    this.load.audio('utha', [
        '../Audio/UthaLeRe.ogg',
        '../Audio/UthaLeRe.mp3'
    ]);
    
    this.load.image('magnify-out', '../Assets/magnify-glass-outside.png');
    this.load.image('magnify-in', '../Assets/magnify-glass-inside.png');

}
function create(){
    
    
    console.log("create");
    //Create the background image
    W = game.config.width;
    H = game.config.height;
    
    //sprite -> way to create images
    
    background = this.add.sprite(0,0,'background'); //W/2,H/2 -> start coordinates of the image
    background.setPosition(W/2,H/2);
    background.setScale(0.20);   //Shrink H and W by factor of 0.5,Scailing reduces size of image 
    
    //lets create a stand
    let stand = this.add.sprite(W/2,H/2+110,'stand');
    stand.setScale(0.25);
    
    //lets create a pin
    pin = this.add.sprite(W/2,H/2-390,'pin');
    pin.setScale(0.25);
    pin.depth = 1;
    
    //let create a wheel
    this.wheel = this.add.sprite(0,0,'wheel');
    this.wheel.setPosition(W/2,H/2-140);
    this.wheel.setScale(0.25);

    font_style = {
        font: "bold 50px Arial",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(250,10,"Welcome to Spin & Win",font_style);
    font_style_ans = {
        font: "bold 50px Roboto",
        align: "center",
        color: "white",
    }
    
    
    var bg = this.add.image(0, 0, 'buttonBG').setInteractive();
    var text = this.add.image(0, 0, 'buttonText');

    container = this.add.container(100, 300, [ bg, text ]);
    container.depth = 1;
    container.setScale(0.40);

    bg.once('pointerup', spinwheel, this);
    
    var lense = this.make.sprite({
        x: 400,
        y: 300,
        key: 'magnify-in',
        add: false
    });
    
    background.mask = new Phaser.Display.Masks.BitmapMask(this, lense);

    
     
}

//Game Loop
function update(){
    console.log("Inside Update");

}


function spinwheel(){
    console.log("You clicked the mouse");
    console.log("Start Spinning");
    
    let rounds = Phaser.Math.Between(2,4);  //Generates number between 2 and 5
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count)); 
    
    music = this.sound.add('theme');
    music.play();               
    
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut", 
        duration: 6000,
        callbackScope: this,
        onComplete: function(){
            
            utha = this.sound.add('utha');
            utha.play();
            win = this.add.image(W/2,H/2-120, 'win');
            win.setScale(0.50);
            pin.depth = 0;
            container.depth = 0;
            this.ans_text = this.add.text(100,90," ",font_style_ans);
            this.ans_text.setText("Utha le re iss prize ko -> " +prizes_config.prizes_name[idx]);
            
        }
    });
    
                  
    
}
