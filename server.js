const express = require('express');
const moment = require('moment');
const qs = require('qs');
const axios = require('axios');

const app = express();

// TODO: 一瞬お借りします!!
// const url = "https://17xn1ovxga.execute-api.ap-northeast-1.amazonaws.com/production/gikou";
//  __?byoyomi=1&position="lnsgkg1nl/1r5s1/pppppp1pp/6p2/4B4/2P6/PP1PPPPPP/7R1/LNSGKGSNL w b 1"

function getBestMove(sfen) {

  // posigion は typo ?
  const q = qs.stringify({
    byoyomi: 1,
    // posigion: sfen
    position: `sfen ${sfen}`
  });

  return axios.get(`${url}?${q}`).catch(console.error);
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")
  next()
});

app.get('/api/gikou', async function (req, res) {
  const result = await getBestMove(req.query.sfen);
  const data = result.data;
  res.json(data);
});

app.listen(9000, function () {
  console.log('Example app listening on port 9000!');
});

