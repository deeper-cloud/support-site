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
    <VStack align="start">
      {icon}
      <Heading>{title}</Heading>
      <Text h="64px">{description}</Text>
      {action && (
        <Button variant="outline">
          <Link href={link}>{action}</Link>
        </Button>
      )}
    </VStack>
  );
}
