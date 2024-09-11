import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import { Image } from '@chakra-ui/react';

export const loader = async ({ params }) => {
  const user = await fetch(`http://localhost:3000/users/${params.userId}`); // Fetch users from API

  return {
    user: await user.json(),
  };
};

export const UserPage = () => {
  const { user } = useLoaderData();
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
