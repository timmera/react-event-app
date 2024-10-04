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
import { FetchData } from './service/FetchData';
import { EditEvent } from './pages/EditEvent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: async () => {
      const eventData = await FetchData(`/events/`);
      const userData = await FetchData(`/users/`);
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
        path: '/EditEvent/:eventId',
        element: <EditEvent />,
        loader: async ({ params }) => {
          const event = await FetchData(`/events/${params.eventId}`);
          const user = await FetchData(`/users/${event.createdBy}`);
          const categories = await FetchData(`/categories`);
          return { event, user, categories };
        },
        id: 'editEvent',
      },
      {
        path: '/Events/:eventId',
        element: <EventPage />,
        loader: async ({ params }) => {
          const event = await FetchData(`/events/${params.eventId}`);
          const user = await FetchData(`/users/${event.createdBy}`);
          const categories = await FetchData(`/categories/`);
          return { event, user, categories };
        },
        id: 'event',
        // action: addComment,
      },
      {
        path: '/Users/:userId',
        element: <UserPage />,
        loader: ({ params }) => FetchData(`/users/${params.userId}`),
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
