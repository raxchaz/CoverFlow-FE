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
  font-size: 1.8rem;
  letter-spacing: -1px;
  font-weight: 800;
  margin-bottom: 0.6rem;
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

const CompanyEstablishment = styled.div``;

const QuestionButton = styled.button`
  letter-spacing: -0.7px;
  background-color: #ff8d1d !important;
  /* border-radius: 3px; */
  font-weight: 600;
  font-size: 0.7rem;
  /* border-radius: 7px; */
  /* padding: 1% 2% 1% 2%; */
  /* margin: 10% 13% 5% 0%; */

  border-radius: 0;
  font-family: 'Pretendard-ExtraLight' !important;
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

interface CompanInfoProps {
  companyAddress: string;
  companyEstablishment: string;
  companyId: number;
  companyName: string;
  companyType: string;
  questionCount: number;
  questions: Questions[];
}

function CompanyInfoPage() {
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState<CompanInfoProps>();
  const { companyId } = useParams();

  localStorage.setItem('prevPage', window.location.pathname);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const response = await fetch(
          `${BASE_URL}/api/company/${companyId}?pageNo=0`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        );

        const { data } = await response.json();

        if (response.ok && data) {
          setCompanyData(data);
        } else {
          throw new Error('데이터가 존재하지 않습니다.');
        }
      } catch (error) {
        showErrorToast(
          '기업 데이터가 존재하지 않아, 검색 결과 페이지로 돌아갑니다.',
        );
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
    } else if (confirm('로그인이 필요합니다. 로그인 하시겠습니까?') === true) {
      navigate(`/login`);
    }
  };

  const handleGoBack = () => {
    navigate(`/search-result`, { state: companyData });
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
          {/* <div className="company-result-title">기업 정보</div> */}
          <CompanyContainer>
            <div className="company">
              <div className="main-company-info">
                <CompanyName>{companyData?.companyName}</CompanyName>
                <span>에 관련된 질문들을 모아봤어요</span>
                {/* <CompanyType>{companyData?.companyType}</CompanyType> */}
              </div>
              <QuestionButton onClick={handleQuestionClick}>
                질문하기
              </QuestionButton>
              <div className="sub-info">
                {/* <CompanyAddress>{companyData.companyAddress}</CompanyAddress> */}
                <CompanyEstablishment>
                  {companyData.companyEstablishment}
                </CompanyEstablishment>
              </div>
            </div>
          </CompanyContainer>

          <Line />

          <div className="question-info-container">
            <div className="company-question-title">기업 관련 질문</div>
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
