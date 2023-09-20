import { NextResponse } from "next/server";
import { newUser } from '@/stroe/db-util'

//사용자 저장
export const POST = async (req) => {  
  const {
    userName,
    deviceId
  } = await req.json();
  // console.log(userName, deviceId);
  const savedItem = newUser({userName, deviceId, isAdmin: false});  
  return NextResponse.json(    
    savedItem,
    { status: 200 }
  );
}
