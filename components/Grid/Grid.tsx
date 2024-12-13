import { Box, Flex, Grid as RadixGrid, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState, type LegacyRef } from "react";
import {
  GroupListField,
  ReferenceField as TinaReferenceField,
  type Template,
} from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../tina/__generated__/client";
import type { WorkConnectionEdges } from "../../tina/__generated__/types";
import { type ReferenceRelativePath } from "../../tina/components";
import {
  ReferenceField,
  RichTextField,
  type SpecialFieldKey,
} from "../../tina/fields";
import "./styles.css";

void React; // Making sure it's imported

export enum GridVariant {
  "Reference" = "Reference",
  "Rich-Text" = "Rich-Text",
  "Work-List" = "Work-List",
}

const specialFieldKeyToGridVariant: Record<SpecialFieldKey, GridVariant> = {
  referenceField: GridVariant.Reference,
  elements: GridVariant["Rich-Text"],
};

const fieldComponents: Record<GridVariant, (props: any) => JSX.Element> = {
  Reference: (props) => <TinaReferenceField {...props} />,
  "Rich-Text": (props) => <GroupListField {...props} />,
  "Work-List": () => <></>,
};

const doesTemplateKeyValueMatchCurrentFieldKey = (params: {
  templateKey: "variant";
  currentFieldKey: SpecialFieldKey;
  props: any;
}): boolean => {
  const { templateKey, currentFieldKey, props } = params;

  const currentReferenceFieldIndex = props.field.name.includes(currentFieldKey)
    ? props.field.name.match(/\d+/)?.[0]
    : undefined;

  const currentSelectedComponent =
    props.tinaForm.values.body.children[currentReferenceFieldIndex];

  const currentSelectedComponentVariant: GridVariant =
    currentSelectedComponent.props[templateKey];

  return (
    currentSelectedComponentVariant ===
    specialFieldKeyToGridVariant[currentFieldKey]
  );
};

const renderFieldBasedOnTemplateKey = (params: {
  templateKey: "variant";
  currentFieldKey: SpecialFieldKey;
  props: any;
}): JSX.Element | undefined => {
  const { templateKey, currentFieldKey, props } = params;

  return doesTemplateKeyValueMatchCurrentFieldKey({
    templateKey,
    currentFieldKey,
    props,
  })
    ? fieldComponents[specialFieldKeyToGridVariant[currentFieldKey]](props)
    : undefined;
};

export const GridTemplate = {
  name: "Grid",
  label: "Grid",
  ui: {
    defaultItem: {
      variant: GridVariant["Rich-Text"],
    },
  },
  fields: [
    {
      name: "variant",
      label: "Grid variant",
      type: "string",
      options: Object.keys(GridVariant),
    },
    {
      ...ReferenceField(["work"]), // TODO think of a solution for this
      ui: {
        component(props: any) {
          return renderFieldBasedOnTemplateKey({
            templateKey: "variant",
            currentFieldKey: "referenceField",
            props,
          });
        },
      },
    },
    {
      ...RichTextField,
      ui: {
        component(props: any) {
          return renderFieldBasedOnTemplateKey({
            templateKey: "variant",
            currentFieldKey: "elements",
            props,
          });
        },
      },
    },
    {
      name: "gridSettings",
      label: "Grid Settings",
      type: "object",
      fields: [
        {
          name: "columns",
          label: "Columns",
          type: "number",
        },
      ],
    },
    // WidthField,
    // HeightField,
  ],
} as Template;

export type GridProps = {
  variant: GridVariant;
  content?: any | ReferenceRelativePath;
};

