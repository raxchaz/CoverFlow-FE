import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../../global/constants/index.ts';
import Button from '../../ui/button/Button/Button';
import { StyledPage, StyledHeader } from '../../../styledComponent';
import '../../../asset/sass/pages/termsPage/termsPage.scss';
import greyCheck from '../../../asset/image/greyCheck.svg';
import greenCheck from '../../../asset/image/greenCheck.svg';
import allCheckGrey from '../../../asset/image/allCheck_grey.svg';
import allCheckGreen from '../../../asset/image/allCheck_green.svg';
import { showErrorToast, showSuccessToast } from '../../ui/toast/toast.tsx';
import { EventSourcePolyfill } from 'event-source-polyfill';

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { code } = location.state || {};

  // =========================================================== 약관 동의 확인을 위한 부분
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
    term6: false,
  });

  useEffect(() => {
    setAllAgreed(Object.values(termsAgreement).every((v) => v));
  }, [termsAgreement]);

  const toggleAgreement = (termKey) => {
    setTermsAgreement((prevTerms) => ({
      ...prevTerms,
      [termKey]: !prevTerms[termKey],
    }));
  };

  const toggleAllAgreement = () => {
    const newAllAgreed = !allAgreed;
    setAllAgreed(newAllAgreed);
    setTermsAgreement(
      Object.keys(termsAgreement).reduce((acc, term) => {
        acc[term] = newAllAgreed;
        return acc;
      }, {}),
    );
  };

  const termsText = {
    term1: '[필수] 코버플로우 이용 약관',
    term2: '[필수] 유료 결제 관련 약관',
    term3: '[필수] 개인정보 처리방침',
    term4: '[필수] 커뮤니티 이용 규칙 동의',
    term5: '[선택] 마케팅 및 광고 동의',
    term6: '[선택] 개인정보 수집 및 이용 동의',
  };

  // =========================================================== 토큰 발급을 위한 부분

  const fetchToken = async (code) => {
    const response = await fetch(`${BASE_URL}/api/auth/token?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.headers;
  };

  useEffect(() => {
    if (!code) {
      showErrorToast('죄송합니다. 오류가 발생했습니다.');
      console.log('code 값이 없습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    }
    console.log(termsAgreement);
  }, [code, navigate, termsAgreement]);

  const agreeToTerms = async () => {
    try {
      if (
        !termsAgreement.term1 ||
        !termsAgreement.term2 ||
        !termsAgreement.term3 ||
        !termsAgreement.term4
      ) {
        showErrorToast('필수 약관에 동의해주세요.');
      }
      const headers = await fetchToken(code);
      const accessToken = headers.get('Authorization');
      const refreshToken = headers.get('Authorization-refresh');
      console.log(headers);
      if (!accessToken || !refreshToken) {
        showErrorToast('토큰을 받아오는 데 실패하였습니다.');
        throw new Error('토큰을 받아오는 데 실패하였습니다.');
      }

      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      navigate('/login/member-info');
      showSuccessToast('회원 가입을 축하드립니다!');
      handleConnect();
    } catch (error) {
      console.error(error);
      showErrorToast('토큰을 받아오는 중 오류가 발생했습니다.');
      navigate('/login');
    }
  };

  const handleConnect = async () => {
    const res = await fetch(`${BASE_URL}/api/notification/connect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
    console.log('res', res);
  };

  const sse = new EventSourcePolyfill(`${BASE_URL}/api/notification/connect`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });

  console.log('sse', sse);

  sse.addEventListener('connect', (event) => {
    const data = event;
    console.log(data);
  });

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <div className="terms-container">
          <div className="terms-title-wrapper">
            <span className="terms-title">환영합니다!</span>
            <span className="terms-title">코버플로우에 가입하시려면</span>
            <span className="terms-title">약관에 동의해주세요.</span>
          </div>
          <div className="terms-item-container">
            <div onClick={toggleAllAgreement} className="term-all-container">
              <img
                src={allAgreed ? allCheckGreen : allCheckGrey}
                alt="전체 동의"
              />
              <span className="term-all-contents ">
                모든 약관에 동의합니다.
              </span>
            </div>
            {Object.entries(termsText).map(([termKey, termValue]) => (
              <div
                key={termKey}
                onClick={() => toggleAgreement(termKey)}
                className="term-all-container"
              >
                <img
                  src={termsAgreement[termKey] ? greenCheck : greyCheck}
                  alt={termValue}
                  className="term-check-img"
                />
                <span className="term-contents">{termValue}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={agreeToTerms}
            disabled={
              !termsAgreement.term1 ||
              !termsAgreement.term2 ||
              !termsAgreement.term3 ||
              !termsAgreement.term4
            }
          >
            확인
          </Button>
        </div>
      </StyledHeader>
    </StyledPage>
  );
}
