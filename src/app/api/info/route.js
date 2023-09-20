import { NextResponse } from "next/server";
import { allUsers } from '@/stroe/db-util'

//사용자 리스트
export const GET = async () => {  
  const items = allUsers();
  // console.log('api:',items);
  return NextResponse.json(    
    items,
    { status: 200 }
  );
}