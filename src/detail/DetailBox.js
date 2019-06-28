import React from 'react';
import styled from 'styled-components';

const DetailItem = styled.div`
  margin: 10px 1px;
  font-family: 'Noto Sans KR';

  & > span {
    font-weight: bold;
    margin-right: 8px;
    font-family: 'Noto Sans KR';
  }
`;

export default ({
  location,
  target,
  requirements,
  beginDate,
  endDate,
  benefit,
  tel
}) => (
  <React.Fragment>
    <DetailItem>
      <span>위치:</span>
      {location || '-'}
    </DetailItem>
    <DetailItem>
      <span>대상:</span>
      {target || '-'}
    </DetailItem>
    <DetailItem>
      <span>조건:</span>
      {requirements || '-'}
    </DetailItem>
    <DetailItem>
      <span>기간:</span>
      {beginDate && endDate ? `${beginDate} ~ ${endDate}` : '-'}
    </DetailItem>
    <DetailItem>
      <span>혜택:</span>
      {benefit || '-'}
    </DetailItem>
    <DetailItem>
      <span>문의번호:</span>
      {tel || '-'}
    </DetailItem>
  </React.Fragment>
);
