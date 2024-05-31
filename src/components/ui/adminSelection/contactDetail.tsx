import React from 'react';
import styled from 'styled-components';
import { CSTATUS } from '../../global/constants/adminOption';
import Button from '../button/Button/Button';

interface Inquiries {
  inquiryId: number;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryAnswer: string;
  inquiryStatus: string;
  inquirerNickname: string;
  createdAt: string;
}

interface InqueryDetailProps {
  inquiries?: Inquiries;
  showInqueryList?: () => void;
  handleSearch?: () => void;
}

export default function ContactDetail({
  inquiries,
  showInqueryList,
  handleSearch,
}: InqueryDetailProps) {
  console.log(inquiries, showInqueryList, handleSearch);
  return (
    <ContactContainer>
      <Main>
        <ContactTables>
          <ContactKind>닉네임</ContactKind>
          <Contactapis>{inquiries?.inquirerNickname}</Contactapis>
          <ContactKind>계정</ContactKind>
          <Contactapis>{inquiries?.inquiryId}</Contactapis>
          <ContactKind>작성일</ContactKind>
          <Contactapis>{inquiries?.createdAt}</Contactapis>
          <ContactKind>문의 제목</ContactKind>
          <Contactapis>{inquiries?.inquiryTitle}</Contactapis>
        </ContactTables>
        <ContentContainer>{inquiries?.inquiryContent}</ContentContainer>
        <StateContainer>
          <StateTitle>문의 답변 상태</StateTitle>
          <StateSelection
            className="ad-searchOption-select"
            value={inquiries?.inquiryStatus}
          >
            <option value=""></option>
            {CSTATUS.map((inquiryStatus) => (
              <option key={inquiryStatus.key} value={inquiryStatus.key}>
                {inquiryStatus.value}
              </option>
            ))}
          </StateSelection>
        </StateContainer>
        <ContactArea placeholder="문의 사항 답변을 작성해주세요" />
        <ButtonContact>
          <Button variant="admin" onClick={() => close}>
            문의 답변
          </Button>
        </ButtonContact>
      </Main>
    </ContactContainer>
  );
}

const ContactContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Main = styled.div`
  align-content: left;
  padding-left: 50px;
  padding-top: 70px;
`;

const ContactTables = styled.div`
  width: 970px;
  height: 220px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 146px 824px;
  grid-template-rows: 55px 55px 55px 55px;
  padding-bottom: 30px;
`;

const ContactKind = styled.div`
  border: 1px solid black;
  width: 146px;
  text-align: center;
  padding-top: 10px;
  font-size: 16px;
  background-color: #a8a8a8;
`;

const Contactapis = styled.div`
  border: 1px solid black;
  width: 824px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 16px;
`;

const ContentContainer = styled.div`
  padding-top: 30px;
  width: 970px;
  height: 258px;
  background-color: #f4f3f3;
  padding-left: 20px;
  margin-top: 30px;
  word-break: normal;
`;

const StateContainer = styled.div`
  display: flex;
  margin-top: 40px;
  padding-bottom: 2%;

  align-items: center;
`;

const StateTitle = styled.p`
  font-size: 17px;
  padding-right: 20px;
`;

const StateSelection = styled.select`
  margin-left: 50px;
  width: 163px;
  height: 28px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
`;

const ContactArea = styled.textarea`
  width: 994px;
  height: 446px;
  margin-top: 40px;
  padding: 20px;
  background-color: rgba(217, 217, 217, 1);
`;

const ButtonContact = styled.div`
  margin-top: 30px;
  align-items: right;
  padding-left: 850px;
`;
