import { Box, Flex, Heading } from "@radix-ui/themes";
import { useEffect, useState, type LegacyRef } from "react";
import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";
import "../../styles/main.css";
import { defaultComponents } from "../../tina/components";
import { RichTextField } from "../../tina/fields";
import useSlideshow from "./hook";
import "./styles.css";

export const SlideshowTemplate = {
  name: "Slideshow",
  label: "Slideshow",
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "string",
      options: ["Upper third", "Middle", "Lower third", "Invisible"],
      ui: {
        defaultItem: {
          heading: "Upper third",
        },
      },
    },
    RichTextField,
  ],
};

export type SlideshowProps = {
  slides: TinaMarkdownContent[];
  heading?: "Upper third" | "Middle" | "Lower third" | "Invisible";
};

export default function Slideshow({
  slides = [],
  heading = "Upper third",
}: SlideshowProps) {
  const { slideshow, slideshowContainer } = useSlideshow({
    timeout: 4000,
  });

  const [boxHeight, setBoxHeight] = useState<string>("100vh");

  useEffect(() => {
    if (!!window) {
      setBoxHeight(window.innerHeight + "px");
    }
  }, []);

  return (
    <Box
      position={"relative"}
      width={"100%"}
      height={boxHeight}
      ref={slideshowContainer as LegacyRef<HTMLDivElement>}
    >
      <Flex
        className="no-scrollbar"
        width={"100%"}
        height={"100%"}
        direction="row"
        overflowX="auto"
        overflowY="hidden"
        wrap="nowrap"
        ref={slideshow as LegacyRef<HTMLDivElement>}
        style={{ scrollSnapType: "x mandatory" }}
      >
        <Flex
          height={{ initial: "66px", md: "114px" }}
          style={{
            position: "absolute",
            top:
              heading === "Upper third"
                ? "35%"
                : heading === "Middle"
                ? "50%"
                : "75%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: heading !== "Invisible" ? 0 : 1,
            color: "#cd00e4",
          }}
          direction={"column"}
          justify={"between"}
        >
          <Heading style={{ textAlign: "center" }} className="hero-text">
            VALERIE
          </Heading>
          <Heading style={{ textAlign: "center" }} className="hero-text">
            VOIGT
          </Heading>
        </Flex>
        {slides.map((slide, i) => (
          <Flex
            className="slide"
            align={"center"}
            justify={"center"}
            position={"relative"}
            key={i}
            minWidth={"100%"}
            maxWidth={"100%"}
            style={{ scrollSnapAlign: "start" }}
          >
            <TinaMarkdown
              content={slide}
              components={{ ...defaultComponents }}
            />
          </Flex>
        ))}
      </Flex>
      {/* <Flex
        align={"center"}
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          bottom: 0,
        }}
      >
        <IconButton
          ml={"2"}
          style={{ pointerEvents: "auto" }}
          onClick={previousSlide}
          radius="full"
          variant="surface"
        >
          <AccessibleIcon label={"Slideshow previous item control icon"}>
            <CaretLeftIcon width={20} height={20}></CaretLeftIcon>
          </AccessibleIcon>
        </IconButton>
      </Flex>
      <Flex
        align={"center"}
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <IconButton
          mr={"2"}
          style={{ pointerEvents: "auto" }}
          onClick={nextSlide}
          radius="full"
          variant="surface"
        >
          <AccessibleIcon label={"Slideshow next item control icon"}>
            <CaretRightIcon width={20} height={20}></CaretRightIcon>
          </AccessibleIcon>
        </IconButton>
      </Flex> */}
    </Box>
  );
}
