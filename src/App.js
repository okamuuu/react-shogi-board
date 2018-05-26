import React, { Component } from 'react';
import { EventEmitter } from "events";
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {nextMove: ""};
    this.emitter = new EventEmitter();
  }

  handleChange(event) {
    this.setState({nextMove: event.target.value});
  }

  handleClick(event) {
    this.emitter.emit("moveNext", this.state.nextMove);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Game emitter={this.emitter} />
        <div style={{textAlign: "center"}}>
            <label>
              Next Move:
              <input type="text" value={this.state.nextMove} onChange={this.handleChange.bind(this)} placeholder="7g7f" />
            </label>
            <input type="submit" value="Submit" onClick={this.handleClick.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
