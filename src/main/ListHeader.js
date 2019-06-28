import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../common/Common';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 0;
`;

const SubTitleNoMargin = styled(SubTitle)`
  margin: 0;
`;

const MoreBtn = styled.div`
  font-size: 14px;
  color: #05668d;
`;

export default ({ title, hideMore, onMoreBtnClick }) => (
  <Header>
    <SubTitleNoMargin>#{title}</SubTitleNoMargin>
    {!hideMore && <MoreBtn onClick={onMoreBtnClick}>더보기</MoreBtn>}
  </Header>
);
