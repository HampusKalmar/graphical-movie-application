import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import '../App.css'

ChartJS.register(
  CategoryScale, 
  LinearScale,
  BarElement,
  Tooltip, 
  Legend,
  Title
);

function BarChart() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    fetch(`/movie-data?search=${encodeURIComponent(search)}&limit=${parseInt(limit)}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch((error) => console.log(error))
  }, [search, limit])

  const chartData = {
    labels: data.map(item => item['Movie Name']),
    datasets: [
      {
        label: 'IMDB Rating',
        data: data.map(item => item['IMDB Rating']),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'IMDB Ratings by Movie'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
 
  return (
    <div className='chart-container'>
      <input 
      type='text' 
      value={search} 
      onChange={e => setSearch(e.target.value)} 
      placeholder='Search for a movie...'
      />

      <select value={limit} onChange={e => setLimit(e.target.value)}>
        <option value='10'>10 Movies</option>
        <option value='50'>50 Movies</option>
        <option value='100'>100 Movies</option>
        <option value='200'>500 Movies</option>
        <option value='1000'>1000 Movies</option>
        <option value='2000'>All Movies</option>
      </select>
      {data.length ? <Bar data={chartData} options={options}/> : <p>No movies to display</p>}
    </div>
  );
}

export default BarChart;
