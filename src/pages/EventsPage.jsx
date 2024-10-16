import { useRouteLoaderData, Link } from 'react-router-dom';
import {
  Badge,
  Radio,
  RadioGroup,
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
  Spacer,
  Divider,
} from '@chakra-ui/react';
import { MdInfoOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
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
    <Box minH={'100vh'}>
      <Flex gap="4">
        <Box
          width={{ base: '100px', md: '200px', lg: '500px' }}
          ml={{ base: '10px', md: '30px', lg: '40px' }}
          mb={{ base: '20px', md: '30px', lg: '40px' }}
          flexDirection={{ base: 'column', sm: 'row', md: 'row' }}
        >
          <Text>Filter by category:</Text>
          <RadioGroup value={selectedCategory}>
            <Stack>
              {categories.map((category) => (
                <Radio
                  key={category.id}
                  name={category.id}
                  onChange={handleCategoryChange}
                  value={category.id}
                  isChecked={selectedCategory === category.id}
                  borderColor={'black'}
                  colorScheme="green"
                >
                  {category.name}
                </Radio>
              ))}
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                }}
                width={{ base: '100px' }}
              >
                Reset filter
              </Button>
            </Stack>
          </RadioGroup>
        </Box>
        <Spacer />
        <Box>
          <Box mr={{ base: '20px', md: '30px', lg: '40px' }}>
            <Search onChange={handleSearch} />
          </Box>
          {matchedEvents.length > 1 ? (
            <Badge colorScheme="green">
              Found {matchedEvents.length} events
            </Badge>
          ) : matchedEvents.length === 1 ? (
            <Badge colorScheme="green">
              Found {matchedEvents.length} event
            </Badge>
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
        mb={'20px'}
      >
        {matchedEvents.map((event) => {
          const eventCreator = userData?.find(
            (user) => Number(user.id) === event.createdBy
          )?.name;
          return (
            <Card
              borderRadius="md"
              key={event.id}
              sx={{
                boxShadow:
                  '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)',
              }}
              minH={'400px'}
              width={{ base: '320px', sm: '400px', md: '500px' }}
            >
              <CardBody>
                <Stack mt="6">
                  <Link to={`events/${event.id}`}>
                    <Heading fontSize="xl">{event.title}</Heading>
                  </Link>
                  <Text fontSize="xs">Added by: {eventCreator}</Text>
                  <Divider />
                  <Box direction={'row'}>
                    {event.categoryIds.map((categoryId) => {
                      const eventCategory = categories?.find(
                        (cat) => Number(cat.id) === categoryId
                      )?.name;

                      let colorScheme = 'gray';
                      switch (eventCategory) {
                        case 'sports':
                          colorScheme = 'green';
                          break;
                        case 'games':
                          colorScheme = 'orange';
                          break;
                        case 'relaxation':
                          colorScheme = 'purple';
                          break;
                        default:
                          break;
                      }

                      return (
                        <Badge
                          key={categoryId}
                          name={categoryId}
                          value={categoryId}
                          colorScheme={colorScheme}
                          m={1}
                        >
                          {eventCategory}
                        </Badge>
                      );
                    })}
                  </Box>
                  <Link to={`events/${event.id}`}>
                    <Box
                      bgColor={'blackAlpha.200'}
                      bgSize="cover"
                      bgRepeat={'no-repeat'}
                      bgImage={`url(${event.image})`}
                      height={'250px'}
                      className="imageBox"
                    >
                      <Text align={'center'} backgroundColor={'whiteAlpha.600'}>
                        {event.date}
                      </Text>
                      <Text align={'center'} backgroundColor={'whiteAlpha.600'}>
                        {event.location}
                      </Text>
                      <Text align={'center'} backgroundColor={'whiteAlpha.600'}>
                        {event.description}
                      </Text>
                    </Box>
                  </Link>
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
                </ButtonGroup>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
};
