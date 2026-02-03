'use client';
import { useEffect } from "react";

export default function Logoutpage() {
  useEffect(()=>{
    //1. localStorage에서 토큰값 삭제
    localStorage.removeItem('token');

    //2.로그아웃 알림
    alert('로그아웃 되었습니다.');

    //3. 메인페이지로 이동
    window.location.href='/';
  },[]); //의존성 배열은 비워서 로딩시 1번만 내용 나오게함.

  return null;
}
