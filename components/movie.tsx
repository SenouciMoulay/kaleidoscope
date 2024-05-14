import { Frame, Movie, Color } from "@prisma/client";
import Image from "next/image";
import {CreationColor} from "@/pages/api/movies";

interface MovieProps {
    movie: Movie,
    preferredFrame: Frame
    colors: Color
    className?: string
    onClick: () => void
}

export default function MovieComponent({ movie, preferredFrame, colors, className, onClick }: MovieProps) {

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div className={`relative group block cursor-pointer ${className} rounded-sm m-1.5 `} onClick={onClick}>
            <Image
                src={preferredFrame.image}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 object-cover w-full h-full rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 w-full h-full rounded-md opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 flex justify-start items-end p-4">
                <div className={"flex flex-col"}>
                    <p className="text-white text-2xl font-bold mb-2 ml-2">{movie.title}</p>
                    <p className="text-white text-xl font-bold mb-2 ml-2">{movie.year}</p>
                </div>
            </div>
        </div>
    );
}
