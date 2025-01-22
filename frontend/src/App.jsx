import { useState } from 'react'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="" alt="Vite logo" />
        </a>
      </div>
      <h1 className='text-9xl'>Vite + React</h1>
      <div className="">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
