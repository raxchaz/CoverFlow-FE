// 회원권한,회원상태
export const Role = [
  { key: 'GUEST', value: '게스트' },
  { key: 'MEMBER', value: '멤버' },
  { key: 'ADMIN', value: '관리자' },
];

export const MemberStatus = [
  { key: 'WAIT', value: '등록 대기' },
  { key: 'REGISTRATION', value: '등록 완료' },
  { key: 'DELETION', value: '삭제' },
];

// 질문상태
export const qStatus = [
  { key: 'true', value: '일반' },
  { key: 'false', value: '신고' },
];

// 답변상태
export const AStatus = [
  { key: 'true', value: '채택' },
  { key: 'false', value: '미채택' },
];

// 신고 상태
export const RSTATUS = [
  { key: 'T', value: '등록' },
  { key: 'F', value: '미등록' },
];
