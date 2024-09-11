import React from 'react';
import { useState } from 'react';
import { AddEventForm } from '../components/AddEventForm';

export const AddEvent = () => {
  const [events, setEvents] = useState([]);
  const addEvent = async (newEvent) => {
    const response = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    setEvents([...events, data]);
  };
  return (
    <>
      <AddEventForm addEvent={addEvent} />
    </>
  );
};
