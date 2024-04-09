import React from 'react';
import './currentFishBanner.scss';
import { useSelector } from 'react-redux';

interface UserState {
  rewardCount: number;
}

interface AppState {
  user: UserState;
}

export function CurrentFishBanner() {
  const { rewardCount } = useSelector((state: AppState) => state.user);
  return (
    <div className="current-fish-container">
      <span className="fish-bread-title">현재 보유한 붕어빵</span>
      <span className="fish-bread-title-orange">{rewardCount}</span>
    </div>
  );
}
