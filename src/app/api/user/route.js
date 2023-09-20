import { NextResponse } from "next/server";
import { allUsers, newUser } from '@/stroe/db-util'


//사용자 리스트
export const GET = async () => {  
  const items = allUsers();
  // console.log('api:',items);
  return NextResponse.json(    
    items,
    { status: 200 }
  );
}

//사용자 저장
export const POST = async (req) => {  
  const {
    userName,
    deviceId
  } = await req.json();
  // console.log(userName, deviceId);
  const savedItem = newUser({userName: userName, deviceId: deviceId, isAdmin: false});  
  return NextResponse.json(    
    savedItem,
    { status: 200 }
  );
}
