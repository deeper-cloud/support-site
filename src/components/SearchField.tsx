import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Fade,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
  InputRightElement,
  Spinner,
  VStack,
} from "@chakra-ui/react";

export function SearchField({
  title,
  placeholder,
  onChange,
  value,
  loading = undefined,
}: {
  title?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  loading?: boolean;
}) {
  return (
    <VStack gap="16px" minWidth="90%" width="512px" align="start">
      {title && <Heading>{title}</Heading>}
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input value={value} placeholder={placeholder} onChange={onChange} />
        {loading !== undefined && (
          <InputRightElement>
            <Fade in={loading}>
              <Center>
                <Spinner size="sm" color="accent.500" />
              </Center>
            </Fade>
          </InputRightElement>
        )}
      </InputGroup>
    </VStack>
  );
}
