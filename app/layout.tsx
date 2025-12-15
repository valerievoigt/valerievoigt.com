import { Container, Flex, Theme, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import React from "react";
import "../styles/main.css";
import Link from "next/link";
import { InstagramLogoIcon } from "@radix-ui/react-icons";

const kode_mono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kode_mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Valerie Voigt",
    default: "Valerie Voigt",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kode_mono.variable}>
      <body style={{ margin: 0, backgroundColor: "#FDD3D0" }}>
        <Theme accentColor={"purple"} appearance={"light"}>
          <main>
            {children}
            <Container pb={"4"}>
              <Flex justify={"center"} p={"4"} direction="row">
                <Link
                  href="https://www.instagram.com/v.valerievoigt/"
                  title="Instagram link"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Flex
                    align={"center"}
                    gap={"2"}
                    style={{
                      color: "var(--accent-12)",
                      border: "2px solid var(--accent-9)",
                      borderRadius: "20px",
                      padding: "8px",
                    }}
                  >
                    <Text>Instagram</Text>
                    <InstagramLogoIcon
                      style={{ color: "var(--accent-12)" }}
                      width={"24px"}
                      height={"24px"}
                    />
                  </Flex>
                </Link>
              </Flex>
            </Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
