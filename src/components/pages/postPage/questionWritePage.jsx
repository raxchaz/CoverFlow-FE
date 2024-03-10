import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import TagInput from '../../ui/selection/fishTag.jsx';
import '../../../asset/sass/pages/postPage/questionWritePage.scss';
import { BASE_URL, ACCESS_TOKEN } from '../../global/constants/index.js';

function QuestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState(0);
  const { companyId } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const handleRewardChange = (e) => {
  //   setReward(e.target.value);
  // };

  const handleRegister = async () => {
    console.log(title, companyId, content, reward);

    try {
      const response = await fetch(`${BASE_URL}/api/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        body: JSON.stringify({
          title,
          content,
          companyId: parseInt(companyId),
          reward: parseInt(reward),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('등록 성공:', result);
        alert('질문이 등록되었습니다');
        navigate('/company-info/:companyId');
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
        <TitleHeader pageTitle="질문 등록" handleGoBack={handleGoBack} />
        <div className="info-questionWrite"></div>
        {/* <div className="compnayID">{companyId}</div> */}
        <input
          className="question-title-input"
          placeholder="질문 제목 입력.."
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="question-input"
          placeholder="질문 내용 입력.."
          name="content"
          value={content}
          onChange={handleInputChange}
        ></textarea>
        <TagInput reward={reward} setReward={setReward} />
        <button className="register-button" onClick={handleRegister}>
          등록
        </button>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionWritePage;
