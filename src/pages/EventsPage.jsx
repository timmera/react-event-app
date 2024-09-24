import React, { useEffect, useState } from 'react';
import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Heading,
  Text,
  Stack,
  Spinner,
} from '@chakra-ui/react';

export const EventsPage = () => {
  const [loading, setLoading] = useState(false);

  const events = useRouteLoaderData('events');
  const eventData = events.eventData;
  const userData = events.userData;

  useEffect(() => {
    if (events) {
      setLoading(false);
    }
  }, [events, eventData, userData]);

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
      {eventData.map((event) => {
        const eventCreator = userData?.find(
          (user) => Number(user.id) === event.createdBy
        )?.name;
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
              <Text>Created by: {eventCreator ? eventCreator : 'Unknown'}</Text>

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
