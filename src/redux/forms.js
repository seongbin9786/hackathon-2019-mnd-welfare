import api from './api';

// Actions
export const LOADING = 'forms/LOADING';
export const SHOW_SNACKBAR = 'forms/SHOW_SNACKBAR';
export const SAVE_SNACKBAR_TIMEOUT_HANDLER =
  'forms/SAVE_SNACKBAR_TIMEOUT_HANDLER';

// Action Creators
export const postForm = (uri, data) => dispatch => {
  dispatch({
    type: LOADING,
    payload: true
  });

  return api.post(uri, data).then(() => {
    dispatch({
      type: LOADING,
      payload: false
    });

    dispatch({
      type: SHOW_SNACKBAR,
      payload: true
    });

    const handler = setTimeout(
      () =>
        dispatch({
          type: SHOW_SNACKBAR,
          payload: false
        }),
      3000
    );

    dispatch({
      type: SAVE_SNACKBAR_TIMEOUT_HANDLER,
      payload: handler
    });
  });
};

export const pressOk = () => (dispatch, getState) => {
  const handler = getState().forms.snackBarTimeoutHandler;
  if (!handler) return;

  console.log(handler);
  clearTimeout(handler);

  dispatch({
    type: SHOW_SNACKBAR,
    payload: false
  });
};

// initialState
const initialState = {
  isLoading: false,
  showSnackbar: false,
  snackBarTimeoutHandler: null
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        showSnackbar: action.payload,
        snackBarTimeoutHandler: action.payload
          ? state.snackBarTimeoutHandler
          : null
      };
    case SAVE_SNACKBAR_TIMEOUT_HANDLER:
      return {
        ...state,
        snackBarTimeoutHandler: action.payload
      };
    default:
      return state;
  }
};

// Selectors
export const isLoading = ({ forms }) => forms.isLoading;
export const showSnackbar = ({ forms }) => forms.showSnackbar;
