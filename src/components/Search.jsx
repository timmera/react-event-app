import { Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

export const Search = ({ changeFn, ...props }) => {
  return (
    <>
      <Stack className="searchBox">
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Events..."
            onChange={changeFn}
            {...props}
          />
        </InputGroup>
      </Stack>
    </>
  );
};
