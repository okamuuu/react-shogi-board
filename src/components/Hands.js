import React from "react";
import styled from "styled-components";

const baseColor = `#666`

const Hands = styled.div`
  height: 1em;
  margin: 0;
  padding: 15px 0;
`;

const HandPiece = styled.span`
  font-size: 0.8em;
  margin: 0.25em;
  padding: 0.25em 0.5em;
`

function convertToJa(kind) {
  switch (kind) {
    case "FU":
      return ("歩")
    case "KY":
      return ("香")
    case "KE":
      return ("桂")
    case "GI":
      return ("銀")
    case "KI":
      return ("金")
    case "KA":
      return ("角")
    case "HI":
      return ("飛")
    default:
      return (null)
  }
}

export default (props) => {
  const { hands } = props;

  return (
    <Hands>
      {Object.keys(hands).filter(x => hands[x] >= 0).map(x => (
        <HandPiece>{`${convertToJa(x)} ${hands[x]}`} </HandPiece>
      ))}
    </Hands>
  )
}
