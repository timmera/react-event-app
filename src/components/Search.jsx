import { Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ changeFn, ...props }) => {
  return (
    <>
      <Stack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search your Event..."
            onChange={changeFn}
            {...props}
          />
        </InputGroup>
      </Stack>
    </>
  );
};
