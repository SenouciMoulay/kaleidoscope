import { Frame, Movie } from "@prisma/client";
import Image from "next/image";
interface MovieProps {
  movie: Movie,
  preferredFrame: Frame | null
}

export default function MovieComponent({ movie, preferredFrame }: MovieProps) {

  const onClick = () => { }

  return (
    <div
      className="w-full relative group h-96"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
        <p
          className="group-hover:opacity-100 opacity-0 transform group-hover:translate-y-0 translate-y-1/2 transition-transform duration-600 ease-in-out"
          style={{
            transitionProperty: "opacity transform",
            transitionDuration: "300ms",
          }}
        >
          {movie.title}
        </p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
        <p
          className="group-hover:opacity-100 opacity-0 transform group-hover:translate-y-0 translate-y-1/2 transition-transform duration-600 ease-in-out"
          style={{
            transitionProperty: "opacity transform",
            transitionDuration: "300ms",
          }}
        >
          {movie.year}
        </p>
        {preferredFrame && (
          <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
            <Image src={preferredFrame.image} layout="fill" objectFit="cover" alt={movie.title} />
          </div>
        )}
      </div>
    </div>
  );
}
