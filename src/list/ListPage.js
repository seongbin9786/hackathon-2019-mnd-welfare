import React from 'react';
import ListContainer from '../common/ListContainer';
import PageHeader from './PageHeader';
import { Spacing } from '../common/Common';
import GoBackBtn from '../common/GoBackBtn';
import {
  getList,
  isLoading,
  loadList,
  loadHotList,
  loadMyList
} from '../redux/items';
import { connect } from 'react-redux';

const pageMap = [
  {
    path: new RegExp('/list/location/*'),
    title: '위치별',
    type: 'location',
    fn: 'loadList',
    sort: { column: 'id', order: 'desc' },
    like: pathname => `^${pathname.split('/')[3]}`
  },
  {
    path: new RegExp('/list/hot'),
    title: '인기',
    type: 'hot',
    sort: { column: 'id', order: 'desc' },
    fn: 'loadHotList'
  },
  {
    path: new RegExp('/list/category/*'),
    title: '분류별',
    type: 'category',
    fn: 'loadList',
    sort: { column: 'id', order: 'desc' },
    filter: pathname => ({ key: 'category', value: pathname.split('/')[3] })
  },
  {
    path: new RegExp('/list/my/*'),
    title: '내 추천',
    type: 'my',
    fn: 'loadMyList'
  }
];

const getByPathname = pathname =>
  pageMap.find(({ path }) => path.test(pathname));

class ListPage extends React.Component {
  state = {
    page: 1,
    limit: 10
  };

  componentDidMount() {
    console.log('ListPage mount');

    this.initializePage();
    this.loadNextList();
  }

  initializePage() {
    this.setState({
      page: 1,
      limit: 10
    });
  }

  loadNextList() {
    const { page, limit } = this.state;
    const { pathname } = this.props.location;
    const { type, fn, sort, filter, like } = getByPathname(pathname);
    const loadingFunction = this.props[fn];

    loadingFunction({
      type,
      sort,
      page,
      limit,
      filter: filter && filter(pathname),
      like: like && like(pathname)
    });

    // 다음 page로 전진
    this.setState({ ...this.state, page: this.state.page + 1 });
  }

  onHeaderSelectChange = ({ target: { value } }) => {
    const { history } = this.props;
    const { pathname } = this.props.location;
    const { type } = getByPathname(pathname);

    console.log(history);
    history.push(`/list/${type}/${value}`);
  };

  render() {
    const { history } = this.props;
    const { pathname } = this.props.location;
    const { title, type } = getByPathname(pathname);
    const showSelectBox = type === 'location' || type === 'category';
    const selectedValue = showSelectBox ? pathname.split('/')[3] : null;
    const showRank = type === 'hot';
    const showCategory = type !== 'category';

    const { isLoading } = this.props;
    console.log('isLoading:', isLoading);

    const items = this.props[`${type}Items`];

    return (
      <React.Fragment>
        <PageHeader
          title={title}
          showSelectBox={showSelectBox}
          selectedValue={selectedValue}
          onChangeValue={this.onHeaderSelectChange}
        />
        <Spacing height={showSelectBox ? 140 : 100} />
        <ListContainer
          items={items}
          isLoading={isLoading}
          history={history}
          onLoadMore={() => this.loadNextList()}
          showRank={showRank}
          showCategory={showCategory}
        />
        {/* 여기서는 뒤로가기가 메인 페이지로 가야 수월함 */}
        <GoBackBtn onClick={() => history.push('/')} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  newItems: getList('new', state),
  hotItems: getList('hot', state),
  myItems: getList('my', state),
  categoryItems: getList('category', state),
  locationItems: getList('location', state)
});

const mapDispatchToProps = {
  loadList,
  loadHotList,
  loadMyList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
