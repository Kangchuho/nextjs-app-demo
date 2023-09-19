import React from 'react'

async function page() {

  return (
    <section className='flex flex-1 justify-center items-center'>
      <div className='flex flex-col'>

        <div className='flex w-full justify-center p-10 text-2xl'>NextJS Page</div>

        <div className='flex w-full justify-center items-center'>
          <img src='/hot_delivery.png' className='h-[180px] w-[180px] object-cover' />
        </div>
      </div>
    </section>
  )
}

export default page