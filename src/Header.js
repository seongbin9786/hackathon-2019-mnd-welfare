import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const Wrapper = styled.div`
  /* 스타일링 */
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);
  background-color: #fff;
  height: 56px;
  width: 100%;

  /* 레이아웃 */
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  /* 선택 안되게 */
  user-select: none;
`;

const Title = styled.h1`
  font: 20px 'yg-jalnan', sans-serif;

  /* 로고 중앙에 배치 */
  text-align: center;
  line-height: 1.6;
`;

const MyFavoriteListBtn = styled.div`
  font-family: 'yg-jalnan', sans-serif;
  font-size: 14px;

  background: #f0f3bd;
  color: #05668d;

  padding: 4px;
  border-radius: 50px;

  position: absolute;
  top: 13px;
  right: 13px;

  /* PC에서 조금 이상함 */
  cursor: pointer;
`;

export default withRouter(({ history }) => (
  <Wrapper>
    <Title>장병혜택백서</Title>
    <MyFavoriteListBtn onClick={() => history.push('/list/my')}>
      My
    </MyFavoriteListBtn>
  </Wrapper>
));
