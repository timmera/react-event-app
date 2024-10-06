import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { AddEvent } from '../pages/AddEvent';

export const Navigation = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mb="8"
      gap="8"
      textAlign="center"
      backgroundColor={'#A5B68D'}
    >
      <Heading>Current Events</Heading>
      <Flex flexDirection="row" gap="8" mb="8">
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
