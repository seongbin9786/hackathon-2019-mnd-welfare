import React from 'react';
import styled from 'styled-components';

const RealImg = styled.img`
  display: block;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};

  ${props => props.imgStyle}
`;

const Placeholder = styled.div`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};

  background: rgba(220, 220, 220);

  /* infinite 뻔쩍뻔쩍 애니메이션 */
  /* 이미지가 없는 경우엔 애니메이션 No */
  @keyframes fadeIn {
    from {
      opacity: 0.3;
    }

    to {
      opacity: 1;
    }
  }

  /* 시작 딜레이가 있어야 됨. 애니메이션이 시작하는 중에 제거되면 렉걸리는 듯 */
  animation-delay: 0.5s;

  animation-duration: 0.7s;
  animation-direction: alternate;
  animation-name: fadeIn;
  animation-timing-function: ease-out;
  animation-iteration-count: ${props => (props.hasSource ? 'infinite' : '1')};

  /* 내용 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a9a9a9;

  ${props => props.placeholderStyle}
`;

export default class extends React.Component {
  state = {
    loaded: false
  };

  onLoaded = () => {
    this.setState({ loaded: true });
    this.props.onLoaded && this.props.onLoaded();
  };

  render() {
    const {
      onClick,
      imgStyle,
      placeholderStyle,
      src,
      onLoaded,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {src && this.state.loaded ? null : (
          <Placeholder
            hasSource={!!src}
            {...rest}
            placeholderStyle={placeholderStyle}
            onClick={onClick}
          >
            {!src && 'no image'}
          </Placeholder>
        )}
        {/* src가 없는 경우 예외 처리 */}
        {src && (
          <RealImg
            onLoad={this.onLoaded}
            {...this.props}
            {...this.state}
            imgStyle={imgStyle}
            onClick={onClick}
          />
        )}
      </React.Fragment>
    );
  }
}
