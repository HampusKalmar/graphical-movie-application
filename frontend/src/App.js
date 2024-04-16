import './App.css'
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('')
  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my App using React and Flask</h1>
        <p>{data || 'Loading data...'}</p>
      </header>
    </div>
  );
}

export default App;
