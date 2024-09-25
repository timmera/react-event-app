import React, { useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';

export const AddEventForm = ({ addEvent }) => {
  const events = useRouteLoaderData('events');
  const users = events.userData;
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(), // unique ID
      title,
      createdBy: selectedUser,
      description,
      location,
      categoryIds,
    };
    addEvent(newEvent);

    toast({
      title: 'Event has been added.',
      description:
        'Your event has been added successfully. You will be redirected to the events page.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    try {
      navigate(`/`);
    } catch (error) {
      console.error('An error occurred while adding the event:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Add an Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
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
                  size={5}
                  variant={'unstyled'}
                  isRequired
                  onChange={(e) => {
                    const selectedOptions = Array.from(
                      e.target.selectedOptions,
                      (option) => Number(option.value) // Convert to number
                    );
                    setCategoryIds(selectedOptions);
                  }}
                >
                  <option value={1}>Sports</option>
                  <option value={2}>Games</option>
                  <option value={3}>Relaxation</option>
                </Select>

                <Button mr={3} mt={4} onClick={onClose}>
                  Close
                </Button>
                <Button mt={4} type="submit" colorScheme="teal">
                  Add Event
                </Button>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
