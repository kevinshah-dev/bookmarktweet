import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Callback from './components/Callback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/twitter_callback" element={<Callback />} />
      </Routes>
    </Router>

  );
}

export default App;
