import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  Badge,
  Checkbox,
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
import '../styles/index.css';

export const EventsPage = () => {
  const data = useRouteLoaderData('events');
  const categories = data.categories;
  const [eventData, setEventData] = useState(data.eventData || []);
  const [userData, setUserData] = useState(data.userData || []);
  const [searchField, setSearchField] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setEventData(data.eventData);
    setUserData(data.userData);
  }, [data]);

  const handleSearch = (event) => {
    setSearchField(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(value === selectedCategory ? null : value);
  };

  console.log('eventData', eventData);

  const matchedEvents = eventData.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryIds.includes(Number(selectedCategory))
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box>
        filter by category:
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            name={category.id}
            value={category.id}
            isChecked={selectedCategory === category.id}
            onChange={handleCategoryChange}
          >
            {category.name}
          </Checkbox>
        ))}
      </Box>
      <Box mb="4">
        <Search onChange={handleSearch} className="searchBox" />
      </Box>
      <Box>
        {matchedEvents.length > 1 ? (
          <>
            <Badge colorScheme="green">
              Found {matchedEvents.length} events
            </Badge>
          </>
        ) : matchedEvents.length === 1 ? (
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
                    height={'250px'}
                    className="imageBox"
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
    </Box>
  );
};
