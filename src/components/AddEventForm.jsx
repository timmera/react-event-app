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
  ModalFooter,
  useDisclosure,
  useToast,
  Divider,
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(), // unique ID
      title,
      createdBy: selectedUser,
      description,
      location,
      categoryIds,
    };
    try {
      await toast.promise(addEvent(newEvent), {
        success: {
          title: 'Event added',
          description: `${title} is successfully added`,
        },
        error: {
          title: 'Something went wrong',
          description: `${title} couldn't be added`,
        },
        loading: {
          title: 'Please wait',
          description: `${title} is being added`,
        },
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to add event. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      onClose();
      navigate(`/`);
      setTitle('');
      setSelectedUser('');
      setDescription('');
      setLocation('');
      setCategoryIds([]);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="sm">
        Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader fontWeight="bold">Add Event</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  isRequired
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <ModalFooter flexDirection={['column', 'row']} gap="10px">
                  <Button mr={3} mt={4} size="sm" onClick={onClose}>
                    Close
                  </Button>
                  <Button mt={4} type="submit" colorScheme="green" size="sm">
                    Add Event
                  </Button>
                </ModalFooter>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
