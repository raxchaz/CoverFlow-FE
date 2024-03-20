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
// import Home from '../../../asset/image/group.svg';
import Money from '../../../asset/image/money.svg';
import axios from 'axios';

function QuestionWritePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState(0);
  const [questionTag, setQuestionTag] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const { companyId } = useParams();

  const tagName = [
    '사내 문화가 궁금해요',
    '급여 정보가 궁금해요',
    '업무 방식이 궁금해요',
    '승진이나 커리어가 궁금해요',
    '직무,워라밸이 궁금해요',
  ];
  const categoryName = [
    '서비스',
    '개발/데이터',
    '마케팅/광고',
    '생산/제조',
    '기타',
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const response: Response = await axios.post(`${BASE_URL}/api/question`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          questionTag,
          questionCategory,
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

  const handleTagSelect = (tag: string) => {
    setQuestionTag(tag);
  };

  const handleCategorySelect = (category: string) => {
    setQuestionCategory(category);
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

        <div className="tag-select-wrapper">
          {tagName.map((tag, index) => (
            <div
              className={`tag-select ${questionTag === tag ? 'selected' : ''} `}
              key={index}
              onClick={() => handleTagSelect(tag)}
            >
              <img src={Money} alt="money" />
              <span>{tag}</span>
            </div>
          ))}
          {/* <div className="tag-select">
            <img src={Money} alt="money" />
            <span>급여 정보가 궁금해요</span>
          </div>
          <div className="tag-select">
            <img src={Money} alt="money" />
            <span>업무 방식이 궁금해요</span>
          </div>
          <div className="tag-select">
            <img src={Money} alt="money" />
            <span>승진이나 커리어가 궁금해요</span>
          </div>
          <div className="tag-select">
            <img src={Money} alt="money" />
            <span>직무,워라밸이 궁금해요</span>
          </div> */}
        </div>

        <div className="category-container">
          <div className="category-wrapper">
            <img className="finger-image" src={Finger} alt="finger" />
          </div>
          <span>질문 카테고리를 설정해주세요</span>
        </div>

        <div className="category-select-wrapper ">
          {categoryName.map((category, index) => (
            <div
              className={`category-select ${questionCategory === category ? 'selected' : ''} `}
              key={index}
              onClick={() => handleCategorySelect(category)}
            >
              <img src={Money} alt="money" />
              <span>{category}</span>
            </div>
          ))}
          {/* <div className="category-select">
            <span>개발/데이터</span>
          </div>
          <div className="category-select">
            <span>마케팅/광고</span>
          </div>
          <div className="category-select">
            <span>생산/제조</span>
          </div>
          <div className="category-select">
            <span>기타</span>
          </div> */}
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
          placeholder="질문 내용을 입력해주세요.&#13;&#10;
					질문에 답변이 달릴 경우, 삭제가 불가능해집니다.&#13;&#10;
					질문 작성 시 타인의 명예를 훼손하거나 허위 사실을 유포할 경우 형법 상 명예훼손죄&#13;&#10;
					혐의를 받을 수 있습니다. 따라서 타인에 대한 존중과 배려를 기반으로 질문을 작성해주세요."
          name="content"
          value={content}
          onChange={handleTextAreaChange}
          rows={30}
          cols={40}
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
