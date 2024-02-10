import React from 'react';
import Back from '../../../asset/image/back.svg';
import PropTypes from 'prop-types';
import { Heading } from '../../../styledComponent';
import '../../../asset/sass/etc/header/titleHeader.scss';

function MyPageHeader({ pageTitle, handleGoBack }) {
  return (
    <Heading>
      <img
        className="back"
        src={Back}
        onClick={handleGoBack}
        alt="뒤로 가기"
        style={{ cursor: 'pointer' }}
      />
      <span className="page-title">{pageTitle}</span>
    </Heading>
  );
}

/*
아래는 해당 컴포넌트의 props 타입을 정의하는 로직입니다.

PropsTypes는 prop의 유형을 지정하여 해당 컴포넌트에 전달되는 props가 
예상된 타입과 일치하는지 일치하지 않는지 검증하는 역할을 하게 됩니다.

isRequired를 통해 해당 props들은 필수적으로 제공되어야 한다는 것을 명시합니다. 
이를 어겼을 경우, 콘솔에 경고 메시지가 출력되어 개발 과정에서의 오류를 쉽게 바로잡을 수 있습니다.
*/
MyPageHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func.isRequired,
};

export default MyPageHeader;
