import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Config from './pages/Config';
import Table from './pages/Table';
import Register from './pages/Register';
import { SnackbarProvider } from 'notistack';
import Lobby from './pages/Lobby';

function App() {
  return (
    <SnackbarProvider anchorOrigin={ { 'horizontal': 'right', 'vertical': 'bottom' } }>
    <Routes>
            
              <Route path="/" element={<Login />}/>
              <Route path="/config" element={<Config />}/>
              <Route path="/lobby" element={<Lobby />}/>
              <Route path="/table" element={<Table />}/>
              <Route path="/register" element={<Register />}/>
            
    </Routes>
    </SnackbarProvider>
  );
}

export default App;
