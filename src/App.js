import React, { Component } from 'react';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import { PRESET, MOVE_DEF } from './Constants';
import Board from './components/Board';
import PieceModel from './models/Piece';
import Game from './containers/Game';

class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;
