import React, { useState } from 'react';
import '../ageSelection/ageSelection.scss';

const AgeSelection = () => {
  const [selectedAgeKeyword, setSelectedAgeKeyword] = useState('');

  const handleAgeKeywordClick = (ageKeyword) => {
    setSelectedAgeKeyword(ageKeyword);
  };

  return (
    <div className="button-container">
      <div className="button-row">
        <button
          className={selectedAgeKeyword === '10대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('10대')}
        >
          10대
        </button>
        <button
          className={selectedAgeKeyword === '20대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('20대')}
        >
          20대
        </button>
        <button
          className={selectedAgeKeyword === '30대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('30대')}
        >
          30대
        </button>
      </div>
      <div className="button-row">
        <button
          className={selectedAgeKeyword === '40대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('40대')}
        >
          40대
        </button>
        <button
          className={selectedAgeKeyword === '50대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('50대')}
        >
          50대
        </button>
        <button
          className={selectedAgeKeyword === ' 60대 이상' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick(' 60대 이상')}
        >
          60대 이상
        </button>
      </div>
    </div>
  );
};

export default AgeSelection;
