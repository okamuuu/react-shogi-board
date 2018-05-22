var fs = require('fs');
var { JKFPlayer } = require("json-kifu-format");
// var kifu = fs.readFileSync('./data/kifu.demo.txt', 'utf8');
var kifu = require('../data/kifu.demo');
var player = JKFPlayer.parse(kifu);

let cnt = 0;
while(player.forward() && cnt++<30){
  console.log(player.getReadableKifu());
}

console.log(player.getState());
