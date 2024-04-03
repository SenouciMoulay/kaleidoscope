import { Frame, Movie } from "@prisma/client";
import Image from "next/image";
interface MovieProps {
  movie: Movie,
  preferredFrame: Frame
  className?: string
  onClick: () => void

}

export default function MovieComponent({ movie, preferredFrame, className, onClick

}: MovieProps) {



  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div className={`relative group block cursor-pointer ${className} rounded-sm m-1 `} onClick={onClick}
    >
      <Image
        src={preferredFrame.image}
        alt={movie.title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 object-cover w-full
        h-full rounded-md"
      />
      <div className="relative group-hover:opacity-100 opacity-0 align-bottom bg-gray-900 bg-opacity-10 w-full h-full rounded-md">
        <p className="text-white text-center text-sm">{movie.title}</p>
      </div>
    </div>
  );
}
