var fs = require('fs');
var { JKFPlayer } = require("json-kifu-format");
// var kifu = fs.readFileSync('./data/kifu.demo.txt', 'utf8');
var kifu = require('../data/kifu.demo');
var player = JKFPlayer.parse(kifu);

// let cnt = 0;
// while(player.forward() && cnt++<1000){
//   console.log(player.getReadableKifu());
// }

player.forward();
// console.log(player.shogi.board);
console.log(player.getReadableKifu());
// console.log(player.getState().board);
