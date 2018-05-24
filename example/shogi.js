var fs = require('fs');

var { JKFPlayer } = require("json-kifu-format");
var kifu = require('../data/kifu.demo');
var player = JKFPlayer.parse(kifu);

const {Shogi} = require("shogi.js");

console.log(player.kifu.initial);

// const shogi = new Shogi(player.kifu.initial || undefined);
const shogi = new Shogi();

// 初期
// console.log(shogi.board);
// console.log(shogi.hands);
// console.log(shogi.turn);

// ７六歩
let available = shogi.getMovesFrom(7, 7);
shogi.move(7, 7, 7, 6, false);

// ３四歩
available = shogi.getMovesFrom(3, 3);
shogi.move(3, 3, 3, 4, false);
// console.log(shogi.get(3, 4));

// ２二角交換
  // available = shogi.getMovesFrom(8, 8);
  // shogi.move(8, 8, 2, 2, true);

console.log(shogi.get(2, 2));
