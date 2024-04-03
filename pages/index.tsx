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

  // if movies.length < 10, add some dummy movies
  const movies10 = movies.length < 10 ? [...movies, ...Array(10 - movies.length).fill(0).map((_, i) => ({
    id: i,
    title: "Dummy Movie",
    preferredFrame: {
      image: `https://picsum.photos/1600/900?i=${i}`,
    }
  }))] : movies;

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
    <main className=" w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 m-1 ">
        {movies.map((movie) => (
          <MovieComponent
            className="aspect-video"
            onClick={() => {
              if (movie.title !== "Dummy Movie")
                setSelectedMovie(movie);
            }}
            key={movie.id}
            movie={movie}
            preferredFrame={movie.preferredFrame as Frame} />
        ))}
      </div>
      <MoviePopable movie={selectedMovie ?? undefined} close={() => setSelectedMovie(null)} />

    </main >
  );
}
