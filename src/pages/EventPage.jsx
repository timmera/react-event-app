import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useLoaderData, Link } from 'react-router-dom';

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`); // Fetch events from API
  const users = await fetch('http://localhost:3000/users'); // Fetch users from API

  return {
    event: await event.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, users } = useLoaderData();
  return (
    <>
      <div className="event-detail">
        <Heading>{event.title}</Heading>
        <Link to={`users/${event.createdBy}`}>{users.createdBy}</Link>
        <Link to={`/users/${event.createdBy}`}>
          {users.find((user) => user.id === event.createdBy).name}
        </Link>
        <p>{event.description}</p>
      </div>
    </>
  );
};
