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

/**
 * Component representing a bar chart displaying imdb movie ratings.
 * This component fetches data from the backend and displays it in a bar chart.
 * 
 * @returns {JSX.Element} BarChart component.
 */
function BarChart() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL
    fetch(`${apiUrl}/movie-data?search=${encodeURIComponent(search)}&limit=${parseInt(limit)}&page=${currentPage}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setData(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      setData([]); 
    });
  }, [search, limit, currentPage]);

  const chartData = {
    labels: Array.isArray(data) ? data.map(item => item['Movie Name']) : [],
    datasets: [
      {
        label: 'IMDB Rating',
        data: Array.isArray(data) ? data.map(item => item['IMDB Rating']) : [],
        // Gammal lösning:
        // data.map(item => item['IMDB Rating']),
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
      value={search} 
      onChange={e => setSearch(e.target.value)} 
      placeholder='Search for a movie...'
      />

      <select className='movie-options' value={limit} onChange={e => setLimit(e.target.value)}>
        <option value='10'>10 Movies</option>
        <option value='50'>50 Movies</option>
        <option value='100'>100 Movies</option>
        <option value='200'>500 Movies</option>
        <option value='1000'>1000 Movies</option>
        <option value='2000'>All Movies</option>
      </select>
      <button className='page-button' onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}>Previous</button>
      <button className='page-button' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      <span className='page-info'>Page {currentPage}</span>
      {data.length ? <Bar data={chartData} options={options}/> : <p>No movies to display</p>}
    </div>
  );
}

export default BarChart;
