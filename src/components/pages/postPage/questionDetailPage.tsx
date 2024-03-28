import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../../../asset/sass/pages/postPage/questionDetailPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import Answer from '../../ui/question/answer.jsx';
import TabBar from '../../ui/tabBar/tabBar';
import { ACCESS_TOKEN } from '../../global/constants';
import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';

import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';

const Questioner = styled.div`
  font-family: pretendard-bold;
  letter-spacing: -1px;
  margin-left: 2%;
`;

const QuestionerTag = styled.div`
  letter-spacing: -1px;
  margin-left: -44%;
  margin-top: 0.5%;
  font-size: 13px;
`;

const QuestionTitle = styled.div`
  margin-top: 5%;
  font-family: pretendard-semibold;
  letter-spacing: -1px;
  font-size: 18px;
  padding: 10px;
`;

const QuestionContent = styled.div`
  margin-top: 7%;
  margin-left: 2%;
  margin-bottom: 7%;
  letter-spacing: -1px;
  font-family: pretendard-light;
  line-height: 1.5;
`;

const FirstLine = styled.div`
  height: 1px;
  background-color: #cecece;
  width: 100%;
  margin: 5% 0% 0% 0%;
`;

// const LastLine = styled.div`
//   height: 0.5px;
//   background-color: #cecece;
//   width: 85%;
//   margin: 10% 0% 0% 9%;
// `;

const AnswerList = styled.div``;

interface AnswerProps {
  answerId: string;
  answerer: string;
  answerTag: string;
  createAt: string;
  replyCount: string;
  answerContent: string;
  onAdopt: () => void;
  answerNickname: string;
  content: string;
}

interface QuestionDetailProps {
  questionId: string;
  title: string;
  questionContent: string;
  answerCount: number;
  reward: number;
  questionNickname: string;
  questionTag: string;
  createAt: string;
  answers: AnswerProps[];
}

function QuestionDetailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [answer, setAnswer] = useState('');
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [questionDetail, setQuestionDetail] = useState<QuestionDetailProps>({
    questionId: '',
    title: '',
    questionContent: '',
    answerCount: 0,
    reward: 0,
    questionNickname: '',
    questionTag: '',
    createAt: '',
    answers: [],
  });

  const { questionId } = useParams();

  // function formatDate(fullDate: string) {
  //   const date = new Date(fullDate);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }

  useEffect(() => {
    const fecthQuestionDetail = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        showErrorToast('로그인이 필요합니다.');
        navigate(-1);
      }
      if (questionId) {
        const data = await fetchAPI(`/api/question/${questionId}`, 'GET', null);

        const questionData = data.data;
        const updatedQuestionDetail = {
          ...questionData,
          answers: [...questionData.answers],
        };

        setQuestionDetail(updatedQuestionDetail);
      }
    };
    fecthQuestionDetail();
  }, [answer]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerSubmit = async () => {
    const questionId = questionDetail && questionDetail.questionId;

    const requestData = {
      content: answerRef.current ? answerRef.current.value : '',
      questionId,
    };

    // console.log('답변 제출 중:', requestData);

    const data = await fetchAPI('/api/answer', 'POST', requestData);

    if (data.statusCode === 'CREATED') {
      showSuccessToast('답변이 등록되었습니다.');
      if (answerRef.current) setAnswer(answerRef.current?.value);
    }
  };

  const toggleReportPopup = () => {
    setShowReportPopup(!showReportPopup);
  };

  const handleReportSubmit = async () => {
    toggleReportPopup();
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상세보기" handleGoBack={handleGoBack} />
      </StyledHeader>

      <div className="question-detail-container">
        <div className="job-info">
          <img src={Tree} alt="" />
          현직자가 남긴 글이에요
        </div>
        <QuestionTitle>
          {/* <img className="questionicon-img" src={Questitle} /> */}
          {state.questionTitle}
        </QuestionTitle>
        <div className="questioner-info">
          <Questioner>
            {state.questioner || 'Anonymous'}{' '}
            <span className="question-date">{state.createAt}</span>
          </Questioner>

          <QuestionerTag>{state.questionerTag}</QuestionerTag>
        </div>

        <QuestionContent>{state.questionContent}</QuestionContent>
        <div className="company-fish-tag">
          <div className="detailpage-company">카카오</div>
          <div className="detailpage-fishbuncount">{state.reward}</div>
        </div>
        <FirstLine />
        <div className="view-info-container">
          {/* <img className="answer-img" src={Chat} />
          <span className="answer-count">{questionDetail.answerCount}</span>

          <img className="answerview-img" src={View} /> */}

          {/* <img
            className="report-img"
            src={Report}
            onClick={toggleReportPopup}
          /> */}
        </div>
        {showReportPopup && (
          <div className="report-popup-overlay">
            <div className="report-popup">
              <div className="report-title">신고 사유를 선택하세요</div>
              <label>
                <input type="checkbox" name="reason" value="reason1" /> 욕설
                혹은 비방표현이 있어요
              </label>
              <label>
                <input type="checkbox" name="reason" value="reason2" /> 개인정보
                노출 게시물이에요
              </label>
              <label>
                <input type="checkbox" name="reason" value="reason3" /> 불법
                정보를 포함하고 있어요
              </label>
              <label>
                <input type="checkbox" name="reason" value="reason4" /> 스팸
                혹은 홍보성 도배글이에요
              </label>
              <label>
                <input type="checkbox" name="reason" value="reason5" /> 특정
                이용자가 질문, 답변, 채택을 반복해요
              </label>

              <div className="reportBtn">
                <button
                  className="close-report-popup"
                  onClick={toggleReportPopup}
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

      <div className="comment-section">
        <textarea
          placeholder="답변을 입력해주세요.."
          className="comment-input"
          rows={4}
          ref={answerRef}
        ></textarea>
        <button className="submit-comment" onClick={handleAnswerSubmit}>
          등록
        </button>
      </div>
      {/* <LastLine /> */}

      <AnswerList>
        <div className="answer-title">답변</div>
        {questionDetail.answers.map((answer, index) => (
          <Answer
            key={index}
            answerId={answer.answerId.toString()}
            answerer={answer.answerNickname}
            answererTag={answer.answerTag}
            replyCount={'0'}
            answerContent={answer.content}
            createAt={answer.createAt}
          />
        ))}
      </AnswerList>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionDetailPage;
