import Table from "@/components/table";
import TablePlaceholder from "@/components/table-placeholder";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">Kaleidoscope</h1>
    </main>
  );
}
