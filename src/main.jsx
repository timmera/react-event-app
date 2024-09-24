import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddEvent } from './pages/AddEvent';
import { EventPage } from './pages/EventPage';
import { EventsPage } from './pages/EventsPage';
import { UserPage } from './pages/UserPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Root } from './components/Root';
import { ChakraProvider } from '@chakra-ui/react';
import { fetchData } from './service/ApiService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: async () => {
      const eventData = await fetchData(`/events/`);
      const userData = await fetchData(`/users/`);
      return { eventData, userData };
    },
    id: 'events',
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
      },
      {
        path: '/AddEvent',
        element: <AddEvent />,
      },
      {
        path: '/Events/:eventId',
        element: <EventPage />,
        loader: async ({ params }) => {
          const event = await fetchData(`/events/${params.eventId}`);
          const user = await fetchData(`/users/${event.createdBy}`);
          return { event, user };
        },
        id: 'event',
        // action: addComment,
      },
      {
        path: '/Users/:userId',
        element: <UserPage />,
        loader: ({ params }) => fetchData(`/users/${params.userId}`),
        id: 'user',
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
