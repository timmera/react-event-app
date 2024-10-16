import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useRouteLoaderData, Link } from 'react-router-dom';
import { MdBuild } from 'react-icons/md';
import {
  Box,
  ButtonGroup,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { DeleteEvent } from '../components/DeleteEvent';

export const EventPage = () => {
  const event = useRouteLoaderData('event');
  const categories = useRouteLoaderData('event').categories;
  const user = useRouteLoaderData('event').user;
  const categoryIds = event.event.categoryIds;
  const matchedCategories = categories.filter((category) => {
    return categoryIds.includes(Number(category.id));
  });

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'event image'}
            src={event.event.image}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
            sx={{
              boxShadow:
                '0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12)',
            }}
          />
        </Flex>
        <Stack spacing={{ base: 2, md: 4 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {event.event.title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {event.event.description}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <VStack spacing={{ base: 2, sm: 4 }}>
              <Box alignContent={'left'}>
                <Image src={user.image} alt={user.name} width={'100px'} />
                <Text fontSize="xs">Created by: {user.name}</Text>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore
                </Text>
                <Text fontSize={'lg'}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                  maxime modi nam officiis porro, quae, quisquam quos
                  reprehenderit velit? Natus, totam.
                </Text>
              </Box>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Categories
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  {matchedCategories.map((category) => (
                    <ListItem key={category.id}>{category.name}</ListItem>
                  ))}
                </List>
              </SimpleGrid>
            </Box>
            <ButtonGroup gap={4}>
              <Link to={`/EditEvent/${event.event.id}`}>
                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="blue"
                  size="sm"
                  variant="outline"
                >
                  Edit
                </Button>
              </Link>
              <DeleteEvent event={event.event} size="sm" />
            </ButtonGroup>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
