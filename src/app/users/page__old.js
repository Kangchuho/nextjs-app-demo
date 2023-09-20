'use client'
// import React, { useEffect, useState } from 'react'

const options = {
  method: 'GET',
  headers: {
    'app-user': 'monitor',
    'device-id': 'web-server',
  },
  cache: 'no-store',
  next: { revalidate: 0 }
}

async function page() {
  let users = null;
  // const [users, setUsers] = useState(null)
  // useEffect(() => {
  //   async function aa() {
      try {
        const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'info/', options);
        users = await resp.json();
        // const items = await resp.json();    
        //console.log('users page:',users);
        // setUsers(items);
      } catch (error) {
        console.error(error);
      }
  //   }
  //   aa();
  // },[])

  return (
    <section>
      {users && users.map((user) => {
        return (
          <div key={new Date().toISOString}>
            {user.userName}
          </div>
        )
      })}
    </section>
  )
}

export default page