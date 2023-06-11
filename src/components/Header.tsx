import { Heading, VStack, Text } from "@chakra-ui/react";

export const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <VStack align="start">
      <Heading size="3xl">{title}</Heading>
      <Text fontSize="xl">{description}</Text>
    </VStack>
  );
};
