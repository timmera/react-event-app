import { Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ changeFn, ...props }) => {
  return (
    <>
      <Stack width={{ base: '180px', md: '300px' }}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Events..."
            onChange={changeFn}
            borderColor={'black'}
            {...props}
          />
        </InputGroup>
      </Stack>
    </>
  );
};
