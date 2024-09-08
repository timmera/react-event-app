import React from 'react';
import {
  Heading,
  Card,
  Image,
  Stack,
  Box,
  CardBody,
  CardFooter,
  Text,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

import { useLoaderData, Link } from 'react-router-dom';

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
  const { events, categories } = useLoaderData();

  return (
    <>
      {events.map((event) => {
        const eventCategories = event.categoryIds.map((categoryId) =>
          categories.find((category) => category.id === categoryId)
        );
        return (
          <>
            <Stack mt="6" mb="4" spacing="3">
              <Box align={'center'}>
                <Card
                  key={event.id}
                  direction={{ base: 'column', sm: 'row' }}
                  overflow="hidden"
                  variant="outline"
                  mb="3"
                  mt="3"
                  maxW={{ base: '100%', sm: '60vw' }}
                  textAlign={{ base: 'center', sm: 'left' }}
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src={event.image}
                    alt={event.title}
                    borderRadius="lg"
                  />

                  <CardBody>
                    <Heading size="md">{event.title}</Heading>
                    <Text>{event.description}</Text>
                    <Text>
                      Categories:{' '}
                      {eventCategories
                        .map((category) => category.name)
                        .join(', ')}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Text maxW={'20vw'}>
                      Start: {event.startTime} - End: {event.endTime}
                    </Text>

                    <ButtonGroup spacing="2">
                      <Link to={`events/${event.id}`}>
                        <Button variant="solid" colorScheme="green">
                          View Event details
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            </Stack>
          </>
        );
      })}
    </>
  );
};
