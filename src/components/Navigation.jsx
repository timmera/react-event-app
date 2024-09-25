import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';

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
        <Link to="/">
          <Button>All events</Button>
        </Link>
        <Link to="/AddEvent">
          <Button>Add event</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
