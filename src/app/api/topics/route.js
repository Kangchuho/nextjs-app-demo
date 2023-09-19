import { NextResponse } from "next/server";
import { get, save } from '@/stroe/db-util'

  // 파라메터 get방식
  // const title = req.nextUrl.searchParams.get('title');
  // const body = req.nextUrl.searchParams.get('body');

//아이템 리스트
export const GET = async () => {  
  const items = get();
  return NextResponse.json(    
    items,
    { status: 200 }
  );
}

//아이템 저장
export const POST = async (req) => {  
  const {title, body} = await req.json();
  const savedItem = save({title, body});
  // console.log('!!!!',title, body, savedItem);
  return NextResponse.json(    
    savedItem,
    { status: 200 }
  );
}
