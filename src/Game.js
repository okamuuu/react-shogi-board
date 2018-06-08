import React, { Component } from 'react';

import _ from 'lodash';

import Board from './components/Board';
import Box from './components/Box';
import Piece from './components/Piece';
import { Hands, Hand } from './components/Hands';

import {
  isDropMove,
  parseMoveSFEN,
  parseDropMoveSFEN,
  isMovableBox, // not util
  isDroppableBox, // not util
  canPromote,
  // getKingPosition,
  // getPieces,
  isChecked
} from './utils';

const { Shogi, Color } = require("shogi.js");

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shogi: {},
      board: [],
      hands: [],
      selectedBox: {},
      selectedHand: {},
      lastMovedBox: {},
      movableBoxes: [],
      droppableBoxes: [],
      moveCount: 1,
      turn: 0,
      sfen: "",
      histories: [] // TODO: histories は UI が担う役割ではない気がする
    }

    this.emitter = props.emitter;

    this.emitter.on("ai", (data) => {
      const { bestmove, bestpv } = data;
      console.log("fire ai", bestmove, bestpv);

      if (isDropMove(bestmove)) {
        const { x, y, kind } = parseDropMoveSFEN(bestmove);
        this.state.shogi.drop(x, y, kind);
        this.setState({lastMovedBox: {x, y}})
        this.finishTurn();
        return;
      }

      const { fromX, fromY, toX, toY, promote } = parseMoveSFEN(bestmove);
      this.state.shogi.move(fromX, fromY, toX, toY, promote);
      this.setState({lastMovedBox: {x: toX, y: toY}})
      this.finishTurn();
    });
  }

  componentDidMount(props) {
    const shogi = new Shogi();
    // 盤面を初期化
    this.setState({
      shogi,
      board: Object.assign([], shogi.board),
      hands: Object.assign([], shogi.hands),
      selectedBox: {},
      movableBoxes: [],
      moveCount: 1,
      turn: 0,
      sfen: "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",
      histories: ["lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1"]
    })
  }

  getCurrentSfen() {
    return this.state.shogi.toSFENString(this.state.moveCount);
  }

  select(x, y) {
    const piece = this.state.shogi.get(x, y);
    if (!piece || this.state.shogi.turn !== piece.color) {
      return;
    }

    const movablePoints = this.state.shogi.getMovesFrom(x, y);
    this.setState({
      selectedBox: {x, y},
      movableBoxes: movablePoints.map(x => x.to),
      droppableBoxes: []
    });
  }

  selectHand(color, kind) {
    const { shogi } = this.state;
    if (shogi.turn !== color) {
      return;
    }
    this.setState({
      selectedHand: {kind},
      movableBoxes: [],
      droppableBoxes: shogi.getDropsBy(color).map(x => x.to)
    });
  }

  move(x, y) {
    const { shogi, board, selectedBox } = this.state;
    const piece = shogi.get(selectedBox.x, selectedBox.y);

    const nextBoard = _.cloneDeep(board);
    nextBoard[selectedBox.x - 1][selectedBox.y -1] = undefined;
    nextBoard[x - 1][y - 1] = piece;

    if (isChecked(shogi.turn, nextBoard)) {
      window.alert("王手です");
      return;
    }

    let promote = false;
    if (canPromote(piece.kind, piece.color, selectedBox.y, y)) {
      promote = window.confirm("成りますか?");
    }

    shogi.move(selectedBox.x, selectedBox.y, x, y, promote);
    this.finishTurn();
  }

  drop(x, y) {
    const { shogi, selectedHand } = this.state;
    shogi.drop(x, y, selectedHand.kind);
    this.finishTurn();
  }

  finishTurn() {
    const { shogi, moveCount, histories } = this.state;
    const sfen = this.getCurrentSfen();
    this.setState({
      board: _.cloneDeep(shogi.board),
      hands: _.cloneDeep(shogi.hands),
      selectedBox: {},
      movableBoxes: [],
      droppableBoxes: [],
      turn: shogi.turn,
      moveCount: moveCount + 1,
      histories: Object.assign([], [...histories, sfen]),
      sfen
    })
    this.emitter.emit("finishTurn", shogi.turn);
    console.log(this.state.histories);
  }

  reset() {
    this.setState({
      selectedBox: {},
      selectedHand: {},
      movableBoxes: [],
      droppableBoxes: []
    })
  }

  isLastMovedBox(x, y) {
    return this.state.lastMovedBox.x === x && this.state.lastMovedBox.y === y;
  }

  handleClickBox(x, y) {
    // 持ち駒を選択中で、かつ置ける場所をクリックした場合
    if (!_.isEmpty(this.state.selectedHand) && isDroppableBox(this.state, x, y)) {
      this.drop(x, y);
      return;
    }
    // 何も選択していない場合
    if (_.isEmpty(this.state.selectedBox)) {
      this.select(x, y)
      return;
    }
    // 盤上の駒を選択中で移動可能な場所をクリックした場合
    else if (isMovableBox(this.state, x, y)) {
      this.move(x, y);
      return;
    }

    this.reset();
  }

  handleClickHand(color, kind) {
    if (_.isEmpty(this.state.selectedHand)) {
      this.selectHand(color, kind);
      return;
    }
  }

  handleClickWait() {
    console.log("handleClickWait");
    const { shogi, moveCount, histories } = this.state;

    const length = histories.length;
    console.log(length);
    if (length < 2) {
      return;
    }
    const prevSfen = histories[length - 3];
    console.log(prevSfen);

    this.state.shogi.initializeFromSFENString(prevSfen);
    this.state.shogi.turn = 0;

    this.setState({
      board: shogi.board,
      hands: shogi.hands,
      lastMovedBox: {},
      selectedBox: {},
      movableBoxes: [],
      droppableBoxes: [],
      turn: 0,
      moveCount: moveCount - 2,
      histories: Object.assign([], [...histories.slice(length - 2)]),
      sfen: prevSfen
    });
  }

  render() {
    const { shogi, board } = this.state;

    const getHandsSammary = (color) => {
      if (_.isEmpty(shogi)) {
        return {}
      }
      return shogi.getHandsSummary(color);
    }

    const isReversed = false;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reverseNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    // 先手番視点では左から 9, 8, 7 ...
    const headNavNumbers = isReversed ? numbers : reverseNumbers;

    // 先手番視点では上から 一, 二, 三 ...
    const sideNavNumbers = isReversed ? reverseNumbers : numbers;

    const gameRows = [];

    if (board.length > 0) {
      sideNavNumbers.forEach(y => {
        headNavNumbers.forEach(x => {
          const piece = board[x-1][y-1] || {};
          gameRows.push({piece, x, y});
        })
      })
    }

    const whiteHandsSammary = getHandsSammary(Color.White);
    const blackHandsSammary = getHandsSammary(Color.Black);

    return (
      <div style={{margin: "0 auto", maxWidth: "360px"}}>
        <Hands>
          { Object.keys(whiteHandsSammary).filter(kind => whiteHandsSammary[kind] > 0).map(kind => (
            <Hand onClick={() => this.handleClickHand(Color.White, kind)} key={kind} kind={kind} count={whiteHandsSammary[kind]} />
          )) }
        </Hands>
        <Board>
          {gameRows.map(({piece, x, y}) => (
            <Box key={x+"-"+y}
              overlay={isMovableBox(this.state, x, y) || isDroppableBox(this.state, x, y)}
              strong={this.isLastMovedBox(x, y)}
              onClick={() => this.handleClickBox(x, y)}
            >
              {
                piece && (<Piece color={piece.color} kind={piece.kind} blink={this.isLastMovedBox(x, y)} />)
              }
            </Box>
          ))}
        </Board>
        <Hands>
          { Object.keys(blackHandsSammary).filter(kind => blackHandsSammary[kind] > 0).map(kind => (
            <Hand onClick={() => this.handleClickHand(Color.Black, kind)} key={kind} kind={kind} count={blackHandsSammary[kind]} />
          )) }
        </Hands>
        <button onClick={this.handleClickWait.bind(this)}>待った</button>
      </div>
    );
  }
}

export default Game;
