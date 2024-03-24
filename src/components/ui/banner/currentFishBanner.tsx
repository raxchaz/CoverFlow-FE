import React from 'react';
import './currentFishBanner.scss';
export function CurrentFishBanner() {
  return (
    <div className="current-fish-container">
      <span className="fish-bread-title">현재 보유한 붕어빵</span>
      <span className="fish-bread-title-orange">300</span>
    </div>
  );
}
