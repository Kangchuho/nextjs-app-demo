'use client'
import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';

export function Controls() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const id = params.id;
  // console.log(`pathname:`,pathname)
  return (
    <>
      {pathname.includes('/update/') ? null : <>
        <ul className='flex flex-row justify-center items-center gap-6 mt-4'>
          {pathname == '/create' ? null : <>
            <li className='bg-slate-400 p-2 rounded-md text-black'><Link href='/create'>Create</Link></li>
          </>}
          {id ? <>
            <li className='bg-blue-400 p-2 rounded-md text-black'><Link href={`/update/${id}`}>Update</Link></li>
            <li className='bg-red-400 p-2 rounded-md text-black'><input type='button' value='Delete' onClick={()=>{
              const options = {
                method: 'DELETE',                
              }
              fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options)
                .then(resp=>resp.json())
                .then(()=>{
                  router.push('/')
                  router.refresh()
                })
            }} /></li>
          </> : null}
        </ul>
      </>}
    </>
    );
}
