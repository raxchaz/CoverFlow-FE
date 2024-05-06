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
import { initializeSSE } from '../../global/utils/eventApiUtils.js';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

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
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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
      link: 'https://muddy-snowflake-048.notion.site/fd66b743735d4e59afd10c309cadb839?pvs=4',
    },
    term2: {
      title: '[필수] 유료 결제 관련 약관',
      link: 'https://muddy-snowflake-048.notion.site/3065eafff7ec49acb4d45ca4261ba1cf?pvs=4',
    },
    term3: {
      title: '[필수] 개인정보 처리방침',
      link: 'https://muddy-snowflake-048.notion.site/4a6f97ae8c63499ebd57aab31c09f399?pvs=4',
    },
    term4: {
      title: '[필수] 커뮤니티 이용 규칙 동의',
      link: 'https://muddy-snowflake-048.notion.site/d381d8e0a61548eaad106d4e96ddf8f5?pvs=4',
    },
    term5: {
      title: '[필수] 만 14세 이상 동의',
      link: 'https://muddy-snowflake-048.notion.site/14-6d2bf537687c4814b94949143b786edf?pvs=4',
    },

    term6: {
      title: '[선택] 마케팅 및 광고 동의',
      link: 'https://muddy-snowflake-048.notion.site/403754e5e1b849d085cfbe25a13483e7?pvs=4',
    },
    term7: {
      title: '[선택] 개인정보 수집 및 이용 동의',
      link: 'https://muddy-snowflake-048.notion.site/3-2ecbf6307cde4cadb5d296a3bd317ca6?pvs=4',
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
      initializeSSE(queryClient, dispatch);
    } catch (error) {
      console.error(error);
      showErrorToast('토큰을 받아오는 중 오류가 발생했습니다.');
      navigate('/login');
    }
  };

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
