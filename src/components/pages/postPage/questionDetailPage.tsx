import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../../../asset/sass/pages/postPage/questionDetailPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import Answer from '../../ui/question/answer.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import { ACCESS_TOKEN } from '../../global/constants';
import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';
import Reward from '../../../asset/image/reward.svg';
import Dot from '../../../asset/image/dots-vertical.svg';
import '../../../asset/sass/etc/header/userInfoHeader.scss';

import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import Pagination from '../../ui/Pagination.tsx';
import { useSelector } from 'react-redux';

const ContentBlur = styled.span<{ $isLoggedIn: boolean }>`
  ${({ $isLoggedIn }) =>
    !$isLoggedIn &&
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      filter: blur(5px);
      text-overflow: ellipsis;
    `}
`;

const Questioner = styled.div`
  letter-spacing: -1px;
  margin-left: 2%;
`;

const QuestionTitle = styled.div`
  font-family: pretendard-semibold;
  letter-spacing: -1px;
  font-size: 30px;
  padding: 10px;
`;

const QuestionContent = styled.div`
  margin-top: 3%;
  margin-left: 2%;
  margin-bottom: 2%;
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

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  margin: 0px auto;
`;

export interface AnswerProps {
  answerId: string;
  answererTag: string;
  createAt: string;
  answerContent: string;
  answererNickname: string;
}

export interface CommentProps {
  data: {
    answerCount: number;
    answers: {
      answerId: string;
      answererTag: string;
      createAt: string;
      answerContent: string;
      answererNickname: string;
    }[];
  };
}

interface AppState {
  user: {
    isLoggedIn: boolean;
  };
}

function QuestionDetailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log('state: ', state);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nickName, setNickName] = useState('');

  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [postAnswer, setPostAnswer] = useState('');
  const [loadAnswer, setLoadAnswer] = useState<CommentProps>();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);

  const [isShowEdit, setIsShowEdit] = useState(false);

  const [showReport, setShowReport] = useState(false);

  const { questionId } = useParams();

  useEffect(() => {
    const loadAnswerList = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          showErrorToast('로그인이 필요합니다.');
          navigate(-1);
        }
      } catch (error) {
        if (error instanceof Error) showErrorToast(error.message);
      }
    };

    loadAnswerList();
  }, [currentPage, questionId, navigate, postAnswer]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerSubmit = async () => {
    // const answerer = questionDetail.map((detail) => detail.questionerNickname);

    const requestData = {
      content: answerRef.current ? answerRef.current.value : '',
      questionId: Number(questionId),
    };

    if (state.questioner === nickName) {
      showErrorToast('본인의 문의는 답변할 수 없습니다.');
      return;
    }

    const data = await fetchAPI('/api/answer', 'POST', requestData);

    if (
      state.questioner !== nickName &&
      data.statusCode === 'CREATED' &&
      answerRef.current &&
      !isLoggedIn
    ) {
      setPostAnswer(answerRef.current?.value);
      showSuccessToast('답변이 등록되었습니다.');
    }
  };

  const handlePagination = (direction: string | number) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  const toggleReportPopup = () => {
    if (state.questioner === nickName) {
      setIsShowEdit((isEdit) => !isEdit);
    } else {
      setShowReport(true);
    }
  };

  const handleEdit = () => {
    setIsShowEdit((isEdit) => !isEdit);
  };

  const handleReportSubmit = async () => {
    toggleReportPopup();
    await fetchAPI(`/api/report`, 'POST', {
      content: state.questionContent,
      type: 'QUESTION',
      id: state.questionId,
    });
  };

  const handleCloseReportPopup = () => {
    setShowReport(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAPI(
        `/api/question/${questionId}?pageNo=${currentPage}&criterion=createdAt`,
        'GET',
        null,
      );

      const {
        data: { totalPages },
      } = response;
      setLoadAnswer(response);
      setTotalPages(totalPages);

      const {
        data: { nickname },
      } = await fetchAPI('/api/member/me', 'GET');
      setNickName(nickname);
    };

    fetchData();
  }, [questionId, postAnswer, currentPage]);

  const reportReasons = [
    '욕설 혹은 비방표현이 있어요',
    '개인정보 노출 게시물이에요',
    '불법 정보를 포함하고 있어요',
    '스팸 혹은 홍보성 도배글이에요',
    '특정 이용자가 질문, 답변, 채택을 반복해요',
  ];

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="상세보기" handleGoBack={handleGoBack} />
      </StyledHeader>

      <div className="question-detail-container">
        <div className="job-info">
          <img src={Tree} alt="" />
          <span>
            {state.questionerTag === '취준생'
              ? `${state.questionerTag}이 남긴 글이에요.`
              : `${state.questionerTag}가 남긴 질문이에요.`}
          </span>

          <img onClick={toggleReportPopup} src={Dot} alt="dot" />
          {isShowEdit && (
            <div className="dropdown-menu">
              <ul style={{ right: '10px' }} onClick={handleEdit}>
                <li className="dropdown-item-edit">수정</li>
              </ul>
            </div>
          )}
        </div>
        <QuestionTitle>{state.questionTitle}</QuestionTitle>
        <div className="questioner-info">
          <Questioner>
            {state.questioner || 'Anonymous'} <span className="middle">•</span>
            <span className="question-date">{state.createAt}</span>
          </Questioner>
        </div>

        <QuestionContent>{state.questionContent}</QuestionContent>
        <div className="company-fish-tag">
          <div className="detailpage-company">{state.companyName}</div>
          <div className="detailpage-fishbuncount">
            <img src={Reward} alt="reward" />
            {state.reward}
          </div>
        </div>
        <FirstLine />
        {showReport && (
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

      <div className="comment-section">
        <textarea
          placeholder="답변을 입력해주세요.."
          className="comment-input"
          rows={4}
          ref={answerRef}
          maxLength={500}
        ></textarea>
        <button className="submit-comment" onClick={handleAnswerSubmit}>
          등록
        </button>
      </div>

      <ContentBlur $isLoggedIn={isLoggedIn}>
        <AnswerList>
          <div className="answer-title">
            답변 {loadAnswer?.data.answerCount}
          </div>
          {loadAnswer?.data.answers.map((answer) => (
            <Answer
              key={answer.answerId}
              createAt={answer.createAt}
              answerContent={answer.answerContent}
              answererNickname={answer.answererNickname}
              answererTag={answer.answererTag}
              answerId={answer.answerId}
            />
          ))}
        </AnswerList>
      </ContentBlur>
      <TabBar />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </StyledPage>
  );
}

export default QuestionDetailPage;
