import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  // 우측 끝에만 선택
  & > div:nth-child(5n) {
    border-right: none;
  }

  // 첫 5개만 선택
  & > div:nth-child(-n + 5) {
    border-top: 1px solid rgba(220, 220, 220, 0.6);
  }
`;

export default ({ items, history }) => (
  <Wrapper>
    {items &&
      items.map(item => (
        <CategoryItem
          {...item}
          onClick={() =>
            history.push(`/list/category/${item.name}`, { direction: 'right' })
          }
        />
      ))}
  </Wrapper>
);
