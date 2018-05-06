// import { JKFPlayer } from "json-kifu-format";
import React, { Component } from "react";
import styled, { css } from "styled-components";
// import Piece from "./Piece";
// import KifuStore from "./stores/KifuStore";

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
    // const { reversed, player } = this.props.kifuStore;
    //     const { reversed, player } = kifuStore;
    //     const board = player.getState().board;
    //     const lastMove = player.getMove();
    //     const nineY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //     const nineX = nineY.slice().reverse();
    //
    //     const ths = nineX.map((logicalX) => {
    //         const x = reversed ? 10 - logicalX : logicalX;
    //         return <th key={x}>{x}</th>;
    //     });
    //
    //     const trs = nineY.map((logicalY) => {
    //         const y = reversed ? 10 - logicalY : logicalY;
    //         const pieces = nineX.map((logicalX) => {
    //             const x = reversed ? 10 - logicalX : logicalX;
    //             return (
    //                 <Piece
    //                     key={x}
    //                     data={board[x - 1][y - 1]}
    //                     x={x}
    //                     y={y}
    //                     lastMove={lastMove}
    //                     kifuStore={this.props.kifuStore}
    //                 />
    //             );
    //         });
    //         return (
    //             <tr key={y}>
    //                 {pieces}
    //                 <th>{JKFPlayer.numToKan(y)}</th>
    //             </tr>
    //         );
    //     });

    //     return (
    //         <table className="ban">
    //             <tbody>
    //                 <tr>{ths}</tr>
    //                 {trs}
    //             </tbody>
    //         </table>
    //     );

    const isReversed = false;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // 通常は 9, 8, 7 ...
    const headNavNumbers = isReversed ? numbers : numbers.reverse();

    // 通常は 一, 二, 三 ...
    const sideNavNumbers = isReversed ? numbers.reverse() : numbers;

    return (
      <div>
        <GameBoard>
          {headNavNumbers.map(y => {
            return sideNavNumbers.map(x => {
              if ((x === 3 || x === 6) && (y === 3 || y === 6)) {
                return (
                  <Box dot key={""+y+x}>
                    {""+y+x}
                  </Box>
                )
              }
              return (
                <Box key={""+y+x}>{""+y+x}</Box>
              )
            })
          })}
        </GameBoard>
      </div>
    );

  }
}
