import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 14px;

  border: 1px solid rgba(220, 220, 220, 0.6);

  border-radius: 50px;
  display: inline-block;
  text-align: center;
  padding: 8px 4px;

  margin: 6px 4px;
`;

export default ({ name, onClick }) => (
  <Wrapper onClick={onClick}>{name}</Wrapper>
);
