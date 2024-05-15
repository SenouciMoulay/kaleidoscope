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
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   fetch(`/api/movies/${movie.id}/frames`)
  //     .then((res) => res.json())
  //     .then(($frames) => setFrames($frames));
  // }, [movie]);

  // useEffect(() => {
  //   function handleKeyDown(event: KeyboardEvent) {
  //     switch (event.key) {
  //       case "ArrowLeft":
  //         goToPrevious();
  //         break;
  //       case "ArrowRight":
  //         goToNext();
  //         break;
  //       case "Escape":
  //         close?.();
  //         break;
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [index, frames, close]);

  // function goToPrevious() {
  //   if (index !== 0) {
  //     setIndex(index - 1);
  //     setLoading(true);
  //   }
  // }

  // function goToNext() {
  //   if (index < frames.length - 1) {
  //     setIndex(index + 1);
  //     setLoading(true);
  //   }
  // }

  return (
    <div
      className={`flex justify-center items-center bg-black/90 fixed top-0 left-0 w-full h-full z-50 ${
        className ?? ""
      }`}
    >
      <X
        size={30}
        className="absolute text-yellow-500 top-3.5 right-3.5 cursor-pointer z-50"
        onClick={close}
      />
      <Carousel className="relative flex justify-center h-[85%] mx-auto w-4/5">
        <CarouselContent className="h-full w-full">
          {frames.map((frame) => (
            <CarouselItem>
              <div className="h-full w-full">
                <Image
                  src={frame.image}
                  alt={movie.title}
                  width={3840}
                  height={2160}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
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
