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
import HeapLesson from './components/sortingLessons/heapSort';
import QuickLesson from './components/sortingLessons/quickSort';

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
      { path: '/learning/heapLesson', element: <HeapLesson /> },
      { path: '/learning/quickLesson', element: <QuickLesson />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
