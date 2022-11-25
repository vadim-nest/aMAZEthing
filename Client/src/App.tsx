import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './components/welcome';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Welcome />,
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
