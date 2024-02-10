import React from 'react';
import Back from '../../../asset/image/back.svg';
import PropTypes from 'prop-types';
import { Heading } from '../../../styledComponent';
import '../../../asset/sass/etc/header/titleHeader.scss';

function MyPageHeader({ pageTitle, handleGoBack }) {
  return (
    <Heading>
      <img className="back" src={Back} onClick={handleGoBack} alt="뒤로 가기" />
      <span className="page-title">{pageTitle}</span>
    </Heading>
  );
}

MyPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

export default MyPageHeader;
