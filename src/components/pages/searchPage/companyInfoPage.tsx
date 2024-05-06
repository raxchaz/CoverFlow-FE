import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.tsx';
import '../../../asset/sass/pages/searchPage/companyInfoPage.scss';
import Question from '../../ui/question/question.tsx';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants/index.ts';
import { StyledHeader, StyledPage } from '../../../styledComponent.ts';
import SearchInput from '../../ui/searchInput/searchInput.tsx';
import { showErrorToast } from '../../ui/toast/toast.tsx';
import axios from 'axios';
import Pagination from '../../ui/Pagination.tsx';
import '../../../asset/sass/pages/notificationPage/notificationList.scss';

const CompanyContainer = styled.div`
  background-color: #ffffff;
  margin: 5% 0% 5% 15%;
  padding: 0px;
  /* border: 1.5px solid #ff8d1d; */
  width: 70%;
  display: flex;
  border-radius: 10px;
`;

const CompanyName = styled.div`
  font-size: 3rem;
  letter-spacing: -1px;
  font-weight: 800;
  margin-bottom: 0.6rem;
  font-family: 'Pretendard-ExtraBold';
  span {
    font-size: 1.4rem;
    color: #474646;
    font-family: 'Pretendard-Medium';
    letter-spacing: -1px;
  }
`;

// const CompanyType = styled.div`
//   font-size: 13px;
//   color: cecece;
//   letter-spacing: -1px;
//   margin-top: 3%;
// `;

const Line = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  width: 80%;
  margin: 10% 0% 5% 10%;
`;

// const CompanyAddress = styled.div`
//   margin-right: 12%;
// `;

const QuestionButton = styled.button`
  letter-spacing: -0.7px;
  background-color: #ff8d1d !important;
  /* border-radius: 3px; */
  font-weight: 600;
  font-size: 18px;
  width: 105px;
  height: 35px;
  border-radius: 2px;
  font-size: 1.8rem;
  color: #ffffff;
  letter-spacing: -1px;

  font-family: 'Pretendard-ExtraBold';
`;

const QuestionList = styled.div`
  overflow: visible;
`;

// ================================================================

interface Questions {
  answerCount: number;
  createAt: string;
  questionCategory: string;
  questionContent: string;
  questionId: number;
  questionTag: string;
  questionTitle: string;
  questionViewCount: number;
  questionerNickname: string;
  questionerTag: string;
  reward: number;
}

export interface CompanInfoProps {
  companyAddress: string;
  companyId: number;
  companyName: string;
  companyType: string;
  questionCount: number;
  questions: Questions[];
}

function CompanyInfoPage() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanInfoProps>();
  const { companyId } = useParams();
  const [questionsCount, setQuestionCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState(['']);

  const handleCategoryClick = async (category: string) => {
    const getCategoryClick = (category: string) => {
      switch (category) {
        case '사내문화':
          return 'CULTURE';
        case '급여연봉':
          return 'SALARY';
        case '업무방식':
          return 'BUSINESS';
        case '승진커리어':
          return 'CAREER';
        case '직무워라밸':
          return 'WORKLIFEBALANCE';
        default:
          return '';
      }
    };

    const selectedCategory = getCategoryClick(category);
    // console.log('selectedCategory: ', selectedCategory);

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      setSelectedCategories([category]);
    }

    try {
      let apiUrl;
      if (selectedCategory !== '') {
        apiUrl = `${BASE_URL}/api/company/${companyId}?pageNo=0&criterion=createdAt&questionTag=${selectedCategory || null}`;
      } else {
        apiUrl = `${BASE_URL}/api/company/${companyId}?pageNo=0&criterion=createdAt`;
      }
      // console.log(apiUrl);
      const { data } = await axios.get(apiUrl);

      if (data) {
        setCompanyData(data.data);
        setQuestionCount(data.data.totalElements);
      } else {
        throw new Error('데이터가 존재하지 않습니다.');
      }
    } catch (error) {
      if (error instanceof Error) showErrorToast(error.message);
      navigate(-1);
    }
  };

  localStorage.setItem('prevPage', window.location.pathname);

  const handlePagination = (direction: string | number) => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (typeof direction === 'number') {
      setCurrentPage(direction);
    }
  };

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/company/${companyId}?pageNo=${currentPage}&criterion=createdAt`,
        );

        if (data) {
          setCompanyData(data.data);
          setTotalPages(data.data.totalPages);
        } else {
          throw new Error('데이터가 존재하지 않습니다.');
        }
      } catch (error) {
        if (error instanceof Error) showErrorToast(error.message);
        navigate(-1);
      }
    }

    fetchCompanyData();
  }, [companyId, currentPage]);

  const handleQuestionClick = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      navigate(`/company-info/${companyId}/question-write`, {
        state: companyData?.companyName,
      });
    } else if (confirm('로그인이 필요합니다. 로그인 하시겠습니까?') === true) {
      navigate(`/login`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="기업 상세" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        <SearchInput />
      </StyledHeader>

      {companyData && (
        <>
          <CompanyContainer>
            <div className="company">
              <div className="main-company-info">
                <CompanyName>{companyData?.companyName}</CompanyName>
                <span>에 관련된 질문들을 모아봤어요</span>
              </div>
              <QuestionButton onClick={handleQuestionClick}>
                질문하기
              </QuestionButton>
            </div>
          </CompanyContainer>
          <div className="selected-category-container">
            <div className="selected-category-wrapper">
              <div
                onClick={() => handleCategoryClick('사내문화')}
                className={`selected-category-item ${selectedCategories.includes('사내문화') ? 'active' : ''}`}
              >
                사내
                <br />
                문화
              </div>

              <div
                onClick={() => handleCategoryClick('급여연봉')}
                className={`selected-category-item ${selectedCategories.includes('급여연봉') ? 'active' : ''}`}
              >
                급여
                <br />
                연봉
              </div>
              <div
                onClick={() => handleCategoryClick('업무방식')}
                className={`selected-category-item ${selectedCategories.includes('업무방식') ? 'active' : ''}`}
              >
                업무
                <br />
                방식
              </div>
            </div>
            <div className="selected-category-wrapper">
              <div
                onClick={() => handleCategoryClick('승진커리어')}
                className={`selected-category-item ${selectedCategories.includes('승진커리어') ? 'active' : ''}`}
              >
                승진
                <br />
                커리어
              </div>
              <div
                onClick={() => handleCategoryClick('직무워라밸')}
                className={`selected-category-item ${selectedCategories.includes('직무워라밸') ? 'active' : ''}`}
              >
                직무
                <br />
                워라밸
              </div>
            </div>
          </div>
          <Line />

          <div className="question-info-container">
            <div className="company-question-title">
              <span>질문</span>
              <div className="question-count">{questionsCount}</div>
            </div>
          </div>

          <QuestionList>
            {companyData.questions.map((question, index) => (
              <Question
                key={index}
                companyId={companyId}
                questionId={question.questionId}
                questioner={question.questionerNickname}
                questionerTag={question.questionerTag}
                answerCount={question.answerCount}
                questionTitle={question.questionTitle}
                questionContent={question.questionContent}
                createAt={question.createAt}
                reward={question.reward}
                companyData={companyData}
                viewCount={question.questionViewCount}
              />
            ))}
          </QuestionList>
          <TabBar />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePagination={handlePagination}
            className="pagination-container"
          />
        </>
      )}
    </StyledPage>
  );
}

export default CompanyInfoPage;
