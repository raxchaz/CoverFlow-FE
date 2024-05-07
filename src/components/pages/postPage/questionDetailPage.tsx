import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import '../../../asset/sass/pages/postPage/questionDetailPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import TitleHeader from '../../ui/header/titleHeader';
import Answer from '../../ui/question/answer.tsx';
import TabBar from '../../ui/tabBar/tabBar';
import { BASE_URL } from '../../global/constants';
import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';
import Leaf from '../../../asset/image/leaf.svg';
import Reward from '../../../asset/image/reward.svg';
import Dot from '../../../asset/image/dots-vertical.svg';
import '../../../asset/sass/etc/header/userInfoHeader.scss';

import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import Pagination from '../../ui/Pagination.tsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  margin-left: 4.5%;
  span:first-child {
    font-family: 'Pretendard-Medium';
  }
`;

const QuestionTitle = styled.div`
  span {
    font-family: 'Pretendard-Bold';
    letter-spacing: -1.5px;
    font-size: 3rem;
    /* padding: 10px; */
    text-align: center;
    padding: 1% 3% 1% 1.5%;
    color: #000000;
    margin: 0 78% 2% 3%;
    overflow: hiddlen;
    white-space: nowrap;
  }
  display: flex;
  /* padding: 1% 2.5% 1% 2.5%; */
  align-items: center;
  img {
    cursor: pointer;
  }
`;

const QuestionContent = styled.div`
  margin: 3% 0% 2% 4.5%;
  letter-spacing: -1.5px;
  font-size: 2rem;
  color: #000000;
  font-family: 'Pretendard-Regular';
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
  answerTag?: string;
}

export interface CommentProps {
  answerCount?: number;
  isAdopted: boolean;
  answerId: string;
  answererTag: string;
  createAt: string;
  answerContent: string;
  answererNickname: string;
}

interface AppState {
  user: {
    isLoggedIn: boolean;
  };
}

