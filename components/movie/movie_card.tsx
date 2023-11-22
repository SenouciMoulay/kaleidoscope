// card to display a movie in the movie list
import { Movie } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  /**movie object*/
  movie?: Movie;
  poster?: string;

}

export function MovieCard({ movie, poster }: MovieCardProps) {




  return (
    <Link href={`/admin/movies/${movie?.id ?? "new"}`}>
      <div className="flex flex-col items-center justify-center w-40 h-64 m-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
      >

        {poster && (
          <Image src={poster} alt={movie?.title ?? "movie poster"} width={160} height={240} />
        )}

        <div className="flex flex-col items-center justify-center w-full h-16">
          <h3 className="text-lg font-medium">{movie?.title ?? "New"}</h3>
          <p className="text-sm text-gray-500">{movie?.year}</p>
        </div>
      </div>
    </Link>
  );

}
