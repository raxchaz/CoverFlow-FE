import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/etc/selection/secessionSelection.scss';

function SecessionSelection({ onReasonChange }) {
  const [selectedReason, setSelectedReason] = useState('');

  const handleChange = (event) => {
    const newReason = event.target.value;
    setSelectedReason(newReason);

    if (onReasonChange) {
      onReasonChange(newReason);
    }
  };

  return (
    <div className="secession-reason-dropdown">
      <select
        id="secession-reason"
        value={selectedReason}
        onChange={handleChange}
        className="secession-reason-select"
      >
        <option value="">이유를 선택해 주세요</option>
        <option value="no-desired-job">원하는 직무가 없어요</option>
        <option value="no-desired-company">원하는 회사가 없어요</option>
        <option value="service-inconvenience">
          서비스를 이용하기가 불편해요
        </option>
        <option value="other">기타 / 직접 입력</option>
      </select>
    </div>
  );
}

SecessionSelection.propTypes = {
  onReasonChange: PropTypes.func,
};

export default SecessionSelection;
