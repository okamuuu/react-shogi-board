var fs = require('fs');
var { JKFPlayer } = require("json-kifu-format");
var txt = fs.readFileSync('./data/kifu.demo.txt', 'utf8');

var player = JKFPlayer.parseKIF(txt);

// let cnt = 0;
// while(player.forward() && cnt++<1000){
//   console.log(player.getReadableKifu());
// }

player.forward();
console.log(player.shogi.toCSAString());
