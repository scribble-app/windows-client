import StyledComponentsRegistry from "@/lib/registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalStyles from "./styles/globalStyles";
import ThemeWrapper from "./styles/themeWrapper";
import AppWrapper from "./appWrapper";
import Title from "./components/title/title";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scribble",
  description: "Markdown editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ThemeWrapper>
            <Suspense>
              <Title />
              <AppWrapper>{children}</AppWrapper>
            </Suspense>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
