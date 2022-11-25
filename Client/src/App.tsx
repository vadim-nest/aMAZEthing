import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './components/welcome';
import Game from './components/game';
import Learning from './components/learning';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/game',
        element: <Game />,
      },
      {
        path: '/learning',
        element: <Learning />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
