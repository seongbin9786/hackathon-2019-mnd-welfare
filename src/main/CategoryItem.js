import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 16px 0px;
  font-size: 12px;

  line-height: 1.2;

  border-right: 1px solid rgba(220, 220, 220, 0.6);
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);
`;

export default ({ icon, name, onClick }) => (
  <Wrapper onClick={onClick}>
    <div>
      <i
        className={`flaticon-${icon}`}
        style={{ color: '#05668d', fontSize: 24 }}
      />
    </div>
    <span>{name}</span>
  </Wrapper>
);
