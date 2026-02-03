import mysql from 'mysql2/promise';

//db연결정보 pool (여러 연결을 재사용) 방식 성능과 안정성 확보
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,      // ⚠️ Vercel 변수명과 일치
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections:true, //연결 개수가 풀일 때 기다리게해야...
  connectionLimit:10, //db연결 최대 수
  queueLimit:0, //대기 요청수 '0'이면 무제한
});

export const db=pool;
