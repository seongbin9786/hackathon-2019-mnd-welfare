import { combineReducers } from 'redux';

import forms from './forms';
import items from './items';

// 여러개의 리듀서가 있을 때에는, redux 의 함수 combineReducers 를 사용하여 하나의 루트 리듀서로 합쳐줍니다.
export default combineReducers({ forms, items });
