var fs = require('fs');

var { JKFPlayer } = require("json-kifu-format");
var kifu = require('../data/kifu.demo');
var player = JKFPlayer.parse(kifu);

const {Shogi} = require("shogi.js");

console.log(player.kifu.initial);

// const shogi = new Shogi(player.kifu.initial || undefined);
const shogi = new Shogi();
console.log(shogi.toSFENString());

// 初期
// console.log(shogi.board);
// console.log(shogi.hands);
// console.log(shogi.turn);

// ７六歩
let available = shogi.getMovesFrom(7, 7);
shogi.move(7, 7, 7, 6, false);
console.log(shogi.toSFENString());

// ３四歩
available = shogi.getMovesFrom(3, 3);
shogi.move(3, 3, 3, 4, false);
console.log(shogi.toSFENString());
// console.log(shogi.get(3, 4));

// ２二角交換
available = shogi.getMovesFrom(8, 8);
shogi.move(8, 8, 2, 2, true);
console.log(shogi.toSFENString());

// 銀で角を取る
shogi.move(3, 1, 2, 2, false);
console.log(shogi.toSFENString());

// 中央に角を drop
shogi.drop(5, 5, 'KA');
console.log(shogi.toSFENString());

// next bestmove is 7g7f
function parseSFENMove(string) {
  const chars = string.split('');
  const table = {
    a: 9,
    b: 8,
    c: 7,
    d: 6,
    e: 5,
    f: 4,
    g: 3,
    h: 2,
    i: 1
  }
  return {
    fromX: chars[0],
    fromY: table[chars[1]],
    toX: chars[2],
    toY: table[chars[3]]
  }
}

console.log(parseSFENMove("7g7f"));
