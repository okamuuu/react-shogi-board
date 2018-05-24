import styled from "styled-components";

const borderColor = "#666";

export default styled.div`
  width: 360px;
  height: 360px;
  margin: 0 auto;
  color: #fff;
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  display: grid;
  grid-template: repeat(9, 1fr) / repeat(9, 1fr);
`
