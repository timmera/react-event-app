import { EventsPage } from './EventsPage';
import { EventContextProvider } from '../context/EventContext';

export const EventsListPage = () => {
  return (
    <>
      <h1>Event List Page</h1>
      <EventContextProvider>
        <EventsPage />
      </EventContextProvider>
    </>
  );
};
