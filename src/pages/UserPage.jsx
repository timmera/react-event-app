import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Image } from '@chakra-ui/react';

export const UserPage = () => {
  const user = useRouteLoaderData('user');
  return (
    <>
      <div className="user-detail">
        <Heading>{user.name}</Heading>
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={user.image}
          alt={user.name}
          borderRadius="lg"
        />
      </div>
    </>
  );
};
