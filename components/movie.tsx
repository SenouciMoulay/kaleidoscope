import { Frame } from "@prisma/client";
import Image from "next/image";

interface MovieProps {
  movie: {
    title: string;
    year: number;
    directors: Array<{
      firstName: string;
      lastName: string;
    }>;
    colors: Array<{
      name: string;
      value: string;
    }>;
  };
  preferredFrame: Frame;
  className?: string;
  onClick: () => void;
}

export default function MovieComponent({
  movie,
  preferredFrame,
  className,
  onClick,
}: MovieProps) {
  const color = movie.colors?.[0] ?? { value: "#000000", name: "Black" };
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={`relative group block  cursor-pointer ${className} rounded-sm m-1.5 `}
      onClick={onClick}
    >
      {preferredFrame.image && preferredFrame.image.length > 0 && (
        <Image
          src={preferredFrame.image}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 object-cover w-full h-full rounded-md"
        />
      )}
      <div
        className="absolute inset-0 bg-opacity-60 w-full h-full rounded-md opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 flex justify-start items-end p-4"
        style={{ background: `${color?.value}70` }}
      >
        <div className={"flex flex-col"}>
          {/* text shadow */}
          <p className="text-white text-2xl font-bold mb-2 ml-2 drop-shadow-sm">
            {movie.title}
          </p>
          <div className="flex flex-row">
            <div className="text-white text-sm ml-2 font-bold">
              {movie.directors
                .map((director) => `${director.firstName} ${director.lastName}`)
                .join(" - ")}
            </div>
            <div className="w-[40px] h-[40px] flex justify-center items-center ml-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
