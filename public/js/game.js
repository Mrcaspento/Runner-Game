/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */

/* eslint-disable prefer-const */
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
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
//Global vars
let stateGame;
let SquidWardCharacter;
let squidwardFrame;
let squidward;
let squidId;
let squidWardtexture;
let bobId;
let scoringBox;
let scoreWord;
let style;
let healthBar;
let bgScene;
let plankId;
let plankCoin;
let backgroundId;
let gameOver;
let enemies;
let message;
let id;
let altId;
let corna;

document.body.appendChild(app.view);
app.renderer.autoResize = true;
app.renderer.resize(10880, 768);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

loader
  .add("images/squidward.json")
  .add("images/plankcoin.json")
  .add("images/background.json")
  .add("images/corona.json")
  .add("images/bob.json")
  .load(setup);

function setup() {
  //setting the stage
  bgScene = new Container();
  squidContainer = new Container();
  // bgScene = PIXI.Sprite.from("images/background.png");

  app.stage.addChild(bgScene);
  app.stage.addChild(squidContainer);

  //atlas id's
  squidId = resources["images/squidward.json"].textures;
  bobId = resources["images/bob.json"].textures;
  plankId = resources["images/plankcoin.json"].textures;
  backgroundId = resources["images/background.json"].textures;
  coronaId = resources["images/corona.json"].textures;
  bikiniBottom = new Sprite(backgroundId["background"]);

  bgScene.addChild(bikiniBottom);

  squidward = new Sprite(squidId["squidwardFrame_11.png"]);
  squidward.position.set(60, 580);
  squidward.anchor.set(0.5, 0);
  squidward.vx = 0;
  squidward.scale.x = -1;
  squidContainer.addChild(squidward);

  plankCoin = new Sprite(plankId["plankcoin.png"]);
  plankCoin.x = 1600;
  plankCoin.y = 600;
  bgScene.addChild(plankCoin);

  let numberOfCoronas = 18,
    spacing = 80,
    xOffset = 150,
    speed = 5,
    direction = -1;
  coronas = [];
  for (let i = 0; i < numberOfCoronas; i++) {
    let corona = new Sprite(coronaId["corona"]);
    let x = spacing * i + xOffset;
    let y = randomInt(0, app.stage.height - corona.height);
    corona.x = x;
    corona.y = y;
    corona.vy = speed * direction;
    direction *= -1;
    coronas.push(corona);
    bgScene.addChild(corona);
  }
  //uses PIXI.js to draw a shape(rectangle) and we assign it a color
  healthBar = new Container();
  healthBar.position.set(170, 4);
  squidContainer.addChild(healthBar);
  let innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 5, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);
  //the black bar the innerbar lays in
  let outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);
  healthBar.outer = outerBar;

  gameOverScene = new Container();
  winnerPic = new Sprite(bobId["bob"]);
  winnerPic.x = 550;
  winnerPic.y = 450;
  gameOverScene.addChild(winnerPic);
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;
  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
  message = new Text("The End!", style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  let left = keyboard(37);
  let right = keyboard(39);
  left.press = function() {
    squidward.vx = -5;
    squidward.vy = 0;
    squidward.scale.x = 1;
  };
  left.release = function() {
    if (!right.isDown && squidward.vy === 0) {
      squidward.vx = 0;
    }
  };
  right.press = function() {
    squidward.vx = 5;
    squidward.vy = 0;
    squidward.scale.x = -1;
  };
  right.release = function() {
    if (!left.isDown && squidward.vy === 0) {
      squidward.vx = 0;
    }
  };

  state = play;
  app.ticker.speed = 0.2;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
  scoringBox = new Container();
  let scoreBox = new Graphics();
  scoreBox.drawRect(100, 5, 60, 60);
  let scoreStyle = new TextStyle({
    fontFamily: "Futura",
    fontSize: 40,
    fill: "red"
  });
  //display score
  currentScore = new Text(healthBar.outer.width, scoreStyle);
  currentScore.x = 100;
  currentScore.y = 15;

  scoreBox.addChild(currentScore);
  squidContainer.addChild(scoreBox);

  let scoreWord = new Text("Score", scoreStyle);
  scoreWord.x = 7;
  scoreWord.y = 15;
  squidContainer.addChild(scoreWord);
}

function play(delta) {
  squidward.x += squidward.vx;

  contain(squidward, { x: 28, y: 10, width: 1800, height: 768 });
  let squidwardHit = false;

  coronas.forEach(function(corona) {
    corona.y += corona.vy;
    let coronaHitsWall = contain(corona, {
      x: 28,
      y: 10,
      width: 3000,
      height: 700
    });
    if (coronaHitsWall === "top" || coronaHitsWall === "bottom") {
      corona.vy *= -1.05;
    }
    if (hitTestRectangle(squidward, corona)) {
      squidwardHit = true;
    }
  });
  if (squidwardHit) {
    squidward.alpha = 0.5;
    healthBar.outer.width -= 1;
  } else {
    squidward.alpha = 1;
  }
  if (hitTestRectangle(squidward, plankCoin)) {
    plankCoin.x = squidward.x + 8;
    plankCoin.y = squidward.y + 8;
  }
  if (healthBar.outer.width < 0.5) {
    state = end;
    message.text = "You lost!";
  }
  if (hitTestRectangle(squidward, plankCoin)) {
    state = end;

    message.text = "You won with a score of " + healthBar.outer.width + "!";
  }
}

function end() {
  bgScene.visible = false;
  squidContainer.visible = false;
  gameOverScene.visible = true;
}
//For Testing and framework like JEST
function contain(sprite, container) {
  let collision = undefined;
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }
  return collision;
}
//PIXI.js test for collisons like using JEST
function hitTestRectangle(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }
  return hit;
}
//for the cornavirus gen
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) {
        key.press();
      }
      key.isDown = true;
      key.isUp = false;
    }
  };
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
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}
