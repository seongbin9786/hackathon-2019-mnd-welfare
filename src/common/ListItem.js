import React from 'react';
import styled, { css } from 'styled-components';
import LazyImg from '../common/LazyImg';

const Wrapper = styled.div`
  display: flex;

  height: 120px;
  width: 100%;
`;

const TextBox = styled.div`
  margin-left: 8px;
  width: calc(100% - 130px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Rank = styled.div`
  font-size: 8px;

  line-height: 1.7;

  /* 
    굳이 Rank에 넣은 이유는 Rank를 미표시할 때 
    Category를 다시 margin-left: 0 이런거 안해도 되기 때문이다. 
  */
  margin-right: 4px;
`;

const Category = styled.div`
  font-size: 10px;

  display: inline-block;
  background: #f0f3bd;
  color: #028090;
  border: 1px solid #f0f3bd;
  padding: 0px 2px;
  border-radius: 4px;

  box-sizing: border-box;
  height: 14px;
  line-height: 1.2;
`;

const Title = styled.div`
  font-size: 16px;

  // ... 처리
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
`;

const Location = styled.div`
  font-size: 12px;
  color: gray;
`;

const BenefitContainer = styled.div`
  text-align: right;
  align-items: flex-end;
`;

const Benefit = styled.span`
  color: #dc143c;
  font-size: 16px;
  margin-right: 4px;
`;

const imgStyle = css`
  border-radius: 10px;
  object-fit: cover;
`;

const placeholderStyle = css`
  border-radius: 10px;
`;

const maxLength = str => (str.length > 35 ? `${str.slice(0, 32)}...` : str);

// 띄어쓰기 없는 경우 한 단어
const topTwoLocation = str =>
  !str.includes(' ')
    ? str
    : str.slice(0, str.indexOf(' ', str.indexOf(' ') + 1));

export default ({
  onClick,
  showRank,
  showCategory,
  index,
  item: { id, rank, category, name, location, benefit, image }
}) => (
  // id가 없으면 placeholder 이므로 click 못하게
  <Wrapper onClick={id ? onClick : f => f}>
    <LazyImg
      src={image}
      width="120px"
      height="120px"
      imgStyle={imgStyle}
      placeholderStyle={placeholderStyle}
    />
    <TextBox>
      <div>
        <div style={{ display: 'flex' }}>
          {showRank && (rank || index) && <Rank>{rank || index}위</Rank>}
          {showCategory && category && <Category>{category}</Category>}
        </div>
        <Title>{name}</Title>
        {location && <Location>{topTwoLocation(location)}</Location>}
      </div>
      <BenefitContainer>
        <Benefit>{maxLength(benefit)}</Benefit>
      </BenefitContainer>
    </TextBox>
  </Wrapper>
);
