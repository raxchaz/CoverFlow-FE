import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN } from '.';
interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}

export default function PrivateRoute({
  authentication,
}: PrivateRouteProps): React.ReactElement | null {
  /**
   * 로그인 했는지 여부
   * 로그인 했을 경우 : true 라는 텍스트 반환
   * 로그인 안했을 경우 : null or false(로그아웃 버튼 눌렀을경우 false로 설정) 반환
   */
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN);

  if (authentication) {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    );
  } else {
    return isAuthenticated === null || isAuthenticated === 'false' ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
  }
}
