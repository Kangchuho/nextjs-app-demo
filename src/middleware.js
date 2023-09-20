import { NextResponse } from 'next/server';
import { newUser } from './stroe/db-util';

export async function middleware(request) {
  
  // mpos 유저체크
  const appuser = request.headers.get('app-user');  

  // 앱유저인 경우 클라이언트 정보를 등록하고, 아니면 호출오류 메시지 출력
  if(appuser) {

    newUser({
      id: 2,
      userName: "사용자",
      deviceId: "d-2",
      isAdmin: false
    })


  } else {
    return NextResponse.json(        
      { 
        code: 400,  
        message: '잘못된 호출입니다.' 
      },
      { status: 400 }
    );
  }
}
 
// 자세한 내용은 아래의 'Matching Paths(경로일치)'를 참조하세요. "/",
// 루트, 빼고자 하는 경로는 제외하고. "/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"
// /api 이하 접근은 모두 헤더를 체크해서 필터링합니다.
export const config = {
  matcher: ["/(api)(.*)"],  
};