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

  const [frames, setFrames] = useState<Frame[]>([]);

  const [index, setIndex] = useState(0);

  const [aspectRatio, setAspectRatio] = useState(1)

  // get the frame at index (/api/movies/:id/frames/:index)
  useEffect(() => {
        function getAspectRatio(){
          const {innerWidth, innerHeight} = window
          setAspectRatio(innerWidth/innerHeight)
        }
        fetch(`/api/movies/${movie.id}/frames`)
          .then((res) => res.json())
          .then(($frames) => setFrames($frames))
  }, [movie]);

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
      if(index<frames.length - 1)
      setIndex(index + 1);
    }

  }

  return (
    <div className={`flex justify-center items-center bg-black/80 fixed top-0 left-0 w-full h-full z-50 ${className ?? ''}`}>
      <div className=" relative w-[1000px] h-[600px]"
        onClick={handleClick}
      >
        {frames[index] && <Image
          src={frames[index].image}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full
          h-full rounded-lg"
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
