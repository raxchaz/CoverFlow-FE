import { SET_ALERT_COUNT } from './actions/type';

const initialState = {
  count: 0,
};

function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

export default alertReducer;
