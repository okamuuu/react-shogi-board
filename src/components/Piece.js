import React, { Component } from "react";
import ReactIconBase from 'react-icon-base';
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

// const Icon = props => {
//   return (
//   <ReactIconBase viewBox="0 0 512 512" size={"80%"} color={"#666"} {...props}>
//     <path
//       d="M470.522 491.888l-40.189-367.361L256.009 0 81.667 124.526 39.282 512h433.436l-2.196-20.112zM79.737 475.725l36.221-331.114L256.009 44.582l140.033 100.029 36.222 331.114H79.737z"
//     />
//     <text x="50%" y="75%" textAnchor="middle" fontSize="256">{props.children}</text>
//   </ReactIconBase>
//   )
// };

// 文字だけの方が視認性が良いかも.
const Icon = props => {
  return (
    <span style={{color:"#222",fontSize: "1.4em"}}>{props.children}</span>
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
    const {color, kind} = this.props;
    return (
      <Wrapper upSideDown={color === Color.White}>
        <Base kind={kind} />
      </Wrapper>
    )
  }
}
