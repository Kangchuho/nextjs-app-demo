// cache: 'no-store' 옵션은 필수항목임. 서버건, 클라이언트건 (물론 가끔 업데이트 필요한경우. next: { revalidate: 0 } 를 사용한다.)
const options = {
  method: 'GET',
  headers: {
    'app-user': 'monitor',
    'device-id': 'web-server',
  },
  cache: 'no-store'
}

// 서버에서 요청할경우 화면처리방법
// build의 경우를 고려하여 fetch가 정상적으로 안되는 경우의 try..catch를 해줘야 빌드시 오류나 안남.
async function read(props) {
  let data = null
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'user', options)  
    data = await res.json();   
    console.log(data); 
  } catch (error) {
    console.log(error)
  }
  // 사용자추가 부분은 별도로 뽑아서 use client로 동작시켜야 한다.
  const userAdd = () => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'app-user': 'monitor',
        'device-id': 'web-server',
      },
      body: JSON.stringify({
          userName: "사용자",
          deviceId: new Date().toISOString(),
          isAdmin: false
        })
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'user',options)
      .then((res)=>{
        // console.log(res);
        return res.json()
      })
      .then(result=>{
        // console.log(result)
        //route.refresh(`/read/${result.id}`);
        setNewId(result.id)
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
            Members: {data?.length}
          </h2>        
          {data && data.map((user)=>{
            return (<div>
              {user.userName}
            </div>)
          })}
        </div>
      </section>
      <section className='flex w-full justify-center mt-2'>
        <div>
          {/* <button className='px-10 bg-yellow-600 rounded-md py-2' name='add' onClick={()=>{
            userAdd()
          }}>Add User</button> */}
        </div>
      </section>
    </>
  )
}

export default read