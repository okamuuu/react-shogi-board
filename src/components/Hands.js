import React, { Component } from 'react';
import styled, { css } from "styled-components";

const baseColor = `#666`

const Hands = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${baseColor};
  border-radius: 3px;
`;

export default (props) => {
  const { hands } = props;

  return (
    <div>
      {JSON.stringify(hands)}
    </div>
  )
}
