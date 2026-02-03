'use client';
import Link from 'next/link';
import {useState} from 'react';
//import {useRouter} from 'next/navigation';

function Loginpage(props) {
  //1. 상태변수 선언
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  //홈으로 메뉴 클릭시 메인으로 돌아가기 위해 router 설정
  //const router = useRouter();
  //여기서는 window.location.href='/' 사용

  //2. 함수작성 
  const handleChange =(e)=>{
    setForm({
      ...form, [e.target.name]:e.target.value
    });
  }

  //3. 로그인 요청
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const res = await fetch('/api/login', {
      //API주소로 POST 방식 요청을 함
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(form), //form 객체를 json 문자열로 변환하여 전송
    });

    const data = await res.json();

    if(res.ok){
      alert('로그인 성공!');
      
      //토큰 저장
      localStorage.setItem('token', data.token);

      //router.push('/') //메인 페이지로 돌아가기
      window.location.href='/';
    }else{
      alert(data.message || '로그인 실패');
    }
  }
  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id="username" name="username" onChange={handleChange} value={form.username} placeholder='아이디' required />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" id="password" name="password" onChange={handleChange} value={form.password} placeholder='패스워드' required />
        </p>

        <p>
          <input type="submit" value="로그인" />
        </p>

        <Link href="/idsearch">아이디 찾기</Link> &#10072; &nbsp;
        <Link href="/pwsearch">비번찾기 찾기</Link> &#10072; &nbsp;
        <Link href="/register">회원가입</Link>
      </form>
    </section>
  );
}

export default Loginpage;