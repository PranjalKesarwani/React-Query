
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { QueryClient,QueryClientProvider } from 'react-query';
import './App.css'
import Query from './Query'
import { useState } from 'react';

function App() {


  const [showQuery, setShowQuery] = useState(true);


  return (
    <>
        <button onClick={() => setShowQuery((prev)=>!prev)} >Toggle Query</button>
        {
          showQuery && <Query />
        }

    </>
  )
}

export default App
