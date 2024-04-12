import React from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/etc/inputBox/textArea.scss';
export default function TextArea({
  name,
  placeholder,
  value,
  variant,
  handleChange,
}) {
  let variantClass;
  switch (variant) {
    case 'default':
      variantClass = 'textarea-field-contact';
      break;
    case 'round':
      variantClass = 'round textarea-field-contact';
      break;
  }

  return (
    <textarea
      spellCheck="false"
      type="text"
      className={variantClass}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
}

TextArea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'round']),
};

TextArea.defaultProps = {
  variant: 'default',
};
