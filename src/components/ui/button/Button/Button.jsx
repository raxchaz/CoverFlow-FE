import React from 'react';
import PropTypes from 'prop-types';
import '../../../../asset/sass/etc/button/Button.scss';
export default function Button({ onClick, disabled, children, variant }) {
  // 버튼 컴포넌트 입니다. onClick, disabled, children를 인자로 받습니다.
  // 1. onClick: 클릭 이벤트를 props로 받습니다.
  // 2. disabled: 버튼 비활성화를 props로 받습니다.
  // 3. children: 버튼 안에 들어갈 내용을 props로 받습니다.
  // 공통 스타일을 추가하고 싶다면 아래 case와 Button.propTypes 안의 variant: PropTypes.oneOf~ 에 추가해주시면 됩니다.

  let variantClass;
  switch (variant) {
    case 'default':
      variantClass = 'Button';
      break;
  }

  return (
    <button
      type="submit"
      className={variantClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'big']),
};

Button.defaultProps = {
  disabled: false,
  variant: 'default',
};
