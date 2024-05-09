import React from 'react';
import '../../../asset/sass/etc/selection/fishTag.scss';
import Finger from '../../../asset/image/fingerprint.svg';
interface RewardProps {
  reward: number;
  setReward: React.Dispatch<React.SetStateAction<number>>;
}

function TagInput({ reward, setReward }: RewardProps) {
  // const [reward, setReward] = useState(0);
  const rewards = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleRewardChange = (value: number) => {
    setReward(value);
  };

  return (
    <div className="tag-input">
      <div className="category-container fish-explanation-title">
        <div className="category-wrapper">
          <img className="finger-image" src={Finger} alt="finger" />
        </div>
        <div className="fish-disclaimer-info">
          ※ 질문 시 기본적으로 붕어빵 10개가 우선 차감 됩니다.
        </div>
        <span>질문에 걸 붕어빵의 개수를 지정해주세요</span>
      </div>
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
