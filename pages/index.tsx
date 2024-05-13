import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MovieComponent from "@/components/movie";
import MoviePopable from "@/components/movie/movie_popup";
import { Frame, Movie, PrismaClient } from '@prisma/client';
import { InferGetStaticPropsType } from "next";
import { Video } from "@/components/ui/video";
import { Volume2, VolumeX } from 'lucide-react';
import {Audio} from "@/components/ui/audio";
import {ColorFilter} from "@/components/colorFilter/colorFilter";
import WelcomeComponent from "@/components/welcome/welcome_component";

export const dynamic = "force-dynamic";

// Récupérer tous les films depuis la base de données (Prisma)
export async function getStaticProps() {
    const prisma = new PrismaClient();
    const movies = await prisma.movie.findMany({
        include: {
            preferredFrame: true,
            colors : true
        },
    });

    // Si le nombre de films est inférieur à 10, ajouter des films fictifs
    const movies10 = movies.length < 10 ? [...movies, ...Array(10 - movies.length).fill(0).map((_, i) => ({
        id: i,
        title: "Dummy Movie",
        preferredFrame: {
            image: `https://picsum.photos/1600/900?i=${i}`,
        }
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
    const [showWelcome, setShowWelcome] = useState(true);
    const audio = React.useRef<HTMLAudioElement>(null)

    const playMusic = () => {
        if(!audio.current) return;
        audio.current.play();
    };

    const pauseMusic= () => {
        if(!audio.current) return;
        audio.current.pause();
    };
    React.useEffect(() => {
        if(!audio.current) return;
        const au= audio.current;


        au.addEventListener("play", ()=>{
            setIsMusicPlaying(true)
        })
        au.addEventListener("pause", ()=>{
            setIsMusicPlaying(false)
        })

        return ()=>{
            au.removeEventListener("play", ()=>{})
            au.removeEventListener("pause", ()=>{})
        }
    }, []);

    const handleDiscoverClick = () => {
        setShowWelcome(false);
    };

    return (
        <main className="relative w-full h-full flex flex-col">
            <Audio ref={audio} className="hidden" id="backgroundMusic" autoPlay loop  src="/assets/claudio.mp3" type="audio/mp3"/>
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
                                <Video size={{width: 470}} autoPlay src="/Video_kaléidoscope.mp4" type="video/mp4" muted loop/>
                                <img style={{position: "absolute"}} src={"/assets/logo_kaleidoscope.svg"} alt={"hgv"} width={700}
                                     height={350}/>
                            </div>
                        </div>
                        <ColorFilter/>
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
                            {isMusicPlaying ? <Volume2/> : <VolumeX/>}
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-2">
                            {movies.map((movie) => (
                                <MovieComponent
                                    className="aspect-video"
                                    onClick={() => {
                                        if (movie.title !== "Dummy Movie") setSelectedMovie(movie);
                                    }}
                                    key={movie.id}
                                    movie={movie}
                                    preferredFrame={movie.preferredFrame as Frame}
                                />
                            ))}
                        </div>
                        <MoviePopable movie={selectedMovie ?? undefined} close={() => setSelectedMovie(null)}/>
                    </>
                )}
            </motion.div>
        </main>
    );
}
