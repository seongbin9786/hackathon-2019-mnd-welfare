import React from 'react';
import PrimaryBtn from '../common/PrimaryBtn';
import styled from 'styled-components';

const Spinner = styled.div`
  position: absolute;
  right: 45px;
  top: 2px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 6px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: spiner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes spiner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ({ text, onClick, isLoading, ...props }) => (
  <PrimaryBtn onClick={onClick} disabled={isLoading} {...props}>
    <span>{text}</span>
    {isLoading && (
      <Spinner>
        <div />
        <div />
        <div />
        <div />
      </Spinner>
    )}
  </PrimaryBtn>
);
