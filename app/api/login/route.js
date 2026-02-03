import {db} from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//api 폴더 안의 문서는 함수로 작성
export async function POST(req) {
  //요청 데이터 받기
  const {username, password} = await req.json();
  const SECRET_KEY = 'test'; //테스트 확인용

  // 유효성 검사
  if(!username || !password){
    return new Response(
      JSON.stringify({message: '아이디와 비밀번호를 입력하세요.'}),
      {
        status: 400,
        headers: {'Content-Type':'application/json'},
      }
    );
  }

  //사용자 존재 여부 확인
  const [users] = await db.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  if (users.length === 0){
    return new Response(
      JSON.stringify({message: '존재하지 않는 아이디입니다.'}),
      {
        status:401,
        headers: { 'Content-Type': 'application/json'},
      }
    );
  }

  const user = users[0]; // 비밀번호를 비교할 때, 사용자 1명을 대상으로 해야하기 때문

  //비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return new Response(
      JSON.stringify({message: '비밀번호가 일치하지 않습니다.'}),
      {
        status:401,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }

  // JWT 발급
  const token = jwt.sign(
    {userId: user.id, username: user.username},
    SECRET_KEY,
    {expiresIn: '1h'}
  );

  // 응답
  return new Response(
    JSON.stringify({
      message: '로그인 성공',
      token,
    }),
    {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    }
  )
}