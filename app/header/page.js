'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Header(props) {
  // 토큰값 유무로 바꾸기 로그인 / 로그아웃
  //1. 상태 변수 선언
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //2. useEffect 를 이용하여 토근값을 한번만 불러옴
  useEffect(() => {
    //토근이 있으면 로그인 상태로 간주한다
    const token = localStorage.getItem('token');

    //토큰이 있으면 ture 없으면 false 
    //if (token) {
    //   setIsLoggedIn(true);
    // } else {
    //   setIsLoggedIn(false);
    // }
    //!! === 삼항조건 연산자
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header>
      <h1>상단로고</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link href='../logout'>로그아웃</Link>
          </>
        ) : (
          <>
            <Link href='../login'>로그인</Link>
            &nbsp; &#10072; &nbsp;
            <Link href='../register'>회원가입</Link>
          </>
        )
        }
      </nav>
    </header>
  );
}

export default Header;