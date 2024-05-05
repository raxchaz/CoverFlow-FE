import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/question/question.scss';
import styled from 'styled-components';
import View from '../../../asset/image/view.svg';

// import { ACCESS_TOKEN } from '../../global/constants/index.ts';
// import Tree from '../../../asset/image/nature-ecology-tree-3--tree-plant-cloud-shape-park.svg';
import { CompanInfoProps } from '../../pages/searchPage/companyInfoPage.tsx';
import ChatAll from '../../../asset/image/chat2.svg';

const Line = styled.div`
  height: 1px;
  background-color: #f2f2f2;
  width: 102%;
  margin: 3% 0% 5% -1.5%;
`;

// const LoginButton = styled.button`
//   letter-spacing: -0.7px;
//   background-color: #ff8d1d !important;
//   border-radius: 3px;
//   font-weight: 600;
//   font-size: 12px;
//   margin: 2% 10% 0% 48%;
//   padding: 5px 5px;
//   width: 15%;
// `;

// const ContentBlur = styled.span`
//   ${({ isLoggedIn }) =>
//     !isLoggedIn &&
//     css`
//       display: -webkit-box;
//       -webkit-box-orient: vertical;
//       -webkit-line-clamp: 2;
//       overflow: hidden;
//       filter: blur(5px);
//       text-overflow: ellipsis;
//     `}
// `;

// const ContentBlur = styled.span<{ $isLoggedIn: boolean }>`
//   ${({ $isLoggedIn }) =>
//     !$isLoggedIn &&
//     css`
//       display: -webkit-box;
//       -webkit-box-orient: vertical;
//       -webkit-line-clamp: 2;
//       overflow: hidden;
//       filter: blur(5px);
//       text-overflow: ellipsis;
//     `}
// `;

function truncateTitle(title, maxLength = 25) {
  return title?.length > maxLength
    ? title?.substring(0, maxLength - 3) + '...'
    : title;
}

// function truncateContent(questionContent, maxLength = 30) {
//   return questionContent.length > maxLength
//     ? questionContent.substring(0, maxLength + 20) + '...'
//     : questionContent;
// }

function formatDate(fullDate: string) {
  const date = new Date(fullDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

interface QuestionModulesProps {
  companyId?: string;
  questionId: number;
  questioner: string;
  questionerTag: string;
  answerCount: number;
  questionTitle: string;
  createAt: string;
  questionContent: string;
  reward: number;
  companyData: CompanInfoProps;
  viewCount: number;
  questionCategory: string;
}

function QuestionModule({
  companyId,
  questionId,
  questioner,
  answerCount,
  questionTitle,
  createAt,
  reward,

  viewCount,
  questionCategory,
}: QuestionModulesProps) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // const handleLoginClick = () => {
  //   navigate('/login'); // 로그인 페이지로 이동
  // };

  const goToDetail = () => {
    navigate(`/company-info/${companyId}/${questionId}`, {
      state: {
        questionId,
      },
    });
  };

  useEffect(() => {
    // const token = localStorage.getItem(ACCESS_TOKEN);
    // setIsLoggedIn(!!token);
  }, []);

  const formattedDate = formatDate(createAt);

  return (
    <>
      <div className="question-container" onClick={goToDetail}>
        <span className="questioner">
          <span> {questioner}</span>
          <span className="middle">•</span>
          <div className="questioner-container">
            <span className="questioner-tag">{formattedDate}</span>
          </div>
        </span>

        <div className="field">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="reward">{reward}</div>
            <span className="question-title">
              {truncateTitle(questionTitle)}
            </span>
            <span>{questionCategory}</span>
          </div>

          <div className="view-container">
            <img className="view-img" src={View} />
            <span className="chat-count">{viewCount}</span>
            <img className="chat-img" src={ChatAll} />
            <span className="chat-count">{answerCount}</span>
          </div>
        </div>
      </div>
      <Line />
    </>
  );
}

export default QuestionModule;
