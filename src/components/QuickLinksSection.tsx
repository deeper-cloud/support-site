import {
  Button,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Fade,
  Collapse,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface QuickLinkSectionProps {
  icon?: JSX.Element;
  title: string;
  description: string;
  action: string;
  link: string;
}

export function QuickLinkSection({
  icon,
  title,
  description,
  action,
  link,
}: QuickLinkSectionProps) {
  const router = useRouter();
  return (
    <VStack
      align="start"
      justify="space-between"
      gap="24px"
      padding="0px 1.5rem"
    >
      {icon}
      <VStack align="start">
        <Heading lineHeight="24px">{title}</Heading>
        <Text fontSize="medium">{description}</Text>
      </VStack>
      {action && (
        <Button variant="outline">
          <Link href={link}>{action}</Link>
        </Button>
      )}
    </VStack>
  );
}
