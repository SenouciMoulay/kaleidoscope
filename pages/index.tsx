import MovieComponent from "@/components/movie";
import MoviePopable from "@/components/movie/movie_popup";
import { Frame, Movie, PrismaClient } from '@prisma/client';
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
  // duplicate the movies 10 times to get a lot of
  const movies10 = [];
  for (let i = 0; i < 32; i++) {
    movies10.push(...movies);
  }
  return {
    props: {
      movies: movies10
    },
    revalidate: 1
  }
}

export default function Home({ movies }: InferGetStaticPropsType<typeof getStaticProps>) {

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);



  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* /min 1column, max 2column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
        {movies.map((movie) => (
          <MovieComponent
            className="aspect-video"
            onClick={() => setSelectedMovie(movie)}
            key={movie.id} movie={movie} preferredFrame={movie.preferredFrame as Frame} />
        ))}
      </div>
      <MoviePopable movie={selectedMovie ?? undefined} close={() => setSelectedMovie(null)} />

    </main >
  );
}
