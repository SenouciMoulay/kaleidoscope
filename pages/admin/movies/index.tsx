// list all movies

import { MovieCard } from "@/components/movie/movie_card";
import { Movie } from "@prisma/client";
import { InferGetStaticPropsType } from "next";

// get the 1st page of movies
export async function getStaticProps() {
  const movies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?page=1`);
  const data = await movies.json();
  return {
    props: {
      movies: data.movies,
    },
  }
}

export default function Movies({ movies }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
          {movies.map((movie: Movie) =>
            <MovieCard
              movie={movie} key={movie.id} />
          )}
          <MovieCard />
        </div>
      </div>
    </main>
  );
}
