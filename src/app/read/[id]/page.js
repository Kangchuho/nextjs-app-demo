'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function read(props) {
  // const id = props.params.id
  const params = useParams()
  const id = params.id;
  const [content, setContent] = useState([])  
  // console.log(id)
  useEffect(() => {    
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, {cache: 'no-store'})
      .then(res=>res.json())
      .then(result => {
        // console.log(id, result);
        setContent(result);
      })
  },[])
  return (
    <section className='flex bg-slate-400/70 rounded-md p-5'>      
      <div>
        <h2 className='text-[26px] text-yellow-300'>
          {content?.title}
        </h2>
        <div>
          {content?.body}
        </div>
      </div>

    </section>
  )
}

export default read