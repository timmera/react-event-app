import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  Heading,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { MdBuild, MdDelete, MdInfoOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { DeleteEvent } from '../components/DeleteEvent';

export const EventsPage = () => {
  const data = useRouteLoaderData('events');
  const [eventData, setEventData] = useState(data.eventData || []);
  const [userData, setUserData] = useState(data.userData || []);

  useEffect(() => {
    setEventData(data.eventData);
    setUserData(data.userData);
  }, [data.eventData]);

  console.log('render of page');
  console.log('eventData:', eventData);
  console.log('userData:', userData);

  return (
    <>
      {eventData.map((event) => {
        const eventCreator = userData?.find(
          (user) => Number(user.id) === event.createdBy
        )?.name;
        return (
          <Flex
            minWidth="max-content"
            alignItems="center"
            gap="2"
            key={event.id}
          >
            <Box p="2">
              <Heading size="md">{event.title}</Heading>
              <Text>Added by: {eventCreator}</Text>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
            </Box>
            <Spacer />
            <ButtonGroup gap="2">
              <Link to={`events/${event.id}`}>
                <Button
                  leftIcon={<MdInfoOutline />}
                  colorScheme="green"
                  size="sm"
                >
                  Event Details
                </Button>
              </Link>
              <Button
                leftIcon={<MdBuild />}
                colorScheme="blue"
                size="sm"
                variant="outline"
              >
                Edit Event
              </Button>
              <DeleteEvent event={event} />
            </ButtonGroup>
          </Flex>
        );
      })}
    </>
  );
};
