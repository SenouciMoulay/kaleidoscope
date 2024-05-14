import { Frame, Movie } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface MoviePopupProps {
  movie: Movie;
  className?: string;
  close?: () => void;
}

function MoviePopup({ movie, className, close }: MoviePopupProps) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/movies/${movie.id}/frames`)
        .then((res) => res.json())
        .then(($frames) => setFrames($frames));
  }, [movie]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          close?.();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, frames, close]);

  function goToPrevious() {
    if (index !== 0) {
      setIndex(index - 1);
    }
  }

  function goToNext() {
    if (index < frames.length - 1) {
      setIndex(index + 1);
    }
  }

  return (
      <div
          className={`flex justify-center items-center bg-black/80 fixed top-0 left-0 w-full h-full z-50 ${className ?? ''}`}
      >
        <X
            className="absolute text-yellow-500 top-1 right-1 cursor-pointer"
            onClick={close}
        />
        <div className="relative w-[1000px] h-[600px]">
          {frames[index] && (
              <Image
                  src={frames[index].image}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full rounded-lg select-none pointer-events-none"
              />
          )}
          <ArrowLeft
              size={35}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-yellow-500 opacity-60 cursor-pointer"
              onClick={goToPrevious}
          />
          <ArrowRight
              size={35}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-yellow-500 opacity-60 cursor-pointer"
              onClick={goToNext}
          />
        </div>
      </div>
  );
}

function MoviePopable({ movie, className, close }: Partial<MoviePopupProps>) {
  return (
      <div>
        {movie && <MoviePopup movie={movie} className={className} close={close} />}
      </div>
  );
}

export default MoviePopable;
