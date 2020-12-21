/* eslint-disable no-unused-vars */

const { Graphics } = require("pixi.js");
const { contained } = require("sequelize/types/lib/operators");

/* eslint-disable prefer-const */
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  // eslint-disable-next-line no-unused-vars
  TextStyle = PIXI.TextStyle;

//Create a Pixi Application
const app = new Application({
  width: 10880,
  height: 770,
  antialiasing: true,
  transparent: false,
  resolution: 1,
  forceCanvas: true
});

document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

PIXI.utils.TextureCache["../images/squidwardFrame_01.png"];
const texture = PIXI.utils.TextureCache["../images/squidwardFrame_01.png"];

const squidwardFrames = [
  "../images/squidwardFrame_01.png",
  "../images/squidwardFrame_02.png",
  "../images/squidwardFrame_03.png",
  "../images/squidwardFrame_04.png",
  "../images/squidwardFrame_05.png",
  "../images/squidwardFrame_06.png",
  "../images/squidwardFrame_07.png",
  "../images/squidwardFrame_08.png",
  "../images/squidwardFrame_09.png",
  "../images/squidwardFrame_10.png"
];
const squidwardArray = [];

loader
  .add(squidwardFrames)
  .add("../images/plankcoin.json")
  .add("../images/background.json")
  .add("../images/squidward.json")
  .add("../squidwardRest", "images/squidwardFrame_00.png")
  .load(setup);

for (let i = 0; i < squidwardFrames.length; i++) {
  const texture = PIXI.Texture.from(squidwardFrames[i]);
  squidwardArray.push(texture);
}

let stateGame,
  SquidWardCharacter,
  player,
  style,
  squidward,
  healthBar,
  bgScene,
  squidId,
  plankId,
  plackCoin,
  backgroundId,
  gameOver;

function setup() {
  bgScene = new Container();
  app.stage.addChild(bgScene);

  const squidward = new PIXI.Sprite(
    PIXI.loader.resources.squidwardRest.texture
  );
  //Make the game scene and add it to the stage
  gameScene = new Container();
  squidContainer = new Container();
  app.stage.addChild(gameScene);
  app.stage.addChild(squidContainer);
  app.stage.addChild(squidward);

  //animation
  const animateSquid = new PIXI.AnimatedSprite(
    squidwardFrame["squidwardFrame_11.png"]
  );
  animateSquid.animationSpeed = 0.167;
  animateSquid.updateAnchor = true; // update anchor for each animation frame
  animateSquid.play();
  app.stage.addChild(squidwardFrame);

  //SquidWard
  SquidWardCharacter = new Sprite(squidwardFrame);
  SquidWardCharacter.animationSpeed = 0.167;
  SquidWardCharacter.vx = 0;
  SquidWardCharacter.vy = 0;
  SquidWardCharacter.play();
  SquidWardCharacter.position.set(600, 580);
  squidContainer.addChild(SquidWardCharacter);
  //coin
  plackCoin = new Sprite(plankId["plankcoin.png"]);
  plackCoin.x = 1200;
  plackCoin.y = 600;
  bgScene.addChild(plackCoin);
  //gameover
  gameOver = new Container();
  app.stage.addChild(gameOver);
  gameOver.visible = false;
  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 69,
    fill: "blue"
  });
  message = new Text("GeT wReCkEd!", style);
  message.x = 130;
  message.y = app.stage.height / 2 - 69;
  gameOver.addChild(message);

  //health
  healthBar = new Container();
  healthBar.position.set(170, 4);
  squidContainer.addChild(healthBar);

  let outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);
  healthBar.outer = outerBar;

  let innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  //keyborad arrow keys
  let left = keyboard(37),
    right = keyboard(39);

  left.press = function() {
    bgScene.x += 25;
    SquidWardCharacter.vy = 0;
    SquidWardCharacter.scale.x = 1;
  };
  left.release = function() {
    if (!right.isDown && SquidWardCharacter.vy === 0) {
      SquidWardCharacter.vx = 0;
    }
  };
  right.press = function() {
    SquidWardCharacter.scale.x = -1;
    bgScene.x += 25;
    SquidWardCharacter.vy = 0;
    SquidWardCharacter.play();
  };
  right.release = function() {
    if (!left.isDown && SquidWardCharacter.vy === 0) {
      SquidWardCharacter.vx = 0;
    }
  };
  stateGame = play;
  app.ticker.speed = 0.2;
  app.ticker.add(delta => squidLoop(delta));
}
function fin() {
  gameOver.visible = true;
  bgScene.visible = false;
}
function play(delta) {
  SquidWardCharacter.x += SquidWardCharacter.vx;
  SquidWardCharacter.y += SquidWardCharacter.vy;
  contained(SquidWardCharacter, { x: 28, y: 10, width: 10880, height: 768 });
  //
  let squidHitIt = false;

  if (squidHitIt) {
    SquidWardCharacter.alpha = 0.25;
    healthBar.outer.width -= 1;
  } else {
    SquidWardCharacter.alpha = 1;
  }
  if (healthBar.outer.width < 0) {
    stateGame = fin;
    message.text = "GeT wReCkEd!";
  }
  if (hitTestRectangle(SquidWardCharacter, plankCoin)) {
    plankCoin.x = SquidWardCharacter.x + 8;
    plackCoin.y = SquidWardCharacter.y + 8;
  }
}

//its a keyboard helper function
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
    }
  };
  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) {
        key.release();
      }
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function squidLoop(delta) {
  stateGame(delta);
}