export default function Grid({
  variant = GridVariant["Rich-Text"],
  content = undefined,
}: GridProps) {
  const [gridItems, setGridItems] = useState<any[] | undefined>(undefined);
  const gridItemContainer = useRef<HTMLElement>(null);
  const [gridItemHeight, setGridItemHeight] = useState<number>(200);

  useEffect(() => {
    setGridItemHeight(gridItemContainer.current?.offsetWidth ?? 200);
  }, [gridItems]);

  useEffect(() => {
    const getPosts = async () =>
      (await client.queries.workConnection()).data.workConnection.edges;

    const getReference = async () =>
      (
        await client.queries.work({
          relativePath: content as ReferenceRelativePath,
        })
      ).data;

    if (variant === GridVariant["Rich-Text"]) {
      setGridItems(content);
    }

    if (variant === GridVariant["Reference"]) {
      getReference()
        .then((reference) =>
          setGridItems(
            reference.work.images
              ? reference.work.images?.map((item) => item)
              : undefined
          )
        )
        .catch((e) => {
          console.error(e);
          setGridItems(undefined);
        });
    }

    if (variant === GridVariant["Work-List"]) {
      if (content && content[0].node) {
        setGridItems(content);
      } else {
        getPosts()
          .then((posts) => {
            setGridItems(
              (posts as any).sort(
                (a, b) =>
                  new Date(b!.node?.startDate!).getTime() -
                  new Date(a!.node?.startDate!).getTime()
              )
            );
          })
          .catch((e) => {
            console.error(e);
            setGridItems(undefined);
          });
      }
    }
  }, [variant, content]);

  return (
    <RadixGrid
      py={"9"}
      columns={{ xs: "1", md: "2" }}
      gap={"7"}
      className="no-scrollbar"
      style={{ maxWidth: "100vw" }}
    >
      {gridItems &&
        gridItems?.map((item: any, i) => (
          <Box
            minHeight={`${gridItemHeight}px`}
            position={"relative"}
            overflowX={"hidden"}
            key={i}
            ref={gridItemContainer as LegacyRef<HTMLDivElement>}
          >
            {variant === GridVariant["Rich-Text"] && renderRichTextItem(item)}

            {variant === GridVariant["Work-List"] &&
              renderPostListItem(item, i)}

            {variant === GridVariant["Reference"] &&
              typeof content === "string" &&
              renderReferenceItem(item, i)}
          </Box>
        ))}
    </RadixGrid>
  );
}

const renderRichTextItem = (item: any) => (
  <TinaMarkdown
    content={item}
    components={{
      img: (props: { url: string; caption?: string; alt?: string }) => (
        <Image
          priority={false}
          src={props.url ?? ""}
          alt={""}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            zIndex: "-1",
            objectFit: "cover",
          }}
        />
      ),
    }}
  />
);

const renderPostListItem = (item: WorkConnectionEdges, i: number) => {
  return (
    <Flex key={i} width={"100%"} height={"100%"}>
      <Link
        style={{ width: "100%" }}
        className="colored"
        href={`/works/${item.node?._sys.filename}`}
      >
        <Box p={"5"}>
          <Text
            style={{ color: "#D920EA", wordBreak: "break-word" }}
            size={{ initial: "6", md: "9" }}
            weight={"bold"}
            wrap={"pretty"}
          >
            {item.node?.name}
          </Text>
        </Box>

        {item.node?.images && (
          <Image
            priority={i === 0}
            src={item.node.images[0] as string}
            alt={""}
            fill
            sizes="100vw"
            style={{
              zIndex: "-1",
              objectFit: "cover",
            }}
          />
        )}
      </Link>
    </Flex>
  );
};

const renderReferenceItem = (item: any, i: number) => (
  <Flex
    as={"div"}
    position="relative"
    style={{ width: "100%", height: "100%" }}
  >
    <Link
      href={item}
      target={"_blank"}
      className="test"
      style={{ width: "100%", height: "100%" }}
    ></Link>
    <Image
      priority={i === 0}
      src={item}
      alt={""}
      fill
      quality={100}
      sizes="100vw"
      style={{
        zIndex: "-1",
        objectFit: "cover",
      }}
    />
  </Flex>
);
