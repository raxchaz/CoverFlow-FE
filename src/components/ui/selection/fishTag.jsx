import React from 'react';
import '../../../asset/sass/etc/selection/fishTag.scss';
import PropTypes from 'prop-types';

function TagInput({ reward, setReward }) {
  const rewards = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleRewardChange = (value) => {
    setReward(value);
  };

  return (
    <div className="tag-input">
      <div className="fish-info">보상으로 걸 붕어빵의 수를 정해주세요</div>
      <div className="carousel">
        {rewards.map((value) => (
          <span
            key={value}
            onClick={() => handleRewardChange(value)}
            className={`reward-tag ${reward === value ? 'selected' : ''}`}
          >
            {value}개
          </span>
        ))}
      </div>
    </div>
  );
}

export default TagInput;

TagInput.propTypes = {
  reward: PropTypes.number.isRequired,
  setReward: PropTypes.func.isRequired,
};
