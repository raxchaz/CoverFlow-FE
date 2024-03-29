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

interface LocationState {
  code?: string;
}

interface TermsAgreement {
  [term: string]: boolean;
}

interface TermText {
  title: string;
  link: string;
}

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { code } = (location.state || {}) as LocationState;

  // =========================================================== 약관 동의 확인을 위한 부분
  const [allAgreed, setAllAgreed] = useState<boolean>(false);
  const [termsAgreement, setTermsAgreement] = useState<TermsAgreement>({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    term5: false,
    term6: false,
    term7: false,
  });

  useEffect(() => {
    setAllAgreed(Object.values(termsAgreement).every((v) => v));
  }, [termsAgreement]);

  const toggleAgreement = (termTitle: string): void => {
    setTermsAgreement((prevTerms) => ({
      ...prevTerms,
      [termTitle]: !prevTerms[termTitle],
    }));
  };

  const toggleAllAgreement = (): void => {
    const newAllAgreed = !allAgreed;
    setAllAgreed(newAllAgreed);
    setTermsAgreement(
      Object.keys(termsAgreement).reduce((acc, termKey) => {
        acc[termKey] = newAllAgreed;
        return acc;
      }, {}),
    );
  };

  const termsText: Record<string, TermText> = {
    term1: {
      title: '[필수] 코버플로우 이용 약관',
      link: 'https://fallacious-scowl-9f4.notion.site/eaa829b2e5ea4ebd98534c11b264d82b?pvs=4',
    },
    term2: {
      title: '[필수] 유료 결제 관련 약관',
      link: 'https://fallacious-scowl-9f4.notion.site/e5130a2a286d45039918314da3489ee6?pvs=4',
    },
    term3: {
      title: '[필수] 개인정보 처리방침',
      link: 'https://fallacious-scowl-9f4.notion.site/7b3f1d1338184881877fa0c68fb1694e?pvs=4',
    },
    term4: {
      title: '[필수] 커뮤니티 이용 규칙 동의',
      link: 'https://fallacious-scowl-9f4.notion.site/25d4bdf5a49d47a6ae4e54ca6c685dc8?pvs=4',
    },
    term5: {
      title: '[필수] 만 14세 이상 동의',
      link: 'https://fallacious-scowl-9f4.notion.site/14-50fc59402e0a4aefb27944240d85fda0?pvs=4',
    },

    term6: {
      title: '[선택] 마케팅 및 광고 동의',
      link: 'https://fallacious-scowl-9f4.notion.site/c88ab1a33a3943f3a9a378d0bfb6ae74?pvs=4',
    },
    term7: {
      title: '[선택] 개인정보 수집 및 이용 동의',
      link: 'https://fallacious-scowl-9f4.notion.site/3-f63805b290054f0c94e526337c929ee8?pvs=4',
    },
  };

  // =========================================================== 토큰 발급을 위한 부분

  const fetchToken = async (code?: string): Promise<Headers> => {
    if (!code) throw new Error('Code is required');
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

  const agreeToTerms = async (): Promise<void> => {
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
          <div className="terms-divider"></div>
          <div className="terms-item-container">
            <div onClick={toggleAllAgreement} className="term-all-container">
              <img
                src={allAgreed ? allCheckGreen : allCheckGrey}
                alt="전체 동의"
              />
              <span className="term-all-contents ">
                전체 약관에 동의합니다
                <p>선택 시, 선택 데이터에도 동의하게 됩니다.</p>
              </span>
            </div>
            {Object.entries(termsText).map(([termKey, { title, link }]) => (
              <div
                key={termKey}
                onClick={() => toggleAgreement(termKey)}
                className="term-item-container"
              >
                <img
                  src={termsAgreement[termKey] ? greenCheck : greyCheck}
                  alt={title}
                  className="term-check-img"
                />
                <span className="term-contents">{title}</span>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="term-link"
                >
                  자세히
                </a>
              </div>
            ))}
          </div>
          <Button
            onClick={agreeToTerms}
            disabled={
              !termsAgreement.term1 ||
              !termsAgreement.term2 ||
              !termsAgreement.term3 ||
              !termsAgreement.term4 ||
              !termsAgreement.term5
            }
          >
            동의하고 회원가입 진행하기
          </Button>
        </div>
      </StyledHeader>
    </StyledPage>
  );
}
