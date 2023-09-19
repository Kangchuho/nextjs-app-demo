'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {

  const router = useRouter();
  const params = useParams()
  const id = params.id;
  const [content, setContent] = useState([])  
  useEffect(() => {    
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, {cache: 'no-store'})
      .then((resp) => {return resp.json()})
      .then(result => {
        // console.log(id, result);
        setContent(result);
      })
  },[])

  const postFrom = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({title, body})
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options)
      .then(res=>res.json())
      .then(result=>{
        router.push(`/read/${result.id}`);
        router.refresh()
    })
  }

  return (    
    <form className='p-1' onSubmit={postFrom}>
      <p className='p-2'>
        <input type='text' placeholder='title' name='title' value={content.title} 
        className='text-blue-300'
        onChange={(value)=>{
          setContent(rev => [value, rev[1]]);
        }}
        />        
      </p>
      <p className='p-2'>
          <textarea name="body" placeholder='body' className='text-black' value={content.body}
          onChange={(value)=>{
            setContent(rev => [rev[0], value]);
          }}
          />
      </p>
      <p className='p-2 '>
        <button type='submit' className='text-white bg-slate-500 rounded-md px-10 py-2'>수정
        </button>
      </p>
    </form>
  )
}

export default page