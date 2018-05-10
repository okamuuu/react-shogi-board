import React, { Component } from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import { PRESET, MOVE_DEF } from './Constants';
import Board from './components/Board';
import PieceModel from './models/Piece';

class App extends Component {
  render() {

    const { board, turn } = PRESET.HIRATE;
    const rows = board.map(row => {
      const csa = _.times(9, j => {
        const target = row.slice(24 - j * 3, 24 - j * 3 + 3);
        return target === " * " ? null : new PieceModel(target);
      });
      return csa;
    })

    console.log(rows);
    console.log(_.flatten(rows));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Board rows={rows} />
      </div>
    );
  }
}

export default App;
