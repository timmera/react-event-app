import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { AddEvent } from '../pages/AddEvent';

export const Navigation = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mb="2rem"
      gap="2rem"
      textAlign="center"
    >
      <Heading>Eventlist</Heading>
      <Flex flexDirection="row" gap="2rem">
        <Link href="/">
          <Button size="sm" colorScheme="blue">
            All Events
          </Button>
        </Link>
        <AddEvent />
      </Flex>
    </Flex>
  );
};
