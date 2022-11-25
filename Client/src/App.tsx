import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';


function App() {
  return (
    <div>
      <Navbar />
      <div className="outlet">
        <Outlet />  
      </div>
    </div>
  )
}

export default App
