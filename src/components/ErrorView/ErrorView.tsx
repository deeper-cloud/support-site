import { Heading, VStack, Text, Button } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

interface ErrorViewProps {
  message: string;
  action?: () => void;
  actionTitle?: string;
}

/**
 * a generic error view for general use
 * @returns
 */
export const ErrorView = ({ message, action, actionTitle }: ErrorViewProps) => {
  const { t } = useTranslation("common");
  return (
    <VStack paddingTop="16px">
      <VStack gap="2px">
        <Heading>{t("anErrorOccurred")}</Heading>
        <Text>{message}</Text>
        {actionTitle && <Button onClick={action}>{t(actionTitle)}</Button>}
      </VStack>
    </VStack>
  );
};
