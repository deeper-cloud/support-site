import { Button, HStack } from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import Logo from "./Logo";
import Link from "next/link";

const Navbar = () => {
  const { t } = useTranslation("common");

  return (
    <HStack as="nav" justify="space-between" padding="0.5rem 1rem">
      <Logo />
      <Button variant="ghost" rightIcon={<ArrowRightIcon />}>
        <Link href="https://hub.deeper.cloud/login">{t("login")}</Link>
      </Button>
    </HStack>
  );
};

export default Navbar;
