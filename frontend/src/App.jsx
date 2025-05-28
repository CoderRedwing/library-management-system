import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <AppRoutes />
    </div>
  );
}

export default App;
