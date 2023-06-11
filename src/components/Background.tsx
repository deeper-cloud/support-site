import { Box } from '@chakra-ui/react';

const Background = () => {
  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      top={0}
      bottom={0}
      bg="primary"
      zIndex={-999}
    />
  );
};

export default Background;
