import React, { useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Flex,
  Box,
  Spacer,
  Heading,
  ButtonGroup,
} from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const users = await fetch('http://localhost:3000/users/'); // Fetch users from API

  return {
    users: await users.json(),
  };
};

export const AddEventForm = ({ addEvent }) => {
  const { users } = useLoaderData();
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(), // unique ID
      title,
      createdBy: selectedUser,
      description,
      location,
      categoryIds,
    };
    addEvent(newEvent);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex minWidth="max-content" alignItems="center" gap="2" mt="1rem">
        <Box p="2">
          <Heading size="md">Add an Event</Heading>
          <FormControl isRequired>
            <FormLabel>Event Title</FormLabel>
            <Input
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isRequired
            />
            <FormLabel>Created By:</FormLabel>
            <Select
              placeholder="Select user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              isRequired
            >
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </Select>
            <FormLabel>Event Description:</FormLabel>
            <Input
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
            />
            <FormLabel>Event Location:</FormLabel>
            <Input
              placeholder="Event Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              isRequired
            />
            <FormLabel>Categories:</FormLabel>
            <Select
              name="categories"
              multiple={true}
              value={categoryIds}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => Number(option.value) // Convert to number
                );
                setCategoryIds(selectedOptions);
              }}
              isRequired
            >
              <option value={1}>Sports</option>
              <option value={2}>Games</option>
              <option value={3}>Relaxation</option>
            </Select>
          </FormControl>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Button type="submit" colorScheme="teal">
            Add Event
          </Button>
        </ButtonGroup>
      </Flex>
    </form>
  );
};
