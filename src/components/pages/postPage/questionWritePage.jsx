import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import '../../../asset/sass/pages/postPage/questionWritePage.scss';
import { BASE_URL } from '../../global/constants/index.js';

function QuestionWritePage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleRegister = async () => {
    const questionData = {
      content: question,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/question/save-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('등록 성공:', result);
        alert('질문이 등록되었습니다');
        localStorage.setItem('prevPage', '/company-regist');
      } else {
        throw new Error('서버 에러');
      }
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="질문" handleGoBack={handleGoBack} />
        <div className="info-questionWrite">질문을 입력해주세요</div>
        <div className="question-container">
          <textarea
            className="question-input"
            placeholder="질문 입력.."
            value={question}
            onChange={handleInputChange}
          ></textarea>
          <button className="register-button" onClick={handleRegister}>
            등록
          </button>
        </div>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionWritePage;
