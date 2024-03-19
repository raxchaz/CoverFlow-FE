import React, { useState } from 'react';
import '../../../asset/sass/pages/adminPage/adminMainPage.scss';
import CompanySelection from '../../ui/adminSelection/companySelection';
import AdminSideTap from '../../ui/adminSelection/adminSideTap';

function AdminPage() {
  const [currentSection, setCurrentSection] = useState<string>('users');

  const loadSection = (sectionName: string): void => {
    setCurrentSection(sectionName);
  };

  return (
    <div className="admin-page">
      <AdminSideTap loadSection={loadSection} />
      <div className="section">
        {currentSection === 'users' && <CompanySelection />}
        {currentSection === 'questions' && <div>질문관리 섹션</div>}
        {currentSection === 'answers' && <div>답변관리 섹션</div>}
        {currentSection === 'comments' && <div>댓글관리 섹션</div>}
        {currentSection === 'companies' && <div>기업관리 섹션</div>}
      </div>
    </div>
  );
}

export default AdminPage;
