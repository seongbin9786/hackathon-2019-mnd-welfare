import React from 'react';
import LazyImg from '../common/LazyImg';

class CarouselItem extends React.Component {
  state = {
    loaded: false
  };

  onImageLoaded = () => this.setState({ loaded: true });

  render() {
    const { loaded } = this.state;
    const { item, onClick, imgStyle, placeholderStyle } = this.props;
    const { name, benefit, image } = item;

    // 이미지가 없는 경우
    if (!image && !loaded) this.onImageLoaded();

    return (
      <React.Fragment>
        <LazyImg
          src={image}
          onClick={onClick}
          onLoaded={this.onImageLoaded}
          width="100%"
          height="100%"
          imgStyle={imgStyle}
          placeholderStyle={placeholderStyle}
        />
        {loaded ? (
          <React.Fragment>
            <h2>{name}</h2>
            <p>{benefit}</p>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default CarouselItem;
