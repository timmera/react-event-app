import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage, loader as eventLoader } from './pages/EventPage';
import { EventsPage, loader as eventListLoader } from './pages/EventsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { EventContextProvider } from './context/EventContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
        loader: eventListLoader,
      },
      {
        path: '/events/:eventId',
        element: <EventPage />,
        loader: eventLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <EventContextProvider>
        <RouterProvider router={router} />
      </EventContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
