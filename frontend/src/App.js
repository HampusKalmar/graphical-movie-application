import './App.css'
import { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/movie-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my App using React and Flask</h1>
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {'IMDb Rating: ' + item['IMDB Rating']} {'Name of Movie: ' 
                + item['Movie Name']} {'Movie Rank: ' 
                + item['Movie Rank']} {'Year of release: ' 
                + item['Year of Release']}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
