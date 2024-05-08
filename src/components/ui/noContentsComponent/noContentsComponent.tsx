import React from 'react';
import '../../../asset/sass/etc/noContentsComponent/noContentsComponents.scss';
import Icon from '../../../asset/image/noContents.svg';
import plus from '../../../asset/image/plus.svg';

interface NoContentsComponentProps {
  onClick: () => void;
  content1: string;
  content2: string;
  theme: string;
}
export default function NoContentsComponent({
  onClick,
  content1,
  content2,
  theme,
}: NoContentsComponentProps) {
  return (
    <div>
      <div className="no-contents-wrapper">
        <img src={Icon} alt="icon" />
        <div className="no-component-title">{content1}</div>
        <div className="no-component-title">{content2}</div>
        <span className="no-component-diclaimer">
          {theme}을 남기고, 답변을 확인해 보세요!
        </span>
        <div className="no-component-plus-container" onClick={onClick}>
          <img className="no-component-plus" src={plus} alt="icon" />
          <span className="ask-question">질문 하러가기</span>
        </div>
      </div>
    </div>
  );
}