function QuestionDetailPage() {
  const navigate = useNavigate();

  const { questionId } = useParams();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [questionerNickname, setQuestionerNickname] = useState('');
  // const [answererNickname, setAnswererNickname] = useState('');

  const [questionerTag, setQuestionerTag] = useState('');
  const [answerCount, setAnswerCount] = useState(0);
  const [questionTitle, setQuestionTitle] = useState('');
  const [createAt, setCreateAt] = useState('');
  const [reward, setReward] = useState(0);
  const [companyName, setCompanyName] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [answers, setAnswers] = useState<CommentProps[]>([]);

  const answerRef = useRef<HTMLTextAreaElement>(null);
  const [postAnswer, setPostAnswer] = useState('');

  const { isLoggedIn } = useSelector((state: AppState) => state.user);

  const [isShowEdit, setIsShowEdit] = useState(false);

  const [isShowReport, setIsShowReport] = useState(false);
  const [isShowReportModal, setIsShowReportModal] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);
  const [anyAdopted, setAnyAdopted] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerSubmit = async () => {
    const requestData = {
      content: answerRef.current ? answerRef.current.value : '',
      questionId: Number(questionId),
    };

    try {
      // 답변 내용이 비어있을 경우 에러 던지기
      if (answerRef.current?.value === '') {
        throw new Error('크기가 1에서 500 사이여야 합니다');
      }

      const answerResponse = await fetchAPI('/api/answer', 'POST', requestData);
      if (answerResponse.statusCode === 'CREATED' && answerRef.current) {
        setPostAnswer(answerRef.current?.value);
        showSuccessToast('답변이 등록되었습니다.');

        if (answerRef.current) {
          answerRef.current.value = '';
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast('질문 작성자는 답변 작성이 불가능합니다.');
        if (error.message === '크기가 1에서 500 사이여야 합니다') {
          showErrorToast(error.message);
        }
      }
    }
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      handleAnswerSubmit();
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
    setIsShowReport((showReport) => !showReport);
    setIsShowReportModal((showReportModal) => !showReportModal);
  };

  const handleEdit = async () => {
    const res = await fetchAPI('/api/member/me', 'GET');

    if (res.data.nickname === questionerNickname) {
      setIsShowEdit(true);
      setIsShowReport(false);
    } else if (res.data.nickname !== questionerNickname) {
      setIsShowReport((showReport) => !showReport);
    }
  };

  const handleClickEdit = async () => {
    const editBody = {
      title: questionTitle,
      content: questionContent,
      questionStatus: false,
    };
    // console.log('edit');
    try {
      await fetchAPI(`/api/question/${questionId}`, 'PATCH', editBody);
    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message);
    }
  };

  const handleClickDelete = async () => {
    // console.log('delete');
    const deleteBody = {
      title: questionTitle,
      content: questionContent,
      questionStatus: false,
    };
    try {
      await fetchAPI(`/api/question/${questionId}`, 'DELETE', deleteBody);
    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message);
    }
  };

  const handleReportSubmit = async () => {
    toggleReportPopup();
    await fetchAPI(`/api/report`, 'POST', {
      content: questionContent,
      type: 'QUESTION',
      id: questionId,
    });

    showSuccessToast('신고 접수가 되었습니다.');
  };

  const handleCloseReportPopup = () => {
    setIsShowReportModal(false);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/question/${questionId}?pageNo=${currentPage}&criterion=createdAt`,
    );
    const data = response.data.data;

    const sortedAnswers = data.answers.sort((a, b) => {
      if (a.selection && !b.selection) return -1;
      if (!a.selection && b.selection) return 1;
      return 0;
    });
    const adoptedExists = data.answers.some(
      (answer) => answer.selection === true,
    );
    setAnyAdopted(adoptedExists);
    setAnswers(
      sortedAnswers.map((answer) => ({
        ...answer,
        isAdopted: answer.selection,
      })),
    );

    setQuestionerNickname(data.questionerNickname);
    setQuestionerTag(data.questionerTag);
    setAnswerCount(data.answerCount);
    setQuestionTitle(data.questionTitle);
    setCreateAt(data.createAt);
    setReward(data.reward);
    setCompanyName(data.companyName);
    setQuestionContent(data.questionContent);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
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
          <img src={questionerTag === '취준생' ? Leaf : Tree} alt="" />
          <span className={questionerTag === '취준생' ? `leaf` : ''}>
            {questionerTag === '취준생'
              ? `${questionerTag}이 남긴 질문이에요`
              : `${questionerTag}가 남긴 질문이에요`}
          </span>
        </div>
        <QuestionTitle>
          <span>{questionTitle}</span>
          <img onClick={handleEdit} src={Dot} alt="dot" />
          {isShowEdit && (
            <div className="dropdown-question-detail-menu">
              <ul>
                <li onClick={handleClickEdit} className="dropdown-item-edit">
                  수정
                </li>

                <li
                  onClick={handleClickDelete}
                  className="dropdown-item-delete"
                >
                  삭제
                </li>
                {/*
                 */}
              </ul>
            </div>
          )}
          {isShowReport ? (
            <div className="dropdown-question-detail-report-menu">
              <ul>
                <li
                  onClick={toggleReportPopup}
                  className="dropdown-item-report"
                >
                  신고
                </li>
              </ul>
            </div>
          ) : null}
        </QuestionTitle>

        <div className="questioner-info">
          <Questioner>
            <span>{questionerNickname || 'Anonymous'}</span>
            <span className="middle">•</span>
            <span className="question-date">{createAt}</span>
          </Questioner>
        </div>

        <QuestionContent>{questionContent}</QuestionContent>
        <div className="company-fish-tag">
          <div className="detailpage-company">{companyName}</div>
          <div className="detailpage-fishbuncount">
            <img src={Reward} alt="reward" />
            {reward}
          </div>
        </div>
        <FirstLine />
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

      {!isAdopted && (
        <div className="comment-section">
          <textarea
            placeholder="답변을 입력해주세요.."
            className="comment-input"
            ref={answerRef}
            maxLength={500}
            onKeyDown={handleEnterKey}
          ></textarea>
          <button className="submit-comment" onClick={handleAnswerSubmit}>
            등록
          </button>
        </div>
      )}

      <ContentBlur $isLoggedIn={isLoggedIn}>
        <AnswerList>
          <div className="answer-title">
            <span>답변</span>
            <span> {answerCount}</span>
          </div>

          {answers.map((answer) => (
            <Answer
              key={answer.answerId}
              createAt={answer.createAt}
              answerContent={answer.answerContent}
              answererNickname={answer.answererNickname}
              answererTag={answer.answererTag}
              answerId={answer.answerId}
              isAdopted={answer.isAdopted}
              setIsAdopted={setIsAdopted}
              fetchData={fetchData}
              anyAdopted={anyAdopted}
            />
          ))}
        </AnswerList>
        <TabBar />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePagination={handlePagination}
          className={answers.length === 0 ? 'hidden' : ''}
        />
      </ContentBlur>
    </StyledPage>
  );
}

export default QuestionDetailPage;
