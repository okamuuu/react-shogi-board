import React, { Component } from 'react';
import { EventEmitter } from "events";
import axios from 'axios';
import qs from 'qs';

import Game from './Game';

// const url = "http://localhost:9000"
const url = "https://t3ayycpoqg.execute-api.ap-northeast-1.amazonaws.com/dev/";
//  __?byoyomi=1&position="lnsgkg1nl/1r5s1/pppppp1pp/6p2/4B4/2P6/PP1PPPPPP/7R1/LNSGKGSNL w b 1"

function getBestMove(sfen) {

  const q = qs.stringify({
    byoyomi: 1,
    sfen: `sfen ${sfen}`
  });

  return axios.get(`${url}/api/gikou?${q}`).catch(console.error);
}

function warmup() {
  return axios.get(`${url}/api/setup`).catch(console.error);
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {nextMove: ""};
    this.emitter = new EventEmitter();
    this.emitter.on("turnAround", (color) => {
      if (color === 1) {
        this.handleClickAI();
      }
    });
    warmup();
  }

  handleChange(event) {
    this.setState({nextMove: event.target.value});
  }

  handleClick(event) {
    this.emitter.emit("moveNext", this.state.nextMove);
    event.preventDefault();
  }

  async handleClickAI() {
    const result = await getBestMove(this.game.getCurrentSfen());
    this.emitter.emit("ai", result.data);
  }

  render() {
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <a href="https://github.com/gikou-official/Gikou" target="_blank">技巧と対戦</a>
        </div>
        <Game emitter={this.emitter} observable={this.observable} ref={(game) => { this.game = game }} />
        <div style={{textAlign: "center"}}>
          {/*
          <label>
            Next Move:
            <input type="text" value={this.state.nextMove} onChange={this.handleChange.bind(this)} placeholder="7g7f" />
          </label>
          <input type="submit" value="Submit" onClick={this.handleClick.bind(this)} />
          <div>
            <input type="submit" value="AI" onClick={this.handleClickAI.bind(this)} />
          </div>
          */}
        </div>
      </div>
    );
  }
}

export default App;
