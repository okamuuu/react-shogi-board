import React, { Component } from 'react';
import styled, { css } from "styled-components";

const baseColor = `#666`

const Footer = styled.footer`
  background: #eee;
  padding: 30px;
  display: inline-flex;
`;

const Container = styled.div`
  margin: 0 auto;
  font-size: 0.7em;
`

const Span = styled.span`
  padding: 15px;
  color: #666;
`

export default ({onClick}) => (
  <Footer>
    <Container>
      <Span onClick={ () => onClick("/") }>HOME</Span>
      <Span onClick={ () => onClick("/gikou") }>GIKOU</Span>
    </Container>
  </Footer>
)
