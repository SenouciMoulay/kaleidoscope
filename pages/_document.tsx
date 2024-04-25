import { Head, Html, Main, NextScript } from "next/document";

export default function RootLayout() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
