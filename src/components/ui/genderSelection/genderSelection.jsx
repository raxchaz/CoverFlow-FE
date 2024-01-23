import React, { useState } from 'react';
import '../genderSelection/genderSelection.scss';

const genderSelection = () => {
  const [selectedGenderKeyword, setSelectedGenderKeyword] = useState('');

  const handleGenderKeywordClick = (genderKeyword) => {
    setSelectedGenderKeyword(genderKeyword);
  };

  return (
    <div className="button-container">
      <button
        className={selectedGenderKeyword === '여성' ? 'selected' : ''}
        onClick={() => handleGenderKeywordClick('여성')}
      >
        {' '}
        여성
      </button>
      <button
        className={selectedGenderKeyword === '남성' ? 'selected' : ''}
        onClick={() => handleGenderKeywordClick('남성')}
      >
        {' '}
        남성
      </button>
      <button
        className={
          selectedGenderKeyword === '밝히고 싶지 않음' ? 'selected' : ''
        }
        onClick={() => handleGenderKeywordClick('밝히고 싶지 않음')}
      >
        {' '}
        밝히고 싶지 않음
      </button>
    </div>
  );
};

export default genderSelection;
