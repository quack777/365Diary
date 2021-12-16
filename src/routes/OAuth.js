const CLIENT_ID = "f6901986138e44bdb93305d1621fd37b";
const REDIRECT_URI =  "http://localhost:3000/365/login/oauth_kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;