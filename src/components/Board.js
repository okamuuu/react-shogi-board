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

    // 先手番視点では左から 9, 8, 7 ...
    const headNavNumbers = isReversed ? numbers : numbers.reverse();

    // 先手番視点では上から 一, 二, 三 ...
    const sideNavNumbers = isReversed ? numbers.reverse() : numbers;

    return (
      <div>
        <GameBoard>
          {rows.map((row, i) => (
            row.map((col, j) => (
              <Box color={"#222"} key={""+i+j}>
                {col && (<Piece color={col.color} kind={col.kind} />)}
              </Box>
            ))
          ))}
        </GameBoard>
        {/*
        <GameBoard>
          {headNavNumbers.map(y => {
            return sideNavNumbers.map(x => {
              if ((x === 3 || x === 6) && (y === 3 || y === 6)) {
                return (
                  <Box dot color={"#222"} key={""+y+x}>
                    <Piece color="#666" kind="HU" />
                  </Box>
                )
              }
              return (
                <Box key={""+y+x}>{""+y+x}</Box>
              )
            })
          })}
        </GameBoard>
        */}
        <div style={{width: 30, height: 30}}>
        </div>
      </div>
    );

  }
}
