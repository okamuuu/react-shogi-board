import styled, { css } from "styled-components";

const baseColor = `#666`

const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? baseColor : 'white'};
  color: ${props => props.primary ? 'white' : baseColor};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${baseColor};
  border-radius: 3px;
`;

export default Button;
