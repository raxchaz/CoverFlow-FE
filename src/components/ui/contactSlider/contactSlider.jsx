import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './contactSlider.scss';
import Disclaimer from './disclaimer.jsx';
import ContactList from './contactList.jsx';
import Button from '../button/Button/Button.jsx';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import TextArea from '../inputbox/TextArea.jsx';
import { showSuccessToast, showErrorToast } from '../toast/toast.tsx';
// import { BASE_URL, ACCESS_TOKEN } from '../../global/constants/index.js';
const StatusBar = styled.div`
  display: flex;
  width: 505px;
  justify-content: space-between;
  border-bottom: 8px solid #d9d9d9;
  margin: 5% auto;
  font-size: 2rem;
  color: #d9d9d9;
  letter-spacing: -1px;
  font-family: Pretendard-Bold;
`;

const StatusTab = styled.div`
  width: 255px;
  letter-spacing: -1px;
  text-align: center;
  padding: 10px 0;
  margin-bottom: -8px;
  cursor: pointer;
  color: ${({ $current }) => ($current ? 'black' : 'gray')};
  border-bottom: ${({ $current }) =>
    $current ? '8px solid black' : '8px solid transparent'};
  transition:
    border-bottom 0.3s ease-in-out,
    color 0.3s ease-in-out;
`;

// ======================= 스타일드 컴포넌트

export default function ContactSlider() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadUserData(currentPage);
  }, [navigate, currentPage]);

  useEffect(() => {
    // console.log(state);
    if (state) {
      setCurrentSection('contactList');
    } else {
      setCurrentSection('contact');
    }
  }, [navigate]);

  const [currentSection, setCurrentSection] = useState('contact');
  const [contact, setcontact] = useState({
    title: '',
    content: '',
  });
  const [contactList, setContactList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const loadUserData = async (currentPage) => {
    try {
      const data = await fetchAPI(
        `/api/inquiry/me?pageNo=${currentPage}`,
        'GET',
      );
      // console.log(data);
      setContactList(data.data.inquiries);
      setTotalPage(data.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const submitContact = async () => {
    try {
      if (contact.title.length > 20) {
        showErrorToast('제목을 20자 이하로 작성해주세요.');
        return;
      }
      const res = await fetchAPI('/api/inquiry', 'POST', contact);
      if (res.statusCode === 'CREATED') {
        setCurrentSection('contactList');
        setcontact({
          title: '',
          content: '',
        });
        loadUserData(0);
        showSuccessToast('문의 등록이 완료되었습니다!');
      }
    } catch (error) {
      showErrorToast('문의 등록에 실패했습니다.', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setcontact((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    // console.log(contact);
  };

  return (
    <div>
      <div className="slider-container">
        <StatusBar>
          <StatusTab
            $current={currentSection === 'contact'}
            onClick={() => setCurrentSection('contact')}
          >
            문의 하기
          </StatusTab>
          <StatusTab
            $current={currentSection === 'contactList'}
            onClick={() => setCurrentSection('contactList')}
          >
            문의 내역 확인
          </StatusTab>
        </StatusBar>
        {currentSection === 'contact' && (
          <div>
            <div className="contact-container">
              <div className="contact-item">
                <span className="contact-count">
                  {contactList.length > 0
                    ? contactList[0].allInquiriesCount
                    : 0}
                </span>
                전체 문의
              </div>
              <div className="contact-item">
                <span className="contact-count">
                  {contactList.length > 0
                    ? contactList[0].completeInquiriesCount
                    : 0}
                </span>
                답변 완료
              </div>
              <div className="contact-item">
                <span className="contact-count">
                  {contactList.length > 0
                    ? contactList[0].waitInquiriesCount
                    : 0}
                </span>
                답변 대기
              </div>
            </div>

            <div className="contact-input-field-container">
              <Disclaimer />

              <input
                type="text"
                className="input-field-contact"
                placeholder="제목을 입력해주세요. (20자 이내)"
                name="title"
                value={contact.title}
                onChange={handleChange}
              />
              <TextArea
                variant="default"
                placeholder="문의 내용을 입력해주세요."
                name="content"
                value={contact.content}
                handleChange={handleChange}
                maxLength={200}
              />

              <Button
                onClick={submitContact}
                disabled={contact.title === '' || contact.content === ''}
              >
                문의하기
              </Button>
            </div>
          </div>
        )}
        {currentSection === 'contactList' && (
          <ContactList
            contactList={contactList}
            totalPages={totalPage}
            setCurrentSection={setCurrentSection}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}
