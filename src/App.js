import './App.scss';

// IMPORT COMPONENTS
import Dashboard from './components/dashboard/dashboard';
import SongList from './components/shell/songlist';

const App = () => {
  return (
    <div className="App">
      <Dashboard />
      <SongList />
    </div>
  );
}

export default App;
