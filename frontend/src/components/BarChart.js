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

  useEffect(() => {
    fetch('/movie-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch((error) => console.log(error))
  }, [])

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
      {data.length ? <Bar data={chartData} options={options}/> : <p>No data to display</p>}
    </div>
  );
}

export default BarChart;
