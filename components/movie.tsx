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


  // card image (preferredFrame or first frame, full width, full height), on hover display title

  return (
    <div className={`relative group block cursor-pointer ${className}`} onClick={onClick}
    >
      <Image
        src={preferredFrame.image}
        alt={movie.title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 object-cover w-full
        h-fullrounded-md"
      />
      <div className="relative group-hover:opacity-100 opacity-0 align-bottom bg-gray-900 bg-opacity-10 w-full h-full rounded-md">
        <p className="text-white text-center text-sm">{movie.title}</p>
      </div>
    </div>
  );
}
