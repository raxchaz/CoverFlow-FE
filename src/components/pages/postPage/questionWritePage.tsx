import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../asset/sass/pages/postPage/questionWritePage.scss';
import { BASE_URL } from '../../global/constants';
import { toast } from 'react-toastify';
import TagInput from '../../ui/selection/fishTag';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import { StyledHeader, StyledPage } from '../../../styledComponent';
import Finger from '../../../asset/image/fingerprint.svg';
import Home from '../../../asset/image/group.svg';
import Money from '../../../asset/image/money.svg';

function QuestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState(0);
  const { companyId } = useParams();

  localStorage.setItem(
    'access_token',
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxMDc1MDkxNSwibWVtYmVySWQiOiJlN2E1ZTY3ZC0wZjljLTQ0NWMtODFhMC0yMjA1YTU4ZDBiOWIiLCJyb2xlIjoiTUVNQkVSIn0.DGO__CMcGZ0w0PayZkCw53LwrG5lYrP_80AMBY4qgxyAI397Y9sKfg1LHip9O41bYlegWQRDFCXF8-3iwwBnkg',
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  console.log(localStorage.getItem('access_token'));

  const handleRegister = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          title,
          content,
          companyId: Number(companyId),
          reward: Number(reward),
        }),
      });

      if (response.ok) {
        await response.json();
        toast.success('질문이 등록되었습니다');
        navigate('/company-info/:companyId');
      } else {
        throw new Error('서버 에러');
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="질문 등록" handleGoBack={handleGoBack} />
        {/* <div className="info-questionWrite"></div> */}
        <div className="company-name">
          <span>아모레퍼시픽</span>
        </div>

        <div className="tag-container">
          <div className="tag-wrapper">
            <img src={Finger} alt="finger" className="finger-image" />
          </div>
          <span>질문 태그를 설정해주세요</span>
        </div>

        <div className="category-select-wrapper">
          <div className="tag-select">
            <img src={Home} alt="home" />
            <span>사내 문화가 궁금해요</span>
          </div>
          <div className="tag-select">
            <img src={Money} alt="money" />
            <span>급여 정보가 궁금해요</span>
          </div>
        </div>

        <div className="category-container">
          <div className="category-wrapper">
            <img className="finger-image" src={Finger} alt="finger" />
          </div>
          <span>질문 카테고리를 설정해주세요</span>
        </div>

        <div className="category-select-wrapper ">
          <div className="category-select">
            <span>경영/사무</span>
          </div>
          <div className="category-select">
            <span>연구개발/설계</span>
          </div>
          <div className="category-select">
            <span>연구개발/설계</span>
          </div>
          <div className="category-select">
            <span>연구개발/설계</span>
          </div>
        </div>
        <input
          className="question-title-input"
          placeholder="질문 제목 입력.."
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="question-input"
          placeholder="질문 내용을 입력해주세요.

					질문에 답변이 달릴 경우, 삭제가 불가능해집니다.

					질문 작성 시 타인의 명예를 훼손하거나 허위 사실을 유포할 경우 형법 상 명예훼손죄 혐의를 받을 수 있습니다. 따라서 타인에 대한 존중과 배려를 기반으로 질문을 작성해주세요."
          name="content"
          value={content}
          onChange={handleInputChange}
          rows={30}
          cols={20}
        ></textarea>
        <TagInput reward={reward} setReward={setReward} />
        <button className="register-question-button" onClick={handleRegister}>
          등록
        </button>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionWritePage;
