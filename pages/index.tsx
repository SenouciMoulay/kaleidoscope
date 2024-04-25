import MovieComponent from "@/components/movie";
import MoviePopable from "@/components/movie/movie_popup";
import { Frame, Movie, PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export const dynamic = "force-dynamic";

// get all movies from the database (prisma)
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const movies = await prisma.movie.findMany({
    include: {
      preferredFrame: true,
    },
  });

  return {
    props: {
      movies,
    },
    revalidate: 1,
  };
}

export default function Home({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <main className="w-full h-full bg-neutral-950 text-white">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold ">Kaleidoscope</h1>
        </main>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 m-1 ">
        {movies.map((movie) => (
          <MovieComponent
            className="aspect-video"
            onClick={() => {
              if (movie.title !== "Dummy Movie") setSelectedMovie(movie);
            }}
            key={movie.id}
            movie={movie}
            preferredFrame={movie.preferredFrame as Frame}
          />
        ))}
      </div>
      <MoviePopable
        movie={selectedMovie ?? undefined}
        close={() => setSelectedMovie(null)}
      />
    </main>
  );
}
