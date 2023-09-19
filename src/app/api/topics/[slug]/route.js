import { NextResponse } from "next/server";
import { get, getId, update } from '@/stroe/db-util'

export const GET = async (res, {params}) => {
  const id = params.slug;
  // const items = get();
  // const selItem = items.find(i => i.id === parseInt(id));  
  // console.log('id:',id);
  const selItem = getId(parseInt(id));
  return NextResponse.json(
    selItem,
    { status: 200 }
  );
}

//아이템 업데이트
export const PATCH = async (req, {params}) => {  
  // 파라메터 get방식/JSON 방식
  const id = params.slug;
  const {title, body} = await req.json();  
  const updatedItem = update({id, title, body});
  // console.log('!!!!',id, title, body);
  return NextResponse.json(    
    updatedItem,
    { status: 200 }
  );
}
