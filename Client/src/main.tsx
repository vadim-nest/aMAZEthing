import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'
import Welcome from './components/welcome';
import Game from './components/game';
import Learning from './components/learning';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import About from './components/about';
import SortLesson from './components/sort-lesson';
import { Provider } from "react-redux";
import {store} from './features/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
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
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/sortLesson',
        element: <SortLesson />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
