// import React, { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import SearchInput from '../../ui/searchInput/searchInput.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import '../../../asset/sass/pages/searchPage/companyInfoPage.scss';
import Question from '../../ui/question/question.jsx';
// import { BASE_URL } from '../../global/constants/index.js';

const CompanyContainer = styled.div`
  background-color: #ffffff;
  margin: 3% 0% 0% 10%;
  padding: 20px;
  border: 1.5px solid #ff8d1d;
  width: 70%;
  display: flex;
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
`;

const QuestionList = styled.div`
  height: 100vh;
`;

function CompanyInfoPage() {
  const navigate = useNavigate();
  //  const [companyData, setCompanyData] = useState([]);

  const handleQuestionClick = () => {
    navigate('/question-write');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  /*  useEffect(() => {
    // API 호출 함수
    async function fetchCompanyData() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/company/search-companies`,
        );
        const data = await response.json();
        setCompanyData(data.data);
      } catch (error) {
        console.error('API 호출에 실패했습니다:', error);
        setCompanyData([]);
      }
    }

    fetchCompanyData();
  }, []); */

  return (
    <StyledPage className="main-page-container-companyinfo">
      <StyledHeader>
        <TitleHeader pageTitle="검색" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        <SearchInput />
      </StyledHeader>

      <div className="company-result-title">기업 정보</div>
      <CompanyContainer>
        <div className="company">
          <div className="main-company-info">
            <CompanyName>카카오</CompanyName>
            <CompanyType>IT / 통신</CompanyType>
          </div>
          <div className="sub-info">
            <CompanyAddress>경기도 성남시</CompanyAddress>
            <CompanyEstablishment>2010년 3월</CompanyEstablishment>
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
        <Question
          answerNickname="조뿡치"
          answerTag="취업준비중"
          viewCount="600"
          answerCount="6"
          content="ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ"
          createAt="2023-05-23"
        />
        <Question
          answerNickname="조뿡치"
          answerTag="취업준비중"
          viewCount="600"
          answerCount="6"
          content="아니 진짜 근데 괴담이 사실이 맞대요? 아니 진심으로요? 전 너누머눔 궁금해요"
          createAt="2023-05-23"
        />
        <Question
          answerNickname="조뿡치"
          answerTag="취업준비중"
          viewCount="600"
          answerCount="6"
          content="별루였는데 이거 어카나요?"
          createAt="2023-05-23"
        />
      </QuestionList>
      <TabBar />
    </StyledPage>
  );
}

export default CompanyInfoPage;

// answerNickname,
// answerTag,
// viewCount,
// answerCount,
// createAt,
