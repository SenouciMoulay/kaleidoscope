import MovieComponent from "@/components/movie";
import { PrismaClient, Frame } from '@prisma/client';
import { InferGetStaticPropsType } from "next";

export const dynamic = "force-dynamic";

// get all movies from the database (prisma)
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const movies = await prisma.movie.findMany({
    include: {
      preferredFrame: true
    }
  }
  );
  return { props: { movies } };

}

export default function Home({ movies }: InferGetStaticPropsType<typeof getStaticProps>) {

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
