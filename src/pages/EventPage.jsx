import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useRouteLoaderData, Link } from 'react-router-dom';

export const EventPage = () => {
  const event = useRouteLoaderData('event');
  return (
    <>
      <div className="event-detail">
        <Heading>{event.event.title}</Heading>
        <Link to={`/users/${event.user.id}`}>{event.user.name}</Link>
        <p>{event.event.description}</p>
        <img src={event.event.image} alt={event.event.title} />
      </div>
    </>
  );
};
