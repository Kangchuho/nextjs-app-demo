'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const options = {
  method: 'GET',
  headers: {
    'app-user': 'monitor',
    'device-id': 'web-server',
  },
  cache: 'no-store',
}

function read(props) {

  const router = useRouter();
  // const id = props.params.id
  const params = useParams()
  const id = params.id;
  const [content, setContent] = useState(null)  
  // console.log(id)
  
  const [newId, setNewId] = useState(new Date().toISOString());

  useEffect(() => {    
    fetch(process.env.NEXT_PUBLIC_API_URL+'user', options)
      .then(res=>res.json())
      .then(result => {
        // console.log('users: ',result);
        setContent(result);
      })
  },[newId])

  async function reload() {    
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'user', options)  
      const data = await res.json();   
      setContent(data);
      console.log(data); 
    } catch (error) {
      console.log(error)
    }
  }

  const userAdd = () => {
    const options = {
      method: 'POST',
      headers: {
        'app-user': 'monitor',
        'device-id': 'web-server',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
          id: 0,
          userName: "사용자",
          deviceId: new Date().toISOString(),
          isAdmin: false
        })
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'user',options)
      .then((res)=>{
        // console.log(res);
        try {          
          return res.json()
        } catch (error) {
          console.log(error);
          // alert();
        }
      })
      .then(result=>{
        console.log(result.id)
        //route.refresh(`/read/${result.id}`);
        setNewId(result.id)
        // reload();
        // router.refresh();
        // router.push(`/users`);
        // location.href = '/users'
    })
  }


  return (
    <>
      <section className='flex bg-slate-400/70 rounded-md p-5'>      
        <div>
          <h2 className='text-[26px] text-yellow-300'>
            Users: {content ? content.length : null}
          </h2>        
          {content ? content.map((user)=>{
            return (<div key={`user-'${user.id}'`}>
              {user.userName}
            </div>)
          }) : null}
        </div>
      </section>
      <section className='flex w-full justify-center mt-2'>
        <div>
          <button className='px-10 bg-yellow-600 rounded-md py-2' name='add' onClick={()=>{
            userAdd();
          }}>Add User</button>
        </div>
      </section>
    </>
  )
}

export default read