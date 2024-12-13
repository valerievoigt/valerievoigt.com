"use client";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Text } from "@radix-ui/themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEditState } from "tinacms/dist/react";
import { pageInEditMode } from "./logic";
import "./styles.css";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { edit } = useEditState();

  return (
    <RadixNavigationMenu.Root className="RadixNavigationMenuRoot">
      <RadixNavigationMenu.List className="RadixNavigationMenuList">
        <RadixNavigationMenu.Item className="with-bg">
          <RadixNavigationMenu.Link
            href="/"
            title="Zur Startseite"
            style={{
              position: "relative",
            }}
          >
            <Image
              src={"/uploads/logo.png"}
              alt={""}
              height={"20"}
              width={"24"}
              style={{
                objectFit: "contain",
                marginTop: "11px",
              }}
              layout={"fixed"}
            ></Image>
          </RadixNavigationMenu.Link>
        </RadixNavigationMenu.Item>

        <RadixNavigationMenu.Item>
          <RadixNavigationMenu.Link
            className={`RadixNavigationMenuLink ${
              pathname === "/works" && "active-link"
            }`}
            href={edit ? pageInEditMode("works") : "/works"}
          >
            <Text size={"4"}>Work</Text>
          </RadixNavigationMenu.Link>
        </RadixNavigationMenu.Item>

        <RadixNavigationMenu.Item>
          <RadixNavigationMenu.Link
            className={`RadixNavigationMenuLink ${
              pathname === "/about" && "active-link"
            }`}
            href={edit ? pageInEditMode("about") : "/about"}
          >
            <Text size={"4"}>About</Text>
          </RadixNavigationMenu.Link>
        </RadixNavigationMenu.Item>

        <RadixNavigationMenu.Item>
          <RadixNavigationMenu.Link
            className={`RadixNavigationMenuLink ${
              pathname === "/contact" && "active-link"
            }`}
            href={edit ? pageInEditMode("contact") : "/contact"}
          >
            <Text size={"4"}>Contact</Text>
          </RadixNavigationMenu.Link>
        </RadixNavigationMenu.Item>
      </RadixNavigationMenu.List>

      <div className="ViewportPosition">
        <RadixNavigationMenu.Viewport className="RadixNavigationMenuViewport" />
      </div>
    </RadixNavigationMenu.Root>
  );
}
