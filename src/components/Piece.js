import React, { Component } from "react";
import styled, { css } from "styled-components";

const Color = {
  Black: 0,
  White: 1
};

const Wrapper = styled.div`
  ${props => props.upSideDown && css`
    transform: scale(1,-1);
  `}
`

const Icon = props => {
  return (
    <span onClick={props.onClick} style={{color:"#222",fontSize: "1.4em", cursor: "pointer"}}>{props.children}</span>
  )
};


const Base = props => {
  switch (props.kind) {
    case "FU":
      return (<Icon>歩</Icon>)
    case "KY":
      return (<Icon>香</Icon>)
    case "KE":
      return (<Icon>桂</Icon>)
    case "GI":
      return (<Icon>銀</Icon>)
    case "KI":
      return (<Icon>金</Icon>)
    case "TO":
      return (<Icon>と</Icon>)
    case "NY":
      return (<Icon>杏</Icon>)
    case "NK":
      return (<Icon>圭</Icon>)
    case "NG":
      return (<Icon>全</Icon>)
    case "KA":
      return (<Icon>角</Icon>)
    case "HI":
      return (<Icon>飛</Icon>)
    case "OU":
      // 玉と王があるけど考慮しないことにする
      return (<Icon>玉</Icon>)
    case "UM":
      return (<Icon>馬</Icon>)
    case "RY":
      return (<Icon>龍</Icon>)
    default:
      return (<div></div>)
  }
}

export default class Piece extends Component {
  render() {
    const {color, kind, onClick} = this.props;
    return (
      <Wrapper onClick={onClick} upSideDown={color === Color.White}>
        <Base kind={kind} />
      </Wrapper>
    )
  }
}
