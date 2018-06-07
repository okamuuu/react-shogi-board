import _ from 'lodash';
import { Color, Piece as ShogiPiece } from "shogi.js";

export function getCurrentSfen(shogi, state) {
  return shogi.toSFENString(state.moveCount);
}

export function isDropMove(string) {
  return string.match(/\*/);
}

export function parseMoveSFEN(string) {
  const chars = string.split('');

  const table = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9
  }
  return {
    fromX: parseInt(chars[0], 10),
    fromY: table[chars[1]],
    toX: parseInt(chars[2], 10),
    toY: table[chars[3]],
    promote: chars[4] ? true : false
  }
}

export function parseDropMoveSFEN(string) {
  const chars = string.split('');

  const kindOf = {
    P: 'FU',
    L: 'KY',
    N: 'KE',
    S: 'GI',
    G: 'KI',
    B: 'KA',
    R: 'HI',
  }

  const table = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9
  }

  return {
    kind: kindOf[chars[0]],
    x: parseInt(chars[2], 10),
    y: table[chars[3]]
  }
}

export function isMovableBox(state, x, y) {
  return _.find(state.movableBoxes, {x, y})
}

export function isDroppableBox(state, x, y) {
  return _.find(state.droppableBoxes, {x, y})
}

function canPromoteKind(kind) {
  return ShogiPiece.canPromote(kind);
}

function canPromotePlace(color, y) {
  return color === Color.Black ? y <= 3 : y >= 7;
}

export function canPromote(kind, color, fromY, toY) {
  if (!canPromoteKind(kind)) {
    return false;
  }

  if (!canPromotePlace(color, fromY) && !canPromotePlace(color, toY)) {
    return false;
  }

  return true;
}



export function getKingPosition(color, board) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // 全ての position をチェック
  let position = {};

  // TODO: 途中で見つかったら loop を抜ける
  numbers.forEach(y => {
    numbers.forEach(x => {
      const piece = board[x - 1][y - 1] || {};
      if (piece.color === color && piece.kind === "OU") {
        position = {x, y}
      }
    });
  });

  return position;
}
