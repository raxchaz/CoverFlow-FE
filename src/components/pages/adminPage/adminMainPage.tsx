import React, { useState } from 'react';
import '../../../asset/sass/pages/adminPage/adminMainPage.scss';
import CompanySelection from '../../ui/adminSelection/companySelection';
import AdminSideTap from '../../ui/adminSelection/adminSideTap';
import FeedbackSelection from '../../ui/adminSelection/feedbackSelection';
import MemberSelection from '../../ui/adminSelection/memberSelection';
import ContactSelection from '../../ui/adminSelection/contactSelection';
import ReportQuestions from '../../ui/adminSelection/reportQuestions';
import ReportAnswers from '../../ui/adminSelection/reportAnswers';
import ReportComments from '../../ui/adminSelection/reportComments';
import NoticeSelection from '../../ui/adminSelection/noticeSelection';
import QuestionSelection from '../../ui/adminSelection/questionSelection';
import AnswerSelection from '../../ui/adminSelection/answerSelection';

function AdminPage() {
  const [currentSection, setCurrentSection] = useState<string>('users');

  const loadSection = (sectionName: string): void => {
    setCurrentSection(sectionName);
  };

  return (
    <div className="admin-page">
      <AdminSideTap loadSection={loadSection} />
      <div className="section">
        {currentSection === 'users' && <MemberSelection />}
        {currentSection === 'company' && <CompanySelection />}
        {currentSection === 'notification' && <NoticeSelection />}
        {currentSection === 'question' && <QuestionSelection />}
        {currentSection === 'answer' && <AnswerSelection />}
        {currentSection === 'comments' && <div>댓글관리 섹션</div>}
        {/* 신고관리 매뉴 */}
        {currentSection === 'report-questions' && <ReportQuestions />}
        {currentSection === 'report-answers' && <ReportAnswers />}
        {currentSection === 'report-comments' && <ReportComments />}
        {/*  */}
        {currentSection === 'contact' && <ContactSelection />}
        {currentSection === 'feedback' && <FeedbackSelection />}
        {currentSection === 'companies' && <div>기업관리 섹션</div>}
      </div>
    </div>
  );
}

export default AdminPage;
