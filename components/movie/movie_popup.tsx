import { Frame, Movie, Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Autoscroll from "embla-carousel-react";
import { MoveLeft, MoveRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { TMovieIndex } from "@/pages";

interface MoviePopupProps {
  movie: TMovieIndex;
  className?: string;
  close?: () => void;
}

function MoviePopup({ movie, className, close }: MoviePopupProps) {
  const [frames, setFrames] = useState<Frame[]>(movie.frames);

  return (
    <div
      className={`flex justify-center items-center bg-black/90 fixed top-0 left-0 w-full h-full z-50 ${className ?? ""
        }`}
      onClick={close}
      onKeyDown={(e) => e.key === "Escape" && close?.()}
    >
      <X
        size={30}
        className="absolute text-yellow-500 top-3.5 right-3.5 cursor-pointer z-50"
        onClick={close}
      />
      <Carousel className="relative flex justify-center h-[85%] mx-auto w-4/5" onClick={(e) => e.stopPropagation()}>
        <CarouselContent className="h-full w-full">
          {frames.map((frame) => (
            <CarouselItem key={frame.id} className="h-full w-full">
              <Image
                src={frame.image}
                alt={movie.title}
                width={3840}
                height={2160}
                className="w-full h-full rounded-lg object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function MoviePopable({ movie, className, close }: Partial<MoviePopupProps>) {
  return (
    <div>
      {movie && (
        <MoviePopup movie={movie} className={className} close={close} />
      )}
    </div>
  );
}

export default MoviePopable;
