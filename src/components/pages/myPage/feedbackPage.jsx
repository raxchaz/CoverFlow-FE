import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/feedbackPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.tsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';
import Button from '../../ui/button/Button/Button.jsx';
import TextArea from '../../ui/inputbox/TextArea.jsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import { toast } from 'react-toastify';

function FeedbackPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const [contact, setcontact] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setcontact(value);
  };

  const submitFeedback = async () => {
    try {
      const res = await fetchAPI('/api/feedback', 'POST', contact);
      console.log(res, 'post 결과');
      if (res.status === 200) {
        toast.success('피드백 등록이 완료되었습니다!');
      }
    } catch (error) {
      // alert('문의 등록 실패:', error);
      toast.error('피드백 등록에 실패했습니다.', error);
    }
  };
  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="피드백 남기기" handleGoBack={handleGoBack} />
      </StyledHeader>
      <div className="feedback-container">
        <div className="feedback-title-wrapper">
          <span className="feedback-title">서비스에 대한</span>
          <span className="feedback-title">소중한 후기를 남겨주세요.</span>
          <span className="feedback-content">
            피드백을 적극 반영하여 더 나은 서비스가 되겠습니다.
          </span>
        </div>
        <TextArea
          placeholder="내용을 입력해주세요."
          name="content"
          value={contact}
          handleChange={handleChange}
          variant={'round'}
        />

        <Button
          variant={'round'}
          disabled={contact === ''}
          onClick={submitFeedback}
        >
          제출하기
        </Button>
      </div>
      <TabBar />
    </StyledPage>
  );
}

export default FeedbackPage;
