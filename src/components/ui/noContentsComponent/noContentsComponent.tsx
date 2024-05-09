import React from 'react';
import '../../../asset/sass/etc/noContentsComponent/noContentsComponents.scss';
import Icon from '../../../asset/image/noContents.svg';
import plus from '../../../asset/image/plus.svg';

interface NoContentsComponentProps {
  onClick: () => void;
  content1: string;
  content2: string;
  theme: string;
  noBtn?:boolean;
  extraMessage?:string;
  className?:string;
}
export default function NoContentsComponent({
  onClick,
  content1,
  content2,
  theme,
  noBtn,
  extraMessage,
  className
}: NoContentsComponentProps) {
  return (
    <div>
      <div className={`no-contents-wrapper ${className}`}>
        <img src={Icon} alt="icon" />
        <div>
          <div className="no-component-title">{content1}</div>
          <div className="no-component-title">{content2}</div>
        </div>
        <span className="no-component-diclaimer">
          {theme}
        </span>
       {noBtn ?(<div style={{height:"3rem"}}></div>): (<div className="no-component-plus-container" onClick={onClick}>
          <img className="no-component-plus" src={plus} alt="icon" />
          <span className="ask-question">{extraMessage}질문 하러가기</span>
        </div>)}
      </div>
    </div>)

}
