import { Frame, Movie } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface MoviePopupProps {
  movie: Movie,
  className?: string
  close?: () => void
}

function MoviePopup(
  { movie, className, close }: MoviePopupProps
) {

  const [frame, setFrame] = useState<Frame | null>();

  const [index, setIndex] = useState(0);

  // get the frame at index (/api/movies/:id/frames/:index)
  useEffect(() => {
    try {
      if (movie) {
        fetch(`/api/movies/${movie.id}/frames/${index}`)
          .then((res) => res.json())
          .then((frame) => setFrame(frame))
      }
    } catch (err) {
      setIndex(0);
    }
  }, [movie, index]);

  function handleClick(Event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // if on left : index - 1
    // if on right : index + 1
    const { clientX } = Event;
    const { innerWidth } = window;
    const middle = innerWidth / 2;
    // if on center : close
    if (clientX > middle - 150 && clientX < middle + 150) {
      // close
      close?.();
      return;
    }
    if (clientX < middle) {
      if (index !== 0) {
        setIndex(index - 1);
      }
    }
    else {
      setIndex(index + 1);
    }

  }

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 z-50 ${className ?? ''}`}>
      <div className="relative w-full h-full"
        onClick={handleClick}
      >
        {frame && <Image
          src={frame.image}
          alt={movie.title}
          layout="fill"
          objectFit="contain"
          className="absolute inset-0 object-contain w-full
          h-fullrounded-md"
        />}
      </div>
    </div>
  )

}

function MoviePopable({
  movie,
  className,
  close
}: Partial<MoviePopupProps>) {


  return (
    <div>
      {movie && <MoviePopup movie={movie} className={className} close={close} />}
    </div>
  )


}

export default MoviePopable;
