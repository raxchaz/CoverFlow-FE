import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  padding-left: 50px;
`;

const CompanyType = styled.div`
  font-size: 13px;
  color: cecece;
  letter-spacing: -1px;
  margin-right: 20px;
  padding-left: 50px;
`;

const Line = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  width: 80%;
  margin: 10% 0% 5% 10%;
`;

const CompanyAddress = styled.div`
  padding-right: 50px;
`;

const CompanyEstablishment = styled.div`
  padding-left: 50px;
`;

const QuestionButton = styled.button`
  letter-spacing: -0.7px;
  background-color: #ff8d1d !important;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.7rem;
  border-radius: 7px;
  padding: 1% 2% 1% 2%;
  margin: 10% 13% 5% 0%;
  font-family: 'Pretendard-ExtraLight' !important;
`;

const QuestionList = styled.div`
  overflow: visible;
`;

// ================================================================

function CompanyInfoPage() {
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    console.log('회사 companyId: ', companyId);
    async function fetchCompanyData() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/company/find-company/${companyId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        );
        const data = await response.json();

        if (response.ok && data.data) {
          setCompanyData(data.data);
          console.log('회사 데이터:', data.data);
        } else {
          throw new Error('데이터가 존재하지 않습니다.');
        }
      } catch (error) {
        console.log(error);
        // setError(error);
        alert('기업 데이터가 존재하지 않아, 검색 결과 페이지로 돌아갑니다.');
        navigate(-1);
      }
    }

    fetchCompanyData();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     alert('기업 데이터가 존재하지 않아, 검색 결과 페이지로 돌아갑니다.');
  //     navigate(-1);
  //   }
  // }, [error, navigate]);

  const handleQuestionClick = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      navigate(`/company-info/${companyId}/question-write`);
    } 
    
    if(confirm(로그인이 필요한 기능입니다. 로그인 하시겠습니까?) == true){
      navigate(/login);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="검색 결과" handleGoBack={handleGoBack} />
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

          <Line />

          <div className="question-info-container">
            <div className="company-question-title">기업 관련 질문</div>
            <QuestionButton onClick={handleQuestionClick}>
              질문 남기기
            </QuestionButton>
          </div>

          <QuestionList>
            {companyData.questions.map((question, index) => (
                <Question
                  key={index}
                  companyId={companyId}
                  questionId={question.questionId.toString()}
                  questioner={question.nickname}
                  questionerTag={question.tag}
                  viewCount={question.viewCount.toString()}
                  answerCount={question.answerCount.toString()}
                  questionTitle={question.title}
                  questionContent={question.content}
                  createAt={question.createAt}
                />
              ))
            }
          </QuestionList>
        </>
      )}
      <TabBar />
    </StyledPage>
  );
}

export default CompanyInfoPage;
