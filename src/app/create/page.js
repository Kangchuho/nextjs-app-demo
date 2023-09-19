'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

function page() {
  const router = useRouter();
  const postFrom = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({title, body})
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics',options)
      .then(res=>res.json())
      .then(result=>{
        //console.log(result)
        //route.refresh(`/read/${result.id}`);
        router.push(`/read/${result.id}`);
        router.refresh();
    })
  }

  return (    
    <form className='p-1' onSubmit={postFrom}>
      <p className='p-2'>
        <input type='text' placeholder='title' name='title' className='text-blue-300' />        
      </p>
      <p className='p-2'>
          <textarea name="body" placeholder='body' className='text-black' />
      </p>
      <p className='p-2 '>
        <button type='submit' className='text-white bg-slate-500 rounded-md px-10 py-2'>저장</button>
      </p>
    </form>
  )
}

export default page