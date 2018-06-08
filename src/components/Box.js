import styled, { css, keyframes } from "styled-components";

const borderColor = "#666";

const blink = keyframes`
  0% {opacity: 0.8}
  100% {opacity: 1;}
`;

export default styled.div`
  background-color: #eee;
  border-top: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
  font-family: Helvetica;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.overlay && css`
    background: white;
  `}
  ${props => props.strong && css`
    background: #ddd;
    animation: ${blink} 1.5s ease-in 1 normal;
  `}

`
