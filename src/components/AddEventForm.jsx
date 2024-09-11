import React, { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

export const AddEventForm = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categoryIds, setCategoryIds] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(), // or use a better unique ID generator
      title,
      description,
      location,
      categoryIds,
    };
    addEvent(newEvent);
    setTitle('');
    setDescription('');
    setLocation('');
    setCategoryIds();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          name="categories"
          multiple={true}
          defaultValue={[1, 2]}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => Number(option.value) // Convert to number
            );
            setCategoryIds(selectedOptions);
          }}
        >
          <option value={1}>sports</option>
          <option value={2}>games</option>
          <option value={3}>relaxation</option>
        </select>
        <Button type="submit">Add Event</Button>
      </Stack>
    </form>
  );
};
