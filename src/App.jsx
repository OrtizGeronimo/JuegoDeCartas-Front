import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Config from './pages/Config';
import Table from './pages/Table';

function App() {
  return (
    <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/config" element={<Config />}/>
            <Route path="/table" element={<Table />}/>
    </Routes>
  );
}

export default App;
