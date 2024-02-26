import React, { useRef } from 'react';
import '../../../asset/sass/pages/adminPage/adminMainPage.scss';

function AdminPage() {
  const sectionRef = useRef(null);

  const loadSection = (sectionName) => {
    switch (sectionName) {
      case 'users':
        sectionRef.current.innerHTML = '';
        break;
      case 'questions':
        sectionRef.current.innerHTML = '';
        break;
      case 'answers':
        sectionRef.current.innerHTML = '';
        break;
      case 'comments':
        sectionRef.current.innerHTML = '';
        break;
      case 'companies':
        sectionRef.current.innerHTML = '';
        break;
      default:
        sectionRef.current.innerHTML = '';
    }
  };

  return (
    <div className="admin-page">
      <h1>관리자 페이지</h1>
      <div className="sidebar">
        <button onClick={() => loadSection('users')}>회원관리</button>
        <button onClick={() => loadSection('questions')}>질문관리</button>
        <button onClick={() => loadSection('answers')}>답변관리</button>
        <button onClick={() => loadSection('comments')}>댓글관리</button>
        <button onClick={() => loadSection('companies')}>기업관리</button>
      </div>
      <div ref={sectionRef} className="section"></div>
    </div>
  );
}

export default AdminPage;
