import React from 'react';
import Back from '../../../asset/image/back.svg';
import { Heading } from '../../../styledComponent';
import '../../../asset/sass/etc/header/titleHeader.scss';

interface TitleHeaderProps {
  pageTitle: string;
  handleGoBack: () => void;
}

function TitleHeader({ pageTitle, handleGoBack }: TitleHeaderProps) {
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

export default TitleHeader;
