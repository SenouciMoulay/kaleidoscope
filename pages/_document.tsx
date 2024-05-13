import { Head, Html, Main, NextScript } from 'next/document';

export default function RootLayout(props) {
  return (
    <Html>
      <Head />
      <body className="bg-black text-white min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html >
  )
}
