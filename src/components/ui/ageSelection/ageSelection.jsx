import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../ageSelection/ageSelection.scss';

const AgeSelection = ({ onSelectAge }) => {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeKeywordClick = (ageKeyword) => {
    setSelectedAge((prevSelectedAge) =>
      prevSelectedAge === ageKeyword ? '' : ageKeyword,
    );

    onSelectAge(ageKeyword);
  };

  return (
    <div className="age-button-container">
      <div className="button-row">
        <button
          className={selectedAge === '10대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('10대')}
        >
          10대
        </button>
        <button
          className={selectedAge === '20대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('20대')}
        >
          20대
        </button>
        <button
          className={selectedAge === '30대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('30대')}
        >
          30대
        </button>
      </div>
      <div className="button-row">
        <button
          className={selectedAge === '40대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('40대')}
        >
          40대
        </button>
        <button
          className={selectedAge === '50대' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('50대')}
        >
          50대
        </button>
        <button
          className={selectedAge === '60대 이상' ? 'selected' : ''}
          onClick={() => handleAgeKeywordClick('60대 이상')}
        >
          60대
        </button>
      </div>
    </div>
  );
};

AgeSelection.propTypes = {
  onSelectAge: PropTypes.func.isRequired,
};

export default AgeSelection;
