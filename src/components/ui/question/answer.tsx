import React, { useState } from 'react';
import '../../../asset/sass/etc/question/answer.scss';
import styled from 'styled-components';
import yellowTrophy from '../../../asset/image/yellow-trophy.svg';
import Trophy from '../../../asset/image/trophy.svg';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';
import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';
import Leaf from '../../../asset/image/leaf.svg';
import { useSelector } from 'react-redux';

interface UserState {
  myNickname: string;
}

interface AppState {
  user: UserState;
}
const AdoptedTag = styled.div`
  position: relative;
  width: 95px;
  height: 25px;
  border: 1px solid #ff8d1d;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: #ff8d1d;
  letter-spacing: -1px;
  font-family: Pretendard-Medium;
  top: 1rem;
  left: 21.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 1rem;
`;
const AdoptButton = styled.button`
  display: flex;
  margin: 0px !important;
  padding: 5px;
  width: 85px;
  height: 25px;
  color: #428238;
  position: relative;
  font-size: 1.2rem;
  letter-spacing: -1px;
  border-radius: 5px;
  font-family: 'Pretendard-Medium';
  justify-content: space-evenly;
  border: 1px solid #428238;
  &:not(.selected) {
    background-color: transparent;
    color: #428238;
  }
  justify-content: space-around;
  align-items: center;
  img {
    width: 13px;
    height: 13px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-contents: center;
  align-items: center;
  font-size: 1.7rem;
  letter-spacing: -1px;
  font-family: 'Pretendard-SemiBold';
`;
const ImageContainer = styled.img`
  vertical-align: middle;
  width: 18px;
  height: 16px;
`;

const AnswerName = styled.span`
  font-size: 1.7rem;
  color: #000000;
  letter-spacing: -1px;
  vertical-align: middle;
`;

const AnswerContent = styled.div`
  white-space: pre-line;
  font-size: 1.8rem;
  letter-spacing: -1px;
  font-family: Pretendard-Regular;
  margin-top: 1.5rem;
`;

const BottomContainer = styled.div`
  /* vertical-align: middle; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 3.5rem;
`;

interface AnswerDetailProps {
  createAt: string;
  answerContent: string;
  answererNickname: string;
  answererTag?: string;
  answerId?: string;
  isAdopted: boolean;
  setIsAdopted: (isAdopted: boolean) => void;
  fetchData: () => void;
  anyAdopted: boolean;
}

function AnswerModule({
  createAt,
  answerContent,
  answererNickname,
  answerId,
  isAdopted,
  setIsAdopted,
  fetchData,
  anyAdopted,
}: AnswerDetailProps) {
  const [questionerTag, setQuestionerTag] = useState('');
  const { myNickname } = useSelector((state: AppState) => state.user);

  console.log(setQuestionerTag); //
  const handleAdoptAnswer = async () => {
    if (confirm('채택하시겠습니까?')) {
      await fetchAPI(`/api/answer/selection/${answerId}`, 'PATCH', {
        selection: true,
      });
      setIsAdopted(true);
      fetchData();
      showSuccessToast('답변이 채택되었습니다.');
    }
  };

  return (
    <>
      {isAdopted && (
        <AdoptedTag>
          <img src={yellowTrophy} alt="trophy" />
          채택된 답변
        </AdoptedTag>
      )}
      <div
        className={`answer-container ${isAdopted ? 'adopted' : 'notadopted'}`}
      >
        <div>
          <NameContainer>
            <ImageContainer
              src={questionerTag === '취준생' ? Leaf : Tree}
              alt=""
            />
            <AnswerName>{answererNickname}</AnswerName>
          </NameContainer>
          <AnswerContent className="user-contents">
            {answerContent}
          </AnswerContent>
          <BottomContainer>
            <div className="user-container">{createAt}</div>
            {isAdopted || anyAdopted || myNickname !== answererNickname ? (
              <div style={{ height: '25px' }}></div>
            ) : (
              <AdoptButton onClick={handleAdoptAnswer}>
                <img src={Trophy} alt="trophy" />
                채택하기
              </AdoptButton>
            )}
          </BottomContainer>
        </div>
      </div>
    </>
  );
}

export default AnswerModule;
