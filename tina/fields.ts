import type { Template } from "tinacms";
import type { ToolbarOverrideType } from "tinacms/dist/toolkit/fields/plugins/mdx-field-plugin/plate/toolbar/toolbar-overrides";

/** Add this tina field to make an object field localized */
const LANGUAGES = [
  {
    type: "string",
    name: "de",
    label: "German",
    component: "textarea",
  },
  {
    type: "string",
    name: "en",
    label: "English",
    component: "textarea",
  },
];

const firstLetterUppercased = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;

export type IntlFieldType = Record<"de" | "en", string>;
export const IntlField = (name: string) => {
  return {
    name,
    label: firstLetterUppercased(name),
    type: "object",
    fields: [...LANGUAGES],
  };
};

export const StringField = (name: string) => {
  return {
    name,
    label: firstLetterUppercased(name),
    type: "string",
  };
};

const WidthFieldValidation = {
  ui: {
    validate: (value, data) => {
      const pxOrVwString = /^\d+(px|vw)$/;

      if (!pxOrVwString.test(value)) {
        return "Format invalid!";
      }
    },
  },
};

const Sizes: Array<any> = [
  {
    name: "initial",
    label: "initial",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
  {
    name: "xs",
    label: "xs",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
  {
    name: "sm",
    label: "sm",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
  {
    name: "md",
    label: "md",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
  {
    name: "lg",
    label: "lg",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
  {
    name: "xl",
    label: "xl",
    type: "string",
    required: true,
    ...WidthFieldValidation,
  },
];

export const WidthField: Template = {
  name: "width",
  label: "Width",
  //@ts-ignore
  type: "object",
  fields: Sizes,
} as const;

export const HeightField: Template = {
  name: "height",
  label: "Height",
  //@ts-ignore
  type: "object",
  fields: Sizes,
} as const;

export const SEOField = {
  name: "seo",
  label: "SEO",
  type: "string",
  ui: {
    component: "textarea",
    description: "Descriptive information for better web search listing",
  },
};

// TODO find one place to rest
export const customToolbar: ToolbarOverrideType[] = [
  "embed",
  "heading",
  "image",
  "link",
  "bold",
  "italic",
];

/** Special fields */

export type SpecialFieldKey = "referenceField" | "elements";

export const RichTextField: Template = {
  name: "elements",
  label: "Elements",
  //@ts-ignore
  type: "object",
  list: true,
  fields: [
    {
      name: "element",
      label: "Element",
      type: "rich-text",
      isBody: true,
    },
  ],
} as const;

export const ReferenceField = (collections: string[]) => ({
  type: "reference",
  name: "referenceField",
  label: "Reference Field",
  collections,
});