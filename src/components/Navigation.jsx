import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabList, Tab } from '@chakra-ui/react';

export const Navigation = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <Link to="/">Events</Link>
        </Tab>
        <Tab>
          <Link to="/AddEvent">Add Event</Link>
        </Tab>
      </TabList>
    </Tabs>
  );
};
