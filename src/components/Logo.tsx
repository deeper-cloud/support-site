import Link from "next/link";
import { Text } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Link href="/">
      <Text
        fontFamily="PloniBold"
        fontSize="3xl"
        _hover={{ color: "accent.500", cursor: "pointer" }}
      >
        Deeper
      </Text>
    </Link>
  );
};

export default Logo;
