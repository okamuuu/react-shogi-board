import React, { Component } from "react";
import styled, { css, keyframes } from "styled-components";

const Color = {
  Black: 0,
  White: 1
};

const Wrapper = styled.div`
  ${props => props.upSideDown && css`
    transform: scale(1,-1);
  `}
`

const blink = keyframes`
  0% {opacity: 1}
  100% {opacity: 0.6;}
`;

const Icon = styled.span`
  color: #222;
  font-size: 1.4em;
  cursor: pointer;

  ${props => props.blink && css`
    animation: ${blink} 1.5s ease-in-out infinite alternate;
  `}
`;

function getCharFromKind(kind) {
  switch (kind) {
    case "FU":
      return "歩"
    case "KY":
      return "香"
    case "KE":
      return "桂"
    case "GI":
      return "銀"
    case "KI":
      return "金"
    case "TO":
      return "と"
    case "NY":
      return "杏"
    case "NK":
      return "圭"
    case "NG":
      return "全"
    case "KA":
      return "角"
    case "HI":
      return "飛"
    case "OU":
      // 玉と王があるけど考慮しないことにする
      return "玉"
    case "UM":
      return "馬"
    case "RY":
      return "龍"
    default:
      return ""
  }
}

export default class Piece extends Component {
  render() {
    const {color, kind, blink, reversed} = this.props;
    const upSideDown = reversed ? color === Color.Black : color === Color.White;
    return (
      <Wrapper upSideDown={upSideDown}>
        <Icon blink={blink}>{getCharFromKind(kind)}</Icon>
      </Wrapper>
    )
  }
}
