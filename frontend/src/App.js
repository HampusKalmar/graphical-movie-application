import './App.css'
import BarChart from './components/BarChart';

/**
 * Component representing the main application.
 *
 * @returns {JSX.Element} App component.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='main-title'>IMDb Movie Ratings</h1>
        <BarChart />
      </header>
    </div>
  );
}

export default App;
