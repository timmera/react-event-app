import { Box, Button, Text, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';

export const CategoryFilter = ({ selectedValue, setSelectedValue }) => {
  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value === selectedValue ? null : value);
  };

  const data = useRouteLoaderData('events');
  const categories = data.categories;

  return (
    <>
      <Box
        width={{ base: '100px', md: '200px', lg: '500px' }}
        ml={{ base: '10px', md: '30px', lg: '40px' }}
        mb={{ base: '20px', md: '30px', lg: '40px' }}
        flexDirection={{ base: 'column', sm: 'row', md: 'row' }}
      >
        <Text>Filter by category:</Text>
        <RadioGroup value={selectedValue}>
          <Stack>
            {categories.map((category) => (
              <Radio
                key={category.id}
                name={category.id}
                onChange={handleCategoryChange}
                value={category.id}
                isChecked={selectedValue === category.id}
                borderColor={'black'}
                colorScheme="green"
              >
                {category.name}
              </Radio>
            ))}
            <Button
              onClick={() => {
                setSelectedValue(null);
              }}
              width={{ base: '100px' }}
            >
              Reset filter
            </Button>
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};
