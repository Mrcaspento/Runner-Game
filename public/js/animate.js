// /* eslint-disable prefer-const */
// /* eslint-disable no-unused-vars */
// //Create a Pixi Application

// let player;
// const keys = {};
// let keysDiv;
// const playerSheet = {};

//  let app = new PIXI.Application({width: 2000, height: 1000});
//   document.body.appendChild(app.view);

// app.loader.add("squidward", "./images/squidwardWalk.png");
// app.loader.load(doneLoading);

// function doneLoading(e) {
//   createPlayerSheet();
//   createPlayer();
//   app.ticker.add(gameLoop);
// }
// function createPlayerSheet() {
//   const ssheet = new PIXI.BaseTexture.from(app.loader.resources["squidward"].url);
//   playerSheet["standingStill"] = [
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(805, 4, 50, 111))
//   ];
//   playerSheet["walkingEast"] = [
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(3, 6, 81, 110)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(94, 8, 82, 108)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(186, 2, 80, 115)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(273, 2, 62, 117)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(352, 7, 46, 106)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(408, 5, 75, 110)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(500, 10, 74, 106)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(592, 2, 58, 115)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(668, 6, 50, 112)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(727, 2, 68, 113))
//   ];
//   playerSheet["walkingWest"] = [
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-3, -6, 81, 110)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-94, -8, 82, 108)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-186, -2, 80, 115)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-273, -2, 62, 117)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-352, -7, 46, 106)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-408, -5, 75, 110)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-500, -10, 74, 106)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-592, -2, 58, 115)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-668, -6, 50, 112)),
//     new PIXI.Texture(ssheet, new PIXI.Rectangle(-727, -2, 68, 113))
//   ];
// }

// function createPlayer() {
//   player = new PIXI.AnimatedSprite(playerSheet.standingStill);
//   player.anchor.set(0.5);
//   player.animationSpeed = 0.5;
//   player.loop = false;
//   player.x = app.view.width / 2;
//   player.y = app.view.height / 2;
//   app.stage.addChild(player);
//   player.play();
// }

// function keysUp(e) {
//   keys[e.keyCode] = false;
// }
// function keysDown(e) {
//   console.log(e.keycode);
//   keys[e.keycode] = true;
// }
// function gameLoop() {
//   keysDiv.innerHTML = JSON.stringify(keys);
//   if (keys["37"]) {
//     if (!player.playing) {
//       player.textures = playerSheet.walkingEast;
//       player.play();
//     }
//     player.x -= speed;
//   }
//   if (keys["39"]) {
//     if (!player.playing) {
//       player.textures = playerSheet.walkingWest;
//       player.play();
//     }
//     player.x -= speed;
//   }
// }
