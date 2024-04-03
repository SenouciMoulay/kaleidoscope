import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-zinc-800">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold ">
            Kaleidoscope
          </h1>
        </main>
      </div>
      <div className="flex flex-col items-center justify-center h-full w-full py-2 overflow-hidden">
        <Component {...pageProps} />
      </div>
    </div>
  )
}
