import type { AppProps } from "next/app";
import "@/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import React from "react"

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <header>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div className="bg-black">
        <div className="flex flex-col items-center justify-center h-full w-full py-2 overflow-hidden m-0">
          <Component {...pageProps} />
        </div>
      </div>
    </ClerkProvider>
  );
}
