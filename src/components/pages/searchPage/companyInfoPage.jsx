import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import SearchInput from '../../ui/searchInput/searchInput.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import '../../../asset/sass/pages/searchPage/companyInfoPage.scss';
import Question from '../../ui/question/question.jsx';
import { ACCESS_TOKEN, BASE_URL } from '../../global/constants/index.js';

const CompanyContainer = styled.div`
  background-color: #ffffff;
  margin: 5% 0% 5% 10%;
  padding: 20px;
  border: 1.5px solid #ff8d1d;
  width: 70%;
  display: flex;
  border-radius: 10px;
`;

const CompanyName = styled.div`
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: 800;
  margin-bottom: 5%;
`;

const CompanyType = styled.div`
  font-size: 13px;
  color: cecece;
  letter-spacing: -1px;
  margin-right: 20px;
`;

const CompanyAddress = styled.div``;
const CompanyEstablishment = styled.div``;

const QuestionButton = styled.button`
  letter-spacing: -0.7px;
  background-color: #ff8d1d !important;
  border-radius: 3px;
  padding: 7px 10px;
  font-weight: 600;
  margin: 9% 10% 0% 0%;
  font-family: 'Pretendard-ExtraLight' !important;
`;

const QuestionList = styled.div`
  height: 100vh;
`;

// ================================================================

function CompanyInfoPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const response = await fetch(`${BASE_URL}/api/company/find-company`);
        const data = await response.json();
        if (response.ok && data.data) {
          setCompanyData(data.data);
        } else {
          throw new Error('데이터가 존재하지 않습니다.');
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchCompanyData();
  }, [navigate]);

  useEffect(() => {
    if (error) {
      alert('기업 데이터가 존재하지 않아, 검색 페이지로 돌아갑니다.');
      navigate(-1);
    }
  }, [error, navigate]);

  const handleQuestionClick = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      navigate('/question-write');
    } else {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container-companyinfo">
      <StyledHeader>
        <TitleHeader pageTitle="검색" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        <SearchInput />
      </StyledHeader>

      {companyData && (
        <>
          <div className="company-result-title">기업 정보</div>
          <CompanyContainer>
            <div className="company">
              <div className="main-company-info">
                <CompanyName>{companyData.companyName}</CompanyName>
                <CompanyType>{companyData.type}</CompanyType>
              </div>

              <div className="sub-info">
                <CompanyAddress>{companyData.address}</CompanyAddress>
                <CompanyEstablishment>
                  {companyData.establishment}
                </CompanyEstablishment>
              </div>
            </div>
          </CompanyContainer>

          <div className="question-info-container">
            <div className="company-question-title">기업 관련 질문</div>
            <QuestionButton onClick={handleQuestionClick}>
              질문 남기기
            </QuestionButton>
          </div>

          <QuestionList>
            {companyData.questions &&
              companyData.questions.map((question, index) => (
                <Question
                  key={index}
                  questioner={question.nickname}
                  questionerTag={question.tag}
                  viewCount={question.viewCount.toString()}
                  answerCount={question.answerCount.toString()}
                  questionTitle={question.title}
                  questionContent={question.content}
                  createAt={question.createAt}
                />
              ))}
          </QuestionList>
        </>
      )}

      <TabBar />
    </StyledPage>
  );
}

export default CompanyInfoPage;
