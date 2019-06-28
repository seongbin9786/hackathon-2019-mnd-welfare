import api from './api';
import { get } from '../localStorageUtil';

// Actions
export const LOADING = 'items/LOADING';
export const GET_DETAIL = 'items/GET_DETAIL';
export const GET_LIST = 'items/GET_LIST';

const setLoading = (type, isLoading) => ({
  type: LOADING,
  payload: {
    type,
    isLoading
  }
});

// Action Creators
export const loadDetail = id => dispatch => {
  dispatch(setLoading('detail', true));

  api.get(`/events/${id}?_embed=favorites`).then(({ data }) =>
    dispatch({
      type: GET_DETAIL,
      payload: data
    })
  );
};

export const loadList = ({
  type,
  sort,
  page,
  limit,
  filter,
  like
}) => dispatch => {
  dispatch(setLoading(type, true));

  let uri = '/events?';
  /*
    For multiple fields, use the following format:
    GET /posts?_sort=user,views&_order=desc,asc
  */
  if (like) uri = uri.concat(`${type}_like=${like}`);
  if (filter) uri = uri.concat(`${filter.key}=${filter.value}`);
  if (sort) uri = uri.concat(`&_sort=${sort.column}&_order=${sort.order}`);
  if (page) uri = uri.concat(`&_page=${page}`);
  if (limit) uri = uri.concat(`&_limit=${limit}`);

  console.log('uri: ', uri);

  api.get(uri).then(({ data }) =>
    dispatch({
      type: GET_LIST,
      payload: {
        type,
        data,
        isPaged: page !== 1
      }
    })
  );
};

export const loadHotList = ({ page, limit }) => dispatch => {
  dispatch(setLoading('hot', true));

  api.get('/events?_embed=favorites').then(({ data }) => {
    const paged = data
      // b - a 로 해야 제대로 정렬되네
      .sort((a, b) => b.favorites.length - a.favorites.length)
      .slice((page - 1) * limit, page * limit);

    dispatch({
      type: GET_LIST,
      payload: {
        type: 'hot',
        data: paged,
        isPaged: page !== 1
      }
    });
  });
};

export const loadMyList = ({ page, limit }) => dispatch => {
  dispatch(setLoading('my', true));

  const favoritesArray = get('favorites');
  console.log('array: ', favoritesArray);

  // { id, eventId }
  const eventIdReqArray = favoritesArray
    .slice((page - 1) * limit, page * limit)
    .map(elem => api.get(`/events/${elem.eventId}?_embed=favorites`));
  console.log('eventIdReqArray:', eventIdReqArray);

  const resultArray = [];

  Promise.all(eventIdReqArray).then(values => {
    values.forEach(({ data }) => resultArray.push(data));
    console.log('resultArray:', resultArray);

    dispatch({
      type: GET_LIST,
      payload: {
        type: 'my',
        data: resultArray,
        isPaged: page !== 1
      }
    });
  });
};

// initialState
const initialState = {
  detail: undefined,
  isLoading: {
    my: false,
    hot: false,
    new: false,
    category: false,
    location: false
  },
  list: {}
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      const { type, isLoading } = action.payload;
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [type]: isLoading
        }
      };
    }
    case GET_DETAIL: {
      return {
        ...state,
        detail: action.payload,
        isLoading: false
      };
    }
    case GET_LIST: {
      const { type, data, isPaged } = action.payload;

      return {
        ...state,
        list: {
          ...state.list,
          [type]: isPaged ? [...state.list[type], ...data] : data
        },
        isLoading: false
      };
    }
    default:
      return state;
  }
};

// Selectors
export const isLoading = ({ items }) =>
  Object.keys(items.isLoading).findIndex(
    type => items.isLoading[type] === true
  ) !== -1;

export const getDetail = ({ items }) => items.detail;
export const getList = (type, { items }) => items.list[type];
