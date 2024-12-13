import * as Form from "@radix-ui/react-form";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Flex, TextArea, TextField } from "@radix-ui/themes";

const validationHint = (
  validationType: Form.FormMessageProps["match"],
  name?: string
) => `Bitte prüfen Sie das Format Ihrer ${name}`;

export const FormField = ({
  inputType,
  name,
  validations,
}: {
  inputType?: "email" | "text";
  name: string;
  validations: Form.FormMessageProps["match"][];
}) => (
  <Form.Field name={name}>
    <Flex
      align={"center"}
      direction={"row"}
      justify={"between"}
      gap={"2"}
      my={"2"}
    >
      <Form.Label>{name.charAt(0).toUpperCase() + name.slice(1)}</Form.Label>

      {validations.map((validationType: Form.FormMessageProps["match"]) => (
        <Form.Message key={`${validationType}`} match={validationType}>
          <Callout.Root size={"1"} variant={"outline"}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{validationHint(validationType, name)}</Callout.Text>
          </Callout.Root>
        </Form.Message>
      ))}
    </Flex>

    <Form.Control asChild>
      {inputType === "email" ? (
        <TextField.Root
          placeholder="Geben Sie Ihre Email ein"
          type="email"
          required
        ></TextField.Root>
      ) : inputType === "text" ? (
        <TextArea placeholder="Geben Sie Ihre Anfrage ein" required />
      ) : (
        <TextField.Root placeholder="Geben Sie Ihren Namen ein" required />
      )}
    </Form.Control>
  </Form.Field>
);
