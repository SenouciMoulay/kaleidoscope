import '@/styles/globals.css'

import React from "react"

export default function App({ Component, pageProps }) {
  return (
      <div className="bg-black">
          <div className="flex flex-col items-center justify-center h-full w-full py-4 overflow-hidden">
              <Component {...pageProps} />
          </div>
      </div>
  )
}
