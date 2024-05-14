import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MovieComponent from "@/components/movie";
import MoviePopable from "@/components/movie/movie_popup";
import { Frame, Movie, PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";
import { Video } from "@/components/ui/video";
import { Search, Volume2, VolumeX } from 'lucide-react';
import { Audio } from "@/components/ui/audio";
import WelcomeComponent from "@/components/welcome/welcome_component";
import SearchModal from "@/components/searchModal/SearchModal";
import { Button } from '@/components/ui/button';

export const dynamic = "force-dynamic";

const skipWelcome = true;

// Récupérer tous les films depuis la base de données (Prisma)
export async function getStaticProps() {
    const prisma = new PrismaClient();
    const movies = await prisma.movie.findMany({
        include: {
            preferredFrame: true,
            colors: true,
            directors: true,
        },
    });

    // Si le nombre de films est inférieur à 10, ajouter des films fictifs
    const movies10 = movies.length < 10 ? [...movies, ...Array(10 - movies.length).fill(0).map((_, i) => ({
        id: i,
        title: "Dummy Movie",
        directors: [
            {
                firstName: "Dummy",
                lastName: "Director"
            }
        ],
        preferredFrame: {
            image: `https://picsum.photos/1600/900?i=${i}`,
        },
        colors: [
            {
                name: "Dummy Color",
                // random hex (no opacity)
                value: `#${Math.floor(Math.random() * 16777215).toString(16)}`
            }
        ]
    }))] : movies;

    return {
        props: {
            movies: movies10
        },
        revalidate: 1
    }
}

export default function Home({ movies }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [showWelcome, setShowWelcome] = useState(!skipWelcome);
    const audio = React.useRef<HTMLAudioElement>(null)
    const video = React.useRef<HTMLVideoElement>(null)
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
    }
    const pauseVideo = () => {
        if (!video.current) return;
        video.current.pause();
    }


    React.useEffect(() => {
        if (!audio.current) return;
        const au = audio.current;


        au.addEventListener("play", () => {
            setIsMusicPlaying(true)
        })
        au.addEventListener("pause", () => {
            setIsMusicPlaying(false)
        })

        return () => {
            au.removeEventListener("play", () => { })
            au.removeEventListener("pause", () => { })
        }
    }, []);

    const handleDiscoverClick = () => {
        setShowWelcome(false);
        playMusic();
        playVideo();
    };

    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const [searchTerms, setSearchTerms] = useState<string | undefined>(undefined);

    return (
        <main className="relative w-full h-full flex flex-col">
            <Audio ref={audio} className="hidden" id="backgroundMusic" autoPlay loop src="/assets/claudio.mp3" type="audio/mp3" />
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showWelcome ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                {showWelcome && <WelcomeComponent onDiscoverClick={handleDiscoverClick} />}
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
                                <Video size={{ width: 470 }} autoPlay src="/Video_kaléidoscope.mp4" type="video/mp4" muted
                                    loop ref={video}
                                />
                                <img style={{ position: "absolute" }} src={"/assets/logo_transparent.svg"} alt={"hgv"}
                                    width={700}
                                    height={350} />
                            </div>
                        </div>
                        <button
                            className="fixed bottom-4 left-4 z-10 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                if (audio.current?.paused) {
                                    playMusic()
                                } else {
                                    pauseMusic()
                                }
                            }}
                        >
                            {isMusicPlaying ? <Volume2 /> : <VolumeX />}
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-2">
                            {movies.map((movie) => {
                                console.log(movie)

                                return <MovieComponent
                                    className="aspect-video"
                                    onClick={() => {
                                        if (movie.title !== "Dummy Movie") setSelectedMovie(movie);
                                    }}
                                    key={movie.id}
                                    movie={movie}
                                    preferredFrame={movie.preferredFrame as Frame}
                                />
                            })}
                        </div>
                        <MoviePopable movie={selectedMovie ?? undefined} close={() => setSelectedMovie(null)} />

                        <Search className="fixed top-4 right-4 z-20 text-white-500 hover:text-gray-700 font-bold cursor-pointer"
                            size={40}
                            onClick={() => setSearchModalOpen(true)} />


                        <SearchModal
                            isOpen={isSearchModalOpen}
                            onClose={() => setSearchModalOpen(false)}
                            selectedColor={selectedColor}
                            onSelectColor={setSelectedColor}
                            searchTerms={searchTerms}
                            onSearch={(value) => setSearchTerms(value)}

                        />
                    </>
                )}
            </motion.div>
        </main>
    );
}
