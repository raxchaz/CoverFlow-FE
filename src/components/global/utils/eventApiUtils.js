import { EventSourcePolyfill } from 'event-source-polyfill';
import { BASE_URL, ACCESS_TOKEN } from '../constants/index.ts';

export const sse = new EventSourcePolyfill(
  `${BASE_URL}/api/notification/connect`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  },
);

export const handleConnect = async () => {
  const res = await fetch(`${BASE_URL}/api/notification/connect`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
  console.log('res', res);

  sse.addEventListener('connect', (event) => {
    const data = event;
    console.log('ssedata', data);
  });
};
