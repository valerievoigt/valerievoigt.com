import Image from "next/image";
import { type Components } from "tinacms/dist/rich-text";
import Accordion, {
  AccordionTemplate,
  type AccordionProps,
} from "../components/Accordion/Accordion";
import type { FormProps } from "../components/Form/Form";
import Form, { FormTemplate } from "../components/Form/Form";
import type { GridProps } from "../components/Grid/Grid";
import Grid, { GridTemplate, GridVariant } from "../components/Grid/Grid";
import Slideshow, {
  SlideshowTemplate,
  type SlideshowProps,
} from "../components/Slideshow/Slideshow";
import { getReferenceRelativePathFromReferencePath } from "./utils";

export const allTemplates = [
  AccordionTemplate,
  FormTemplate,
  SlideshowTemplate,
  GridTemplate,
];

export type ReferencePath = `content/${string}/${string}.json`;
export type ReferenceRelativePath = `${string}.json`;

export const defaultComponents: Components<{}> = {
  p(props) {
    return <p {...props} />;
  },
  img: (props: { url: string; caption?: string; alt?: string }) => (
    <Image
      priority={false}
      src={props.url ?? ""}
      alt={""}
      fill
      quality={90}
      style={{
        zIndex: "-1",
        objectFit: "cover",
      }}
    />
  ),
};

export const customComponents = {
  Form: ({ title }: FormProps) => <Form title={title} />,
  Slideshow: (props: SlideshowProps & { elements: any[] }) => {
    const slides = props.elements?.map((e) => e.element) ?? [];
    return <Slideshow slides={slides} heading={props.heading} />;
  },
  Grid: (
    props: GridProps & {
      elements?: any;
      referenceField?: ReferencePath;
    }
  ) => {
    const { referenceField, variant } = props;

    let content: any = undefined;

    if (variant === GridVariant["Rich-Text"]) {
      content = props.elements?.map((e) => e.element) ?? [];
    }

    if (variant === GridVariant["Reference"]) {
      content = getReferenceRelativePathFromReferencePath(referenceField);
    }

    return <Grid content={content} variant={variant} />;
  },
  Accordion: (props: AccordionProps & { elements: any[] }) => {
    const { title, content } = props;

    return <Accordion title={title} content={content} />;
  },
};
