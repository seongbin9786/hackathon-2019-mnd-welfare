import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import LazyImg from '../common/LazyImg';
import TopBox from './TopBox';
import DetailBox from './DetailBox';
import Content from './Content';
import GoBackBtn from '../common/GoBackBtn';
import { loadDetail, getDetail, isLoading } from '../redux/items';
import { toggleFavorite, isLikeToggled } from '../redux/favorites';
import SnackBar from '../common/SnackBar';
import { showSnackbar } from '../redux/forms';

const imgStyle = css`
  /* 전체 화면 때문에. */
  margin: -30px 0 0 -30px;
  height: auto;
`;

const placeholderStyle = css`
  /* 전체 화면 때문에. */
  /* margin-bottom: 30px 은 왜 필요한지 사실 이해못함ㄷㄷ */
  margin: -30px 0 30px -30px;

  /* 이미지마다 높이가 다르므로 그냥 적당한 값 넣음 */
  height: 350px;
`;

const Divider = styled.div`
  height: 0;
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);

  /* NoPaddingZone */
  margin: 18px -30px;
  width: calc(100% + 60px);
`;

const Category = styled.h3`
  margin: 10px 0 0 0;
  font-size: 16px;
  font-family: 'yg-jalnan', sans-serif;
  color: #05668d;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
  font-size: 20px;
  font-family: 'yg-jalnan', sans-serif;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  margin: 18px 0;
  font-family: 'yg-jalnan', sans-serif;
`;

const placeholderItem = {
  id: -1,
  image: '',
  category: '',
  name: '',
  likes: '',
  location: '',
  target: '',
  requirements: '',
  description: '',
  beginDate: '',
  endDate: '',
  benefit: '',
  tel: '',
  favorites: []
};

const topOneLocation = str => str.slice(0, str.indexOf(' '));

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    const id = this.getItemIdFromPath(props);
    const toggled = isLikeToggled(id);
    this.state = {
      toggled,
      toggledOriginal: toggled
    };
    console.log('DetailPage] Like Toggled:', toggled, id);
  }

  componentDidMount() {
    const id = this.getItemIdFromPath(this.props);
    // 디테일이 어느건지 id를 확인하기 힘드므로 그냥 로딩합시다
    const { loadDetail } = this.props;
    loadDetail(id);
  }

  getItemIdFromPath = props => {
    const { pathname } = props.location;
    let id = pathname.split('/')[2];
    return parseInt(id, 10);
  };

  handleEditClick = id => {
    const { history } = this.props;

    history.push(`/edit/${id}`);
  };

  // detail을 다시 로딩해서, favorites 재계산
  handleLikeClick = id => {
    this.setState({
      toggled: !this.state.toggled
    });
    toggleFavorite(id);
  };

  calcLikes = originalLikes => {
    const { toggled, toggledOriginal } = this.state;
    if (toggled === toggledOriginal) {
      return originalLikes;
    }
    // FALSE ---> TRUE
    if (!toggledOriginal && toggled) {
      return originalLikes + 1;
    }
    // TRUE ---> FALSE
    return originalLikes - 1;
  };

  render() {
    const { history } = this.props;
    const { isLoading, showSnackBar, item = placeholderItem } = this.props;
    const { toggled } = this.state;
    const originalLikes = item.favorites.length;
    const likes = this.calcLikes(originalLikes);

    return (
      <React.Fragment>
        <SnackBar isActive={showSnackBar}>수정 요청이 접수되었습니다.</SnackBar>
        <LazyImg
          src={item.image}
          width="calc(100% + 60px)"
          imgStyle={imgStyle}
          placeholderStyle={placeholderStyle}
        />
        <Category>#{item.category}</Category>
        <Title>{item.name}</Title>
        <TopBox
          likes={likes}
          isLiked={toggled}
          location={topOneLocation(item.location) || '-'}
          handleLikeClick={() => this.handleLikeClick(item.id)}
          handleEditClick={() => this.handleEditClick(item.id)}
        />
        <SubTitle>#이용정보</SubTitle>
        <DetailBox
          location={item.location}
          target={item.target}
          requirements={item.requirements}
          beginDate={item.beginDate}
          endDate={item.endDate}
          benefit={item.benefit}
          tel={item.tel}
        />
        <Divider />
        <SubTitle>#상세 설명</SubTitle>
        <Content content={item.description} />
        <GoBackBtn onClick={history.goBack} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  item: getDetail(state),
  showSnackBar: showSnackbar(state)
});

const mapDispatchToProps = {
  loadDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
