import React from 'react';
import styled from 'styled-components';

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;

  border-top: 1px solid rgba(220, 220, 220, 0.6);
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);

  padding: 10px 0;

  /* NoPaddingZone */
  margin: 0px -30px 10px -30px;
  width: calc(100% + 60px);

  & > div:first-child {
    margin-left: 30px;
  }

  & > div:last-child {
    margin-right: 30px;
  }
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 기본 크기 제공 (안그러면 텍스트 사이즈에 따라만 달라짐) */
  width: 64px;

  & > div {
    /* 텍스트 오버플로우 방지 */
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  /* 좋아요 용도의 Bounce 애니메이션 활용 */
  ${props =>
    props.isLiked &&
    `
    @keyframes bounce {
      from,
      20%,
      53%,
      80%,
      to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translate3d(0, 0, 0);
      }

      40%,
      43% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translate3d(0, -30px, 0);
      }

      70% {
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        transform: translate3d(0, -15px, 0);
      }

      90% {
        transform: translate3d(0, -4px, 0);
      }
    }

    animation-name: bounce;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  `}
`;

export default ({
  likes,
  isLiked,
  handleLikeClick,
  handleEditClick,
  location
}) => (
  <TopBox>
    <IconBox onClick={handleLikeClick} isLiked={isLiked}>
      <i
        className={`flaticon-favorite-heart-button`}
        style={{
          color: isLiked ? '#00A896' : 'rgb(220,220,220)',
          fontSize: 24
        }}
      />
      <div>{likes}</div>
    </IconBox>
    <IconBox onClick={handleEditClick}>
      <i
        className={`flaticon-pencil-edit-button`}
        style={{ color: '#00A896', fontSize: 24 }}
      />
      <div>수정요청</div>
    </IconBox>
    <IconBox>
      <i
        className={`flaticon-placeholder`}
        style={{ color: '#00A896', fontSize: 24 }}
      />
      <div>{location}</div>
    </IconBox>
  </TopBox>
);
