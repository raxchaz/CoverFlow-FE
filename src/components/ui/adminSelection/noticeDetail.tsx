import React, { useState, useEffect } from 'react';
import { fetchAPI } from '../../global/utils/apiUtil';
import { showSuccessToast } from '../toast/toast';
interface Feedback {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticeViews: string;
  noticeStatus: boolean;
  createdAt: string;
}

interface NoticeDetailProps {
  feedback: Feedback;
  onBack: () => void;
  onSave: (updatedFeedback: Feedback) => void;
}

export default function NoticeDetail({ feedback, onBack, onSave }: NoticeDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFeedback, setEditedFeedback] = useState<Feedback>(feedback);

  useEffect(() => {
    setEditedFeedback(feedback);
  }, [feedback]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const body = {
      title: editedFeedback.noticeTitle,
      content: editedFeedback.noticeContent,
      noticeStatus: editedFeedback.noticeStatus,
    };
    try {
      await fetchAPI(`/api/notice/admin/${editedFeedback.noticeId}`, 'PATCH', body);
      onSave(editedFeedback);
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      showSuccessToast('수정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="ad-notice-detail-container">
      <div className="ad-notice-cnt notice-length">공지 상세</div>
      {isEditing ? (
        <>
       
            <input  className='ad-notice-detail-title'
              type="text"
              name="noticeTitle"
              value={editedFeedback.noticeTitle}
              onChange={handleEditChange}
              style={{backgroundColor:"white"}}
            />
      
          <textarea
            name="noticeContent"
            value={editedFeedback.noticeContent}
            onChange={handleEditChange}
            className='ad-notice-detail-content notice-textarea'

          />
          <div className='notice-button-container'>
            <button className='orange-white-btn' onClick={handleSave}>저장하기</button>
            <button className='white-orange-btn' onClick={() => setIsEditing(false)}>취소</button>
          </div>
        </>
      ) : (
        <>
          <div className='ad-notice-detail-title'>
            <div>{feedback.noticeTitle}</div>
            <div>{feedback.createdAt}</div>
          </div>
          <div className='ad-notice-detail-content'>{feedback.noticeContent}</div>
          <div className='notice-button-container'>
            <button className='orange-white-btn' onClick={onBack}>뒤로가기</button>
            <button className='white-orange-btn' onClick={() => setIsEditing(true)}>수정하기</button>
          </div>
        </>
      )}
    </div>
  );
}
