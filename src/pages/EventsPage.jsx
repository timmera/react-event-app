import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  Badge,
  Heading,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Text,
  CardBody,
  CardFooter,
  Card,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { MdBuild, MdInfoOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { DeleteEvent } from '../components/DeleteEvent';
import { Search } from '../components/Search';

export const EventsPage = () => {
  const data = useRouteLoaderData('events');
  const [eventData, setEventData] = useState(data.eventData || []);
  const [userData, setUserData] = useState(data.userData || []);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    setEventData(data.eventData);
    setUserData(data.userData);
  }, [data]);

  const handleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const matchedEvents = eventData.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="2"
        direction="column"
        mb="4"
      >
        <Box>
          <Search onChange={handleSearch} />
        </Box>
        <Box>
          {matchedEvents.length > 1 ? (
            <>
              <Badge colorScheme="green">
                Found {matchedEvents.length} events
              </Badge>
            </>
          ) : matchedEvents.length == 1 ? (
            <>
              <Badge colorScheme="green">
                Found {matchedEvents.length} event
              </Badge>
            </>
          ) : (
            <Badge variant={'solid'} colorScheme={'red'}>
              No results found!
            </Badge>
          )}
        </Box>
      </Flex>
      <Flex
        gap="4"
        wrap="wrap"
        justifyContent="center"
        alignContent={'center'}
        alignItems={'center'}
        direction="row"
      >
        {matchedEvents.map((event) => {
          const eventCreator = userData?.find(
            (user) => Number(user.id) === event.createdBy
          )?.name;
          return (
            <Card
              maxW="sm"
              borderRadius="md"
              key={event.id}
              sx={{
                boxShadow:
                  '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)',
              }}
              minH={'400px'}
              minW={'500px'}
            >
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading fontSize="xl">{event.title}</Heading>
                  <Text fontSize="xs">Added by: {eventCreator}</Text>
                  <Divider />
                  <Box
                    bgColor={'blackAlpha.200'}
                    bgSize="cover"
                    bgRepeat={'no-repeat'}
                    bgImage={`url(${event.image})`}
                    bgBlendMode={'revert'}
                    height={'250px'}
                  >
                    <Text>{event.date}</Text>
                    <Text>{event.location}</Text>
                    <Text>{event.description}</Text>
                  </Box>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter justifyContent={'center'}>
                <ButtonGroup gap={4}>
                  <Link to={`events/${event.id}`}>
                    <Button
                      leftIcon={<MdInfoOutline />}
                      colorScheme="green"
                      size="sm"
                    >
                      Details
                    </Button>
                  </Link>
                  <Link to={`EditEvent/${event.id}`}>
                    <Button
                      leftIcon={<MdBuild />}
                      colorScheme="blue"
                      size="sm"
                      variant="outline"
                    >
                      Edit
                    </Button>
                  </Link>
                  <DeleteEvent event={event} />
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </>
  );
};
