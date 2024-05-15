import React, { useState } from "react";
import { motion } from "framer-motion";
import MovieComponent from "@/components/movie";
import MoviePopable from "@/components/movie/movie_popup";
import { Frame, Movie, Prisma, PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import { Video } from "@/components/ui/video";
import { Search, Volume2, VolumeX } from "lucide-react";
import { Audio } from "@/components/ui/audio";
import WelcomeComponent from "@/components/welcome/welcome_component";
import SearchModal from "@/components/searchModal/SearchModal";
import { Button } from "@/components/ui/button";
import { MovieWithRelations } from "./admin/movies";
import { f } from "@vercel/blob/dist/put-96a1f07e";

export const dynamic = "force-dynamic";

const skipWelcome = false;

export type TMovieIndex = Prisma.MovieGetPayload<{
  include: {
    preferredFrame: true;
    colors: true;
    directors: true;
    frames: true;
  };
}>;

// Récupérer tous les films depuis la base de données (Prisma)
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const movies: TMovieIndex[] = await prisma.movie.findMany({
    include: {
      preferredFrame: true,
      colors: true,
      directors: true,
      frames: true,
    },
  });

  // Si le nombre de films est inférieur à 10, ajouter des films fictifs
  const movies10 =
    movies.length < 10
      ? [
          ...movies,
          ...Array(10 - movies.length)
            .fill(0)
            .map((_, i) => ({
              id: i,
              title: "Dummy Movie",
              directors: [
                {
                  firstName: "Dummy",
                  lastName: "Director",
                },
              ],
              preferredFrame: {
                image: `https://picsum.photos/1600/900?i=${i}`,
              },
              colors: [
                {
                  name: "Dummy Color",
                  // random hex (no opacity)
                  value: `#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`,
                },
              ],
            })),
        ]
      : movies;

  return {
    props: {
      movies: movies10,
    },
    revalidate: 1,
  };
}

export default function Home({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedMovie, setSelectedMovie] = useState<TMovieIndex | undefined>(
    undefined
  );
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const audio = React.useRef<HTMLAudioElement>(null);
  const video = React.useRef<HTMLVideoElement>(null);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const playMusic = () => {
    if (!audio.current) return;
    audio.current.play();
  };
  const pauseMusic = () => {
    if (!audio.current) return;
    audio.current.pause();
  };
  const playVideo = () => {
    if (!video.current) return;
    video.current.play();
  };
  const pauseVideo = () => {
    if (!video.current) return;
    video.current.pause();
  };

  React.useEffect(() => {
    if (!audio.current) return;
    const au = audio.current;

    au.addEventListener("play", () => {
      setIsMusicPlaying(true);
    });
    au.addEventListener("pause", () => {
      setIsMusicPlaying(false);
    });

    return () => {
      au.removeEventListener("play", () => {});
      au.removeEventListener("pause", () => {});
    };
  }, []);

  const handleDiscoverClick = () => {
    setShowWelcome(false);
    playMusic();
    playVideo();
  };
  const [filteredMovies, setFilteredMovies] = useState(movies);

  function search({
    text: searchTerms,
    color: selectedColor,
  }: {
    text: string | undefined;
    color: string | undefined;
  }) {
    function titleSearch(movie: (typeof movies)[0]) {
      if (!searchTerms?.length) return true;
      return movie.title.toLowerCase().includes(searchTerms.toLowerCase());
    }

    function directorSearch(movie: (typeof movies)[0]) {
      if (!searchTerms?.length) return true;
      return movie.directors
        .map((director) => `${director.firstName} ${director.lastName}`)
        .join(" ")
        .toLowerCase()
        .includes(searchTerms.toLowerCase());
    }

    function colorSearch(movie: (typeof movies)[0]) {
      if (!selectedColor) return true;
      return movie.colors.map((color) => color.value).includes(selectedColor);
    }

    const filtered = movies.filter(
      (movie) =>
        (titleSearch(movie) || directorSearch(movie)) && colorSearch(movie)
    );
    setFilteredMovies(filtered);
  }

  return (
    <main className="relative w-full h-full flex flex-col">
      <Audio
        ref={audio}
        className="hidden"
        id="backgroundMusic"
        autoPlay
        loop
        src="/assets/claudio.mp3"
        type="audio/mp3"
      />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showWelcome ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {showWelcome && (
          <WelcomeComponent onDiscoverClick={handleDiscoverClick} />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showWelcome ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {!showWelcome && (
          <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <div className="w-[600px] h-[250px] flex items-center justify-center relative">
                <Video
                  size={{ width: 470 }}
                  autoPlay
                  src="/Video_kaléidoscope.mp4"
                  type="video/mp4"
                  muted
                  loop
                  ref={video}
                />
                <img
                  style={{ position: "absolute" }}
                  src={"/assets/logo_transparent.svg"}
                  alt={"hgv"}
                  width={700}
                  height={350}
                />
              </div>
            </div>
            <button
              className="fixed bottom-4 left-4 z-10 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                if (audio.current?.paused) {
                  playMusic();
                } else {
                  pauseMusic();
                }
              }}
            >
              {isMusicPlaying ? (
                <Volume2 className={"text-yellow-500"} />
              ) : (
                <VolumeX className={"text-yellow-500"} />
              )}
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-2">
              {filteredMovies.length === 0 && (
                <div
                  className="text-white h-screen w-screen
                                 flex items-center justify-center"
                >
                  <div className="text-center">
                    <p className="text-4xl font-bold">Aucun film trouvé</p>
                    <p className="text-xl">
                      Essayez de rechercher un autre film
                    </p>
                  </div>
                </div>
              )}
              {filteredMovies.map((movie) => {
                return (
                  <MovieComponent
                    className="aspect-video"
                    onClick={() => {
                      if (movie.title !== "Dummy Movie")
                        setSelectedMovie(movie as TMovieIndex);
                    }}
                    key={movie.id}
                    movie={movie}
                    preferredFrame={movie.preferredFrame as Frame}
                  />
                );
              })}
            </div>
            <MoviePopable
              movie={selectedMovie ?? undefined}
              close={() => setSelectedMovie(undefined)}
            />

            <Search
              className="fixed top-4 right-4 z-20 text-yellow-500 font-bold cursor-pointer"
              onClick={() => setSearchModalOpen(true)}
            />

            <SearchModal
              isOpen={isSearchModalOpen}
              onClose={(args) => {
                if (args) {
                  search(args);
                }
                setSearchModalOpen(false);
              }}
            />
          </>
        )}
      </motion.div>
    </main>
  );
}
