import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddEvent } from './pages/AddEvent';
import { EventPage, loader as eventLoader } from './pages/EventPage';
import { EventsPage, loader as eventListLoader } from './pages/EventsPage';
import { UserPage, loader as userLoader } from './pages/UserPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Root } from './components/Root';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
        loader: eventListLoader,
      },
      {
        path: '/AddEvent',
        element: <AddEvent />,
      },
      {
        path: '/Events/:eventId',
        element: <EventPage />,
        loader: eventLoader,
        // action: addComment,
      },
      {
        path: '/Users/:userId',
        element: <UserPage />,
        loader: userLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
