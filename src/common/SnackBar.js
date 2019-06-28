import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { pressOk } from '../redux/forms';

const Root = styled.div`
  display: none;
  width: calc(100% - 100px);

  background-color: #333;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;

  border-radius: 2px;

  padding: 12px 24px;

  & > div > span {
    color: white;
  }

  & > span {
    color: #02c39a;
  }

  z-index: 9999;
  position: fixed;
  left: 25px;
  bottom: 30px;

  animation: fadein 0.5s, fadeout 0.5s;

  ${props =>
    props.show &&
    `
      display: flex;
      justify-content: space-between;
      /* faout 하고 delay가 합쳐져서 3초여야 하는듯 */
      animation: fadein 0.5s, fadeout 0.5s 2500ms;
  `}

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 30px;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
  }
`;

const Icon = styled.i`
  color: #02c39a;
  font-size: 20px;
  line-height: 20px;
  margin-right: 8px;
`;

class SnackBar extends React.Component {
  render() {
    const { isActive, pressOk, children } = this.props;
    return (
      <Root show={isActive}>
        <div>
          <Icon className="flaticon-checked" />
          <span>{children}</span>
        </div>
        <span onClick={pressOk}>OK</span>
      </Root>
    );
  }
}

export default connect(
  null,
  {
    pressOk
  }
)(SnackBar);
