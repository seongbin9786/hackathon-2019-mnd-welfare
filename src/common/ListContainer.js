import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { withRouter } from 'react-router';
import LoadingPrimaryBtn from '../common/LoadingPrimaryBtn';
import createPlaceholders from '../createPlaceholders';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div {
    margin-bottom: 24px;
  }
`;

const placeholder = {
  imageUrl: '',
  rank: '',
  category: '',
  name: '',
  location: '',
  benefit: ''
};

const placeholderItems = createPlaceholders(placeholder, 3);

const ListContainer = ({
  items = placeholderItems,
  history,
  isLoading,
  showMoreBtn = true,
  onLoadMore,
  showRank = false,
  showCategory = true,
}) => (
  <Wrapper>
    {items.map((item, index) => (
      <ListItem
        item={item}
        index={index + 1}
        showRank={showRank}
        showCategory={showCategory}
        onClick={() => history.push(`/detail/${item.id}`, { prev: true })}
      />
    ))}
    {showMoreBtn && (
      <LoadingPrimaryBtn
        isLoading={isLoading}
        onClick={onLoadMore}
        text="더보기"
      />
    )}
  </Wrapper>
);

export default withRouter(ListContainer);
