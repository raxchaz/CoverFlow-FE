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
import Dot from '../../../asset/image/dots-vertical.svg';

interface UserState {
  myNickName: string;
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
  font-size: 1.7rem;
  letter-spacing: -1px;
  font-family: 'Pretendard-SemiBold';
  display: flex;
  align-items: center;
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
  questionerNickname: string;
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
  answererTag,
  questionerNickname,
}: AnswerDetailProps) {
  const { myNickName } = useSelector((state: AppState) => state.user);

  const [isShowReport, setIsShowReport] = useState(false);
  const [isShowReportModal, setIsShowReportModal] = useState(false);
  const [selectedAnswerId, setSelectAnswerId] = useState<string | undefined>(
    '',
  );

  const handleReportModal = async (id: string | undefined) => {
    const res = await fetchAPI('/api/member/me', 'GET');
    if (res.data.nickname !== answererNickname) {
      setIsShowReport((showReport) => !showReport);
      if (selectedAnswerId === id) {
        setIsShowReport((show) => !show);
      } else {
        setIsShowReport(true);
        setSelectAnswerId(id);
      }
    }
  };

  const toggleReportPopup = () => {
    setIsShowReport((showReport) => !showReport);
    setIsShowReportModal((showReportModal) => !showReportModal);
  };

  const handleReportSubmit = async () => {
    toggleReportPopup();
    await fetchAPI(`/api/report`, 'POST', {
      content: answerContent,
      type: 'ANSWER',
      id: answerId,
    });

    showSuccessToast('신고 접수가 되었습니다.');
  };

  const handleCloseReportPopup = () => {
    setIsShowReportModal(false);
  };

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

  const reportReasons = [
    '욕설 혹은 비방표현이 있어요',
    '개인정보 노출 게시물이에요',
    '불법 정보를 포함하고 있어요',
    '스팸 혹은 홍보성 도배글이에요',
    '특정 이용자가 질문, 답변, 채택을 반복해요',
  ];

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
          <div className="answer-container-info">
            <NameContainer>
              <ImageContainer
                src={answererTag === '취준생' ? Leaf : Tree}
                alt=""
              />
              <AnswerName>{answererNickname}</AnswerName>
            </NameContainer>
            <img
              src={Dot}
              alt="dot"
              onClick={() => handleReportModal(answerId)}
            />
          </div>
          <AnswerContent className="user-contents">
            {answerContent}
          </AnswerContent>

          {isShowReport ? (
            <div className="dropdown-question-detail-report-menu-answer">
              <ul>
                <li
                  onClick={toggleReportPopup}
                  className="dropdown-item-report-answer"
                >
                  신고
                </li>
              </ul>
            </div>
          ) : null}
          <BottomContainer>
            <div className="user-container">{createAt}</div>
            {isAdopted || anyAdopted || myNickName !== questionerNickname ? (
              <div style={{ height: '25px' }}></div>
            ) : (
              <AdoptButton onClick={handleAdoptAnswer}>
                <img src={Trophy} alt="trophy" />
                채택하기
              </AdoptButton>
            )}
          </BottomContainer>
        </div>
        {isShowReportModal && (
          <div className="report-popup-overlay">
            <div className="report-popup">
              <div className="report-title">사용자 신고</div>
              <div className="report-sub-title">사유 선택</div>

              {reportReasons.map((reason, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name="reason"
                    value={`reason${index + 1}`}
                  />
                  {reason}
                </label>
              ))}

              <div className="reportBtn">
                <button
                  className="close-report-popup"
                  onClick={handleCloseReportPopup}
                >
                  닫기
                </button>
                <button className="submit-report" onClick={handleReportSubmit}>
                  신고하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AnswerModule;
