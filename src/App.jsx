import { useState, useCallback, useEffect, useRef } from "react";



function App() {
const [length, setLength] = useState(6);
const [allowedNumber, setAllowedNumber] = useState(false);
const [allowedCharecter, setAllowedCharecter] = useState(false);
const [password, setPassword] = useState("");

// useRef Hook
const passwordRef = useRef(null);

const copyPasswordClipBoard =useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 10);
window.navigator.clipboard.writeText(password)
}, [password])

const randomPasswordGenerator = useCallback(()=>{
  let pass = ""
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if(allowedNumber) str += "0123456789"
  if(allowedCharecter) str += "!~+-*/.&%^$#@=><[]{}`"

  for (let i = 1; i < length; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass +=str.charAt(char)
    
  }
  setPassword(pass);

}, [length, allowedCharecter, allowedNumber, setPassword])

  useEffect(()=>{
    randomPasswordGenerator()
  }, [length, allowedNumber, allowedCharecter, randomPasswordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
        <h2 className='text-white text-5xl text-center my-3'>Random Generator!</h2>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          
            <input type="text" 
            ref={passwordRef}
            className="py-1 outline-none w-full px-3" 
            value={password} 
            placeholder="password" 
            readOnly/>
            <button 
            onClick={copyPasswordClipBoard}
            className="bg-blue-500 px-2 rounded ">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
          <input type="range" 
          min={6} 
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Lenght: {length}</label>
          <div className="flex items-center gap-x-1">
          
          <input type="checkbox" 
          defaultValue={allowedNumber}
          className="ml-4 "
          onChange={()=>{
            setAllowedNumber((prev)=>!prev)
          }}
           />
          <label className="px-2">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
          
          <input type="checkbox" 
          className="ml-4"
          defaultValue={allowedCharecter}
          onChange={()=>{
            setAllowedCharecter((prev) => !prev)}
          }
          />
          <label className="px-2">Checkbox</label>
          </div>
          
          </div>
        </div>

      </div>
    </>
  )
}

export default App