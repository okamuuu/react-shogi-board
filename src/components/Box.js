import styled, { css } from "styled-components";

const borderColor = "#666";

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
`
