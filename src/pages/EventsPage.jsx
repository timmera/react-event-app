import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Heading,
  Text,
  Stack,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const loader = async () => {
  const events = await fetch('http://localhost:3000/events'); // Fetch events from API
  const users = await fetch('http://localhost:3000/users'); // Fetch users from API
  const categories = await fetch('http://localhost:3000/categories'); // Fetch categories from API

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:3000/events'),
          fetch('http://localhost:3000/categories'),
        ]);

        if (!eventsResponse.ok || !categoriesResponse.ok) {
          toast({
            title: 'An error occurred.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }

        const eventsData = await eventsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (err) {
        toast({
          title: 'An error occurred.',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <Stack spacing={4}>
      {events.map((event) => {
        const eventCategories = event.categoryIds.map((categoryId) =>
          categories.find((category) => category.id === categoryId)
        );

        return (
          <Box key={event.id} align="center">
            <Card
              direction={{ base: 'column', sm: 'column' }}
              overflow="hidden"
              variant="outline"
              mb="3"
              maxW="80vw"
            >
              <Heading size="md">{event.title}</Heading>
              <Text>{event.description}</Text>
              <Text>Location: {event.location}</Text>
              <Text>
                Categories:{' '}
                {eventCategories.map((category) => category?.name).join(', ')}
              </Text>
              <ButtonGroup spacing="2">
                <Link to={`events/${event.id}`}>
                  <Button variant="solid" colorScheme="green">
                    View Event details
                  </Button>
                </Link>
              </ButtonGroup>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};
