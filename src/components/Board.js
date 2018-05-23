// import { JKFPlayer } from "json-kifu-format";
import React, { Component } from "react";
import styled, { css } from "styled-components";
import Piece from "./Piece";
// import KifuStore from "./stores/KifuStore";

const Color = {
  Black: 0,
  White: 1
};

// const fontSize = "1em";
const borderColor = "#666";

const GameBoard = styled.div`
  width: 360px;
  height: 360px;
  margin: 0 auto;
  color: #fff;
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  display: grid;
  grid-template: repeat(9, 1fr) / repeat(9, 1fr);
`

const Box = styled.div`
  background-color: #eee;
  border-top: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
  font-family: Helvetica;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.dot && css`
    position: relative
    &:after {
      content: "";
      position: absolute;
      top:  calc(-1vmin / 2);
      left: calc(-1vmin / 2);
      width:  1vmin
      height: 1vmin
      border-radius: 50%
      background: ${borderColor};
    }
  `}
`

export default class Board extends Component {

  render() {

    const { rows } = this.props;

    const isReversed = false;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reverseNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    // 先手番視点では左から 9, 8, 7 ...
    const headNavNumbers = isReversed ? numbers : reverseNumbers;

    // 先手番視点では上から 一, 二, 三 ...
    const sideNavNumbers = isReversed ? reverseNumbers : numbers;

    const gameRows = [];

    if (rows.length > 0) {
      sideNavNumbers.forEach(y => {
        headNavNumbers.forEach(x => {
          const peace = rows[x-1][y-1] || {};
          peace.key = x + "-" + y;
          gameRows.push(peace);
        })
      })
    }

    return (
      <div>
        <GameBoard>
          {gameRows.map(peace => (
            <Box color={"#222"} key={peace.key}>
              {
                peace && (<Piece color={peace.color} kind={peace.kind} />)
              }
            </Box>
          ))}
        </GameBoard>
      </div>
    );
  }
}
