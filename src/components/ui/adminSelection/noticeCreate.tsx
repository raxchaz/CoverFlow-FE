import React, { useState } from 'react';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';

interface NoticeCreateProps {
    onBack: () => void;
  }

export default function NoticeCreate({ onBack }: NoticeCreateProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async () => {
    const body = {
      title,
      content,
    };
    try {
      await fetchAPI('/api/notice/admin', 'POST', body);
      showSuccessToast('공지사항이 성공적으로 작성되었습니다.');
      onBack(); 
    } catch (error) {
      console.error('Error:', error);
      showSuccessToast('공지사항 작성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="ad-notice-detail-container">
      <div className="ad-notice-cnt notice-length">공지 작성</div>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
        className='ad-notice-detail-title'
        placeholder="제목을 입력하세요"
        style={{backgroundColor:"white"}}
      />
      <textarea
        name="content"
        value={content}
        onChange={handleContentChange}
        className='ad-notice-detail-content notice-textarea'
        placeholder="내용을 입력하세요"
      />
      <div className='notice-button-container'>
        <button className='orange-white-btn' onClick={handleSave}>저장하기</button>
        <button className='white-orange-btn' onClick={onBack}>취소</button>
      </div>
    </div>
  );
}
