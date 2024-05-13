import { fetchAPI } from './apiUtil';
import { alertCount } from '../../../store/actions/alertActions';

export const fetchUnreadNotificationsCount = async (dispatch) => {
  try {
    const data = await fetchAPI('/api/notification', 'GET');
    // console.log(data);
    if (data) {
      // console.log(data.data.noReadElements);
      dispatch(alertCount(data.data.noReadElements));
    } else {
      throw new Error('realtime-alert-error');
    }
  } catch (error) {
    console.error(error);
  }
};
