import React from 'react';
import './adminSideTap.scss';
import { ReactComponent as UserIcon } from '../../../asset/image/admin-user.svg';
import { ReactComponent as AdminLogo } from '../../../asset/image/admin-logo.svg';

interface AdminSideTapProps {
  loadSection: (sectionName: string) => void;
}

export default function AdminSideTap({ loadSection }: AdminSideTapProps) {
  return (
    <div className="admin-sidebar">
      <AdminLogo />
      <div className="admin-router">
        <div className="admin-container" onClick={() => loadSection('users')}>
          <UserIcon />
          <span className="admin-text">회원 관리</span>
        </div>
        <div className="admin-container" onClick={() => loadSection('company')}>
          <UserIcon />
          <span className="admin-text">기업 관리</span>
        </div>
        <div
          className="admin-container"
          onClick={() => loadSection('question')}
        >
          <UserIcon />
          <span className="admin-text">질문 관리</span>
        </div>
        <div className="admin-container" onClick={() => loadSection('answer')}>
          <UserIcon />
          <span className="admin-text">답변 관리</span>
        </div>
        <div
          className="admin-container"
          onClick={() => loadSection('comments')}
        >
          <UserIcon />
          <span className="admin-text">댓글 관리</span>
        </div>
        <div className="admin-container" onClick={() => loadSection('contact')}>
          <UserIcon />
          <span className="admin-text">문의 관리</span>
        </div>

        <div className="admin-container" onClick={() => loadSection('report')}>
          <UserIcon />
          <span className="admin-text">신고 관리</span>
        </div>
        <div
          className="admin-container"
          onClick={() => loadSection('notification')}
        >
          <UserIcon />
          <span className="admin-text">공지 관리</span>
        </div>
      </div>
    </div>
  );
}
