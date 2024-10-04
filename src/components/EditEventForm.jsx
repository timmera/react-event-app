import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';

export const EditEventForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const event = useRouteLoaderData('editEvent');
  const users = useRouteLoaderData('events').userData;
  const categories = useRouteLoaderData('editEvent').categories;
  const eventCategories = event.event.categoryIds;
  console.log('event', event);
  console.log('categories', categories);
  console.log('eventCategories', eventCategories);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      id: event.event.id,
      createdBy: Number(event.event.createdBy),
      title: event.event.title,
      description: event.event.description,
      image: event.event.image,
      location: event.event.location,
      categoryIds: Number(eventCategories),
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const editedEvent = {
      createdBy: data.createdBy,
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: data.categoryIds.map((id) => Number(id)),
      location: data.location,
    };

    const editEvent = async () => {
      const response = await fetch(
        `http://localhost:3000/events/${event.event.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(editedEvent),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to edit event');
      } else {
        return response.json();
      }
    };

    try {
      await toast.promise(editEvent(), {
        success: {
          title: 'The event is changed',
          description: 'Looking good',
        },
        error: {
          title: "The event couldn't be changed",
          description: 'Something went wrong',
        },
        loading: {
          title: 'The changes are being processed',
          description: 'Please wait',
        },
      });
      onClose();
      reset();
      navigate(`/events/${event.event.id}`);
    } catch (error) {
      console.error('Error during editing event:', error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate(`/events/${event.event.id}`);
        }}
        size={{ base: 'full', sm: 'lg' }}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader fontWeight="bold">Edit Event</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody paddingY={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection="column" rowGap="10px">
                <FormControl>
                  <FormLabel>Title</FormLabel>

                  <Input
                    type="text"
                    name="title"
                    {...register('title', {
                      required: 'Fill in a title for your event',
                    })}
                  />
                  <Text color="red.500">{errors.title?.message}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Created By:</FormLabel>

                  <Select {...register('createdBy', { valueAsNumber: true })}>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Select>
                  <Text color="red.500">{errors.createdBy?.message}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Short description</FormLabel>
                  <Input
                    type="text"
                    name="description"
                    {...register('description', {
                      required: 'Fill in a short description for your event',
                      maxLength: {
                        value: 50,
                        message: 'Please, keep the description short',
                      },
                    })}
                  />
                  <Text color="red.500">{errors.description?.message}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Image url</FormLabel>
                  <Input
                    type="text"
                    name="image"
                    {...register('image', {
                      required: 'Upload an image for your event',
                    })}
                  />
                  <Text color="red.500">{errors.image?.message}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Location</FormLabel>

                  <Input
                    type="text"
                    name="location"
                    {...register('location', {
                      required: 'Fill in a location for your event',
                    })}
                  />
                  <Text color="red.500">{errors.location?.message}</Text>
                </FormControl>

                <FormControl>
                  <FormLabel>Categories</FormLabel>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    columnGap={5}
                  >
                    {categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        name={category.id}
                        value={category.id}
                        defaultChecked={eventCategories.includes(
                          Number(category.id)
                        )}
                        {...register('categoryIds', {
                          validate: (value) =>
                            value.length > 0 ||
                            'At least one category must be selected',
                        })}
                      >
                        {category.name}
                      </Checkbox>
                    ))}
                  </Stack>
                  {errors.categoryIds && (
                    <Text color="red.500">{errors.categoryIds.message}</Text>
                  )}
                </FormControl>

                <Divider mt={4} />

                <ModalFooter flexDirection={['column', 'row']} gap="10px">
                  <Flex direction={{ base: 'column', sm: 'row' }} gap="10px">
                    <Button
                      mr={3}
                      mt={4}
                      size="sm"
                      onClick={() => {
                        onClose();
                        navigate(`/`);
                      }}
                    >
                      Close
                    </Button>
                    <Button type="submit" mt={4} colorScheme="green" size="sm">
                      Edit event
                    </Button>
                  </Flex>
                </ModalFooter>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
