//  import * as PIXI from 'pixi.js'

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({
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
let texture = PIXI.utils.TextureCache["../images/squidwardFrame_01.png"];

let squidwardFrames = [
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
]
let squidwardArray = [];

loader
  .add(squidwardFrames)
  .add("../images/plankcoin.json")
  .add("../images/background.json")
  .add("../images/squidward.json")
  .add("../squidwardRest", "images/squidwardFrame_00.png")
  .load(setup);

for (let i = 0; i < squidwardFrames.length; i++) {
  let texture = PIXI.Texture.from(squidwardFrames[i]);
  squidwardArray.push(texture)
}

let state, explorer, player, dungeon, squidward, healthBar, bgScene, squidId, plankId, backgroundId;


function setup() {

bgScene = new Container();
app.stage.addChild(bgScene);

  let squidward = new PIXI.Sprite(PIXI.loader.resources["squidwardRest"].texture)
  //Make the game scene and add it to the stage
  gameScene = new Container();
  squidContainer = new Container();
  app.stage.addChild(gameScene);
  app.stage.addChild(squidContainer);
  app.stage.addChild(squidward);
}
