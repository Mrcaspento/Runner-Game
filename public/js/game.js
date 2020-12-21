/* eslint-disable no-unused-vars */

const { Graphics } = require("pixi.js");

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

let state,
  SquidWardCharacter,
  player,
  dungeon,
  squidward,
  healthBar,
  bgScene,
  squidId,
  plankId,
  plackCoin,
  backgroundId;

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
  SquidWardCharacter.play();
  SquidWardCharacter.position.set(600, 580);
  SquidWardCharacter.vx = 0;
  SquidWardCharacter.vy = 0;
  squidContainer.addChild(SquidWardCharacter);
  //coin
  plackCoin = new Sprite(plankId["plankcoin.png"]);
  plackCoin.x = 1200;
  plackCoin.y = 600;
  bgScene.addChild(plackCoin);

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
}
