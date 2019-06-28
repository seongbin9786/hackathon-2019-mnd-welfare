import React from 'react';
import styled from 'styled-components';
import LocationItem from './LocationItem';
import { SubTitle } from '../common/Common';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

export default ({ items, history }) => (
  <React.Fragment>
    <SubTitle>#위치별</SubTitle>
    <Wrapper>
      {items &&
        items.map(name => (
          <LocationItem
            name={name}
            onClick={() =>
              history.push(`/list/location/${name}`, { direction: 'right' })
            }
          />
        ))}
    </Wrapper>
  </React.Fragment>
);
