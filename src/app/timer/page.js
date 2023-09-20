'use client'
import { useEffect, useState } from "react";

function page() {
  const [session, setSession] = useState(5)
  const [timer, setTimer] = useState(2)
  const [isRunning, setIsRunning] = useState(false)
  const [resetTime, setResetTime] = useState(900)

  let time = new Date(timer * 1000).toISOString().substr(11, 8);

  function sessionIncrement() {
    setSession(prevSession => session + 1)
  }
  function sessionDecrement() {
    if (session > 0) {
      setIsRunning(false)
      setSession(prevSession => prevSession > 0 && prevSession - 1)
    }
  }

  function resetTimer() {
    setIsRunning(false)
    setTimer(resetTime)
  }

  function increment() {
    const newTime = timer + 300
    setIsRunning(false);
    setTimer(newTime);
    setResetTime(newTime)
  }

  function decrement() {
    const newTime = timer - 300
    setIsRunning(false);
    setTimer(newTime);
    setResetTime(newTime)
  }


  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer > 0 && prevTimer - 1)
      }, 1000);
      if (timer === 0) {
        sessionDecrement()
        setIsRunning(false)
      }
      return () => clearInterval(interval)
    }
  }, [isRunning, session, timer])

  useEffect(() => {
    setResetTime(timer)
  }, [])


  return (
    <div className='flex felx-1 gap-5'>
      <h1>Session #{session}</h1>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => sessionDecrement()}>-</button>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => sessionIncrement()}>+</button>
      <h1>{time}</h1>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => setIsRunning(false)} >Pause</button>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => setIsRunning(true)}>Start</button>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => resetTimer()}>Reset</button>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => decrement()}>-</button>
      <button className='bg-slate-700 px-3 py-0 rounded-md' onClick={() => increment()}>+</button>
    </div>
  );
}

export default page;