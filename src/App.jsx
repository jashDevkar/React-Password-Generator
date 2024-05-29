import { useEffect, useState, useRef, useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacteAllowed] = useState(false);
  const [password, setPassword] = useState("sbfkhi");
  const [btn,setBtn]=useState('Copy')

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789"
    }
    if (characterAllowed) {
      str += "#$%^&*(){}[]!@~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass)
  }, [characterAllowed, numberAllowed, length, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, characterAllowed, numberAllowed])

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    setBtn('Copied')
    setTimeout(() => {
      setBtn('Copy')
    },2000);

  }

  return (
    <>
      <div className='h-screen bg-black pt-3'>
        <h1 className='text-center font-bold text-lg text-white '>Password-Generator</h1>

        <div className='text-white justify-center  my-3  flex px-5'>

          <div className='bg-gray-700 justify-center flex rounded-full flex-col flex-wrap max-w-md w-full px-6 py-2 h-full max-h-52' >

            <div className='flex my-2 overflow-hidden w-full'>
              <input type="text"
                value={password}
                className='text-black outline-0 w-full rounded-l-lg p-1 box-border text-sm'
                readOnly
                ref={passwordRef} />
              <button className='bg-blue-600 px-1 rounded-r-lg text-sm' onClick={() => copyPassword()} >{btn}</button>
            </div>


            <div className='flex flex-row gap-x-5 mb-2'>

              <div className='gap-2 flex'>
                <input
                  type='range'
                  value={length}
                  min={8}
                  max={16}
                  onChange={(e) => setLength(e.target.value)} />
                <label className='text-xs text-orange-400'>Length: {length}</label>
              </div>

              <div className='flex gap-x-1'>
                <input type='checkbox'
                  defaultChecked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)} />
                <label className='text-xs text-orange-400'>Number</label>
              </div>

              <div className='flex gap-x-1'>
                <input type='checkbox'
                  defaultChecked={characterAllowed}
                  onChange={() => setCharacteAllowed((prev) => !prev)} />
                <label className='text-xs text-orange-400'>Character</label>
              </div>

            </div>


          </div>


        </div>


      </div>
    </>
  )
}

export default App
