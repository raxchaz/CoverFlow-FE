import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../../asset/sass/pages/postPage/questionWritePage.scss';
import TagInput from '../../ui/selection/fishTag';
import TitleHeader from '../../ui/header/titleHeader';
import TabBar from '../../ui/tabBar/tabBar';
import { StyledHeader, StyledPage } from '../../../styledComponent';
import Finger from '../../../asset/image/fingerprint.svg';
import Home from '../../../asset/image/group.svg';
import Money from '../../../asset/image/money.svg';
import Search from '../../../asset/image/search.svg';
import Justice from '../../../asset/image/justice.svg';
import GraphBar from '../../../asset/image/graph_bar.svg';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast';
import { fetchAPI } from '../../global/utils/apiUtil';

function QuestionWritePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState(0);
  const [questionTag, setQuestionTag] = useState('');
  const [questionCategory, setQuestionCategory] = useState('');
  const { companyId } = useParams();
  const [showAllTags, setShowAllTags] = useState(false); // State to toggle showing all tags

  const initialTags = [
    { name: '사내 문화가 궁금해요', value: 'CULTURE', image: Home },
    { name: '급여 정보가 궁금해요', value: 'SALARY', image: Money },
  ];

  const additionalTags = [
    { name: '업무 방식이 궁금해요', value: 'BUSINESS', image: Search },
    { name: '승진이나 커리어가 궁금해요', value: 'CAREER', image: GraphBar },
    {
      name: '직무,워라밸이 궁금해요',
      value: 'WORKLIFEBALANCE',
      image: Justice,
    },
  ];

  const tagName = showAllTags
    ? [...initialTags, ...additionalTags]
    : initialTags;

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

  const handleTextAreaChange = (event) => {
    setContent(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const isRequired = (category, tag, title, content, reward) => {
    return (
      Boolean(category) &&
      Boolean(tag) &&
      Boolean(title) &&
      Boolean(content) &&
      Boolean(reward)
    );
  };

  const handleRegister = async () => {
    try {
      const body = {
        questionTag,
        questionCategory,
        title,
        content,
        companyId: Number(companyId),
        reward: Number(reward),
      };
      const isValid = Object.values(body).every(
        (value) => value !== null && value !== '',
      );

      if (!isValid) {
        throw new Error('모든 필드를 채워주세요.');
      } else {
        await fetchAPI('/api/question', 'POST', body);

        showSuccessToast('질문이 등록되었습니다');

        navigate(`/company-info/${companyId}`);
      }
    } catch (error) {
      showErrorToast(`에러 발생 ${error}`);
    }
  };

  const handleTagSelect = (tag) => {
    setQuestionTag(tag);
  };

  const handleCategorySelect = (category) => {
    setQuestionCategory(category);
  };

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="질문 등록" handleGoBack={handleGoBack} />
        <div className="company-name">
          <span>{state}</span>
        </div>

        <div className="tag-container">
          <div className="tag-wrapper">
            <img src={Finger} alt="finger" className="finger-image" />
          </div>
          <span>질문 태그를 설정해주세요</span>
        </div>

        <div className="tag-select-wrapper">
          {tagName.map((tag) => (
            <div
              className={`tag-select ${questionTag === tag.value ? 'selected' : ''} `}
              key={tag.value}
              onClick={() => handleTagSelect(tag.value)}
            >
              <img src={tag.image} alt="money" />
              <span>{tag.name}</span>
            </div>
          ))}
          {!showAllTags && (
            <div className="tag-select" onClick={toggleShowAllTags}>
              <span>+3</span>
            </div>
          )}
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
              <span>{category}</span>
            </div>
          ))}
        </div>
        <input
          className="question-title-input"
          placeholder="질문 제목 입력.."
          name="title"
          value={title}
          onChange={handleTitleChange}
          maxLength={100}
        />
        <textarea
          className="question-input"
          placeholder="질문 내용을 입력해주세요."
          name="content"
          value={content}
          onChange={handleTextAreaChange}
          rows={30}
          cols={40}
          maxLength={1000}
        ></textarea>
        <TagInput reward={reward} setReward={setReward} />
        <button
          className={`register-question-button ${isRequired(questionCategory, questionTag, title, content, reward) ? 'selected' : ''}`}
          onClick={handleRegister}
        >
          등록
        </button>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default QuestionWritePage;
