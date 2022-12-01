import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Welcome from './components/welcome';
import Game from './components/game';
import Learning from './components/learning/learning';
import Login from './components/login';
import Profile from './components/profile';
import About from './components/about';
import BubbleLesson from './components/sortingLessons/bubbleLesson';
import { Provider } from 'react-redux';
import InsertionLesson from './components/sortingLessons/insertionLesson';
import { store } from './features/store';
import SelectionLesson from './components/sortingLessons/selectionLesson';
import MergeLesson from './components/sortingLessons/mergeSort';
import QuickLesson from './components/sortingLessons/quickSort';
import DfsLesson from './components/pathfindingLessons/dfsLesson';
import BfsLesson from './components/pathfindingLessons/bfsLesson';
import DijkstraLesson from './components/pathfindingLessons/dijkstraLesson';
import AllSortsPlay from './components/sortingLessons/allSortsPlay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/callback',
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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/learning/bubbleLesson',
        element: <BubbleLesson />,
      },
      { path: '/learning/insertionLesson', element: <InsertionLesson /> },
      { path: '/learning/selectionLesson', element: <SelectionLesson /> },
      { path: '/learning/mergeLesson', element: <MergeLesson /> },
      { path: '/learning/allSortsPlay', element: <AllSortsPlay /> },
      { path: '/learning/quickLesson', element: <QuickLesson />},
      { path: '/learning/dfsLesson', element: <DfsLesson />},
      { path: '/learning/bfsLesson', element: <BfsLesson />},
      { path: '/learning/dijkstraLesson', element: <DijkstraLesson />},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
