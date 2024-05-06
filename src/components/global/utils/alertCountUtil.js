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
      throw new Error('알림 카운트 변경 실패 ');
    }
  } catch (error) {
    console.error('알림 카운트 가져오기 실패', error);
  }
};
