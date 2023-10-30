import MovieComponent from "@/components/movie";
import { PrismaClient, Frame } from '@prisma/client';

export const dynamic = "force-dynamic";

type Movie = {
  id: string;
  title: string;
  preferredFrameId: string;
  directorId: string;
  preferredFrame: Frame;
}

// get all movies from the database (prisma)
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const movies = await prisma.movie.findMany();
  // return { props: { movies } };


  // fake data
  return {
    props: {
      movies: [
        {
          id: "a123456-1234-1234-1234-1234567890ab",
          title: "Test Movie",
          preferredFrameId: "a123456-1234-1234-1234-1234567890ab",
          directorId: "a123456-1234-1234-1234-12345678232b",
          preferredFrame: {
            id: "a123456-1234-1234-1234-1234567890ab",
            url: "https://www.google.com"
          },
        }
      ]
    }
  }

}

interface HomeProps {
  movies: Movie[]
}

export default function Home({ movies }: HomeProps) {

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
          {movies.map((movie) =>
            <MovieComponent
              preferredFrame={movie.preferredFrame}
              movie={movie} key={movie.id} />
          )}
        </div>
      </div>
    </main>
  );
}
