import React from 'react';
import Swiper from 'react-id-swiper';
import styled, { css } from 'styled-components';
import CarouselItem from './CarouselItem';
import createPlaceholders from '../createPlaceholders';

const Slide = styled.div`
  height: 170px;

  /* 컨텐츠 흰색으로 */
  & h2,
  & p {
    color: white !important;

    /* 너무 긴 경우 방지 */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 280px;
  }

  & h2 {
    font-size: 20px;
    font-family: 'yg-jalnan', sans-serif;
    font-weight: normal;
    position: absolute;
    top: -10px;
    left: 10px;
  }

  & p {
    position: absolute;
    top: 17px;
    left: 10px;
  }
`;

const imgStyle = css`
  object-fit: cover;
  border-radius: 10px;
`;

const placeholderStyle = css`
  border-radius: 10px;
`;

const params = {
  slidesPerView: 1.2,
  centeredSlides: true,
  spaceBetween: 10
};

const placeholder = {
  name: '',
  benefit: '',
  image: ''
};

// 4개 아이템 생성
const placeholderItems = createPlaceholders(placeholder, 4);

// Slide를 여기서 정의하지 않으면 이상하게 표시됨
// Placeholder 만들어야 함
const Carousel = ({ items = placeholderItems, history }) =>
  console.log('Carousel items:', items) || (
    <Swiper {...params}>
      {items.map(item => (
        <Slide>
          <CarouselItem
            item={item}
            key={item.name}
            imgStyle={imgStyle}
            placeholderStyle={placeholderStyle}
            onClick={() => history.push(`/detail/${item.id}`)}
          />
        </Slide>
      ))}
    </Swiper>
  );

export default Carousel;
