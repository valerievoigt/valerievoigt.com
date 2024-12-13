"use client";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Grid, { GridVariant } from "../../../components/Grid/Grid";
import NavigationMenu from "../../../components/NavigationMenu/NavigationMenu";
import type { WorkQuery } from "../../../tina/__generated__/types";
import { defaultComponents } from "../../../tina/components";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: WorkQuery;
}

export default function ClientPage(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { work } = data;

  const [flexHeight, setFlexHeight] = useState<string>("65vh");

  useEffect(() => {
    if (!!window) {
      setFlexHeight(Math.round(window.innerHeight / 1.5) + "px");
    }
  }, []);

  return (
    <>
      <NavigationMenu />
      <Flex direction={"column"}>
        <Flex
          position={"relative"}
          align={"center"}
          justify={"center"}
          height={flexHeight}
        >
          <Image
            priority={true}
            src={work.images ? work.images![0] : ("" as any)}
            alt={""}
            fill
            style={{
              zIndex: "-1",
              objectFit: "cover",
            }}
          />
          <Text
            style={{ color: "#cd00e4" }}
            size={{ initial: "6", md: "9" }}
            weight={"bold"}
            wrap={"pretty"}
          >
            {work.name}
          </Text>
        </Flex>

        <Flex
          direction={{ initial: "column", md: "row" }}
          wrap={"wrap"}
          py={"2"}
          justify={"center"}
        >
          {work.info?.map((item, i) => (
            <Box key={i} mx="2">
              <Text size="4" weight={"medium"}>
                {item?.key}:{" "}
              </Text>
              <Text size="4">{item?.value}</Text>
            </Box>
          ))}
        </Flex>

        <Container mt="6" mx="2">
          <TinaMarkdown
            content={work.detailedInfo}
            // TODO How about a TinaFieldSettings object that does TinaFieldSettings[components] or so?
            components={{
              ...defaultComponents,
            }}
          />
        </Container>

        <Container py={"2"} mx="2">
          <Grid
            variant={GridVariant.Reference}
            content={work._sys.relativePath}
          />
        </Container>
      </Flex>
    </>
  );
}
