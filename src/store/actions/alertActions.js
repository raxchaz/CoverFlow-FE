import { SET_ALERT_COUNT } from './type';

export const alertCount = (count) => ({
  type: SET_ALERT_COUNT,
  payload: count,
});
