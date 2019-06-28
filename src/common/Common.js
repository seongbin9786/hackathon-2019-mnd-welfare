import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 18px;

  color: #00a896;
  margin: 0;

  font-family: 'yg-jalnan';
`;

export const Spacing = styled.div`
  padding-bottom: ${props => props.height}px;
`;

export const SubTitle = styled.h3`
  font-size: 16px;
  font-family: 'yg-jalnan';
`;

export const NoPaddingZone = styled.div`
  margin: 0 -30px;

  /* 이렇게 해야 됨... container의 padding만큼 추가 */
  width: calc(100% + 60px);
`;
