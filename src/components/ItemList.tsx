import { QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Collapse,
  Divider,
  Fade,
  HStack,
  Heading,
  Skeleton,
  Spinner,
  Tag,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { ErrorView } from "./ErrorView/ErrorView";
import Link from "next/link";

export interface Item {
  type: "question" | "topic";
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface ItemListProps {
  title?: string;
  items: Item[];
}

export function ItemList({ title, items }: ItemListProps) {
  function renderIcon(type: string): JSX.Element {
    const size = { height: "1.5rem", width: "1.5rem" };
    switch (type) {
      case "question":
        return <QuestionIcon {...size} />;
      default:
        return <QuestionIcon {...size} />;
    }
  }

  function renderItemsView() {
    if (items.length === 0) {
      return (
        <Center>
          <Text>No results found</Text>
        </Center>
      );
    }

    return (
      <VStack align="start" gap="2rem">
        {items.map((item) => (
          <ItemList.ItemView
            key={item.link}
            icon={renderIcon(item.type)}
            title={item.title}
            description={item.description}
            tags={item.tags}
            link={item.link}
          />
        ))}
      </VStack>
    );
  }

  if (title)
    return (
      <VStack align="start" gap="16px">
        <VStack align="start">
          <Heading lineHeight="24px">{title}</Heading>
          <Divider w="128px" borderColor="accent.500" opacity={0.5} />
        </VStack>
        {renderItemsView()}
      </VStack>
    );

  return renderItemsView();
}

interface ItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

function ItemView({ icon, title, description, tags, link }: ItemProps) {
  return (
    <Link href={link}>
      <HStack minH="64px" gap="32px">
        <Box>{icon}</Box>
        <VStack align="start">
          {title && <Heading>{title}</Heading>}
          {description && <Text>{description}</Text>}
          <Wrap>
            {tags.map((tag) => (
              <Tag colorScheme="accent" size="lg" key={tag}>
                {tag}
              </Tag>
            ))}
          </Wrap>
        </VStack>
      </HStack>
    </Link>
  );
}

ItemList.ItemView = ItemView;
