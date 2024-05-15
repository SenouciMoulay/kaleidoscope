// list all movies

import { MovieCard } from "@/components/movie/movie_card";
import { MovieForm } from "@/components/movie/movie_form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Movie, Prisma, PrismaClient } from "@prisma/client";
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRight, ArrowUpDown, Trash2Icon, TrashIcon } from "lucide-react";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";

export type TMovieAdmin = Prisma.MovieGetPayload<{
  include: {
    directors: true;
    actors: true;
    frames: true;
    colors: true;
  };
}>;

// get the 1st page of movies
export async function getStaticProps(): Promise<{
  props: {
    movies: TMovieAdmin[];
  };
}> {
  const prisma = new PrismaClient();

  const movies = await prisma.movie.findMany({
    include: {
      directors: true,
      actors: true,
      frames: true,
      colors: true,
    },
  });

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}

export default function Movies({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedMovie, setSelectedMovie] = useState<TMovieAdmin | undefined>(
    undefined
  );
  const [tableMovies, setTableMovies] = useState<TMovieAdmin[]>(movies);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  //   columns: [
  //     {
  //       accessorKey: "title",
  //       header: "Title",
  //     },
  //     {
  //       accessorKey: "year",
  //       header: "Year",
  //     },
  //     {
  //       accessorKey: "directors",
  //       header: "Directors",
  //     },
  //     {
  //       accessorKey: "actors",
  //       header: "Actors",
  //     },
  //     {
  //       accessorKey: "colors",
  //       header: "Colors",
  //     },
  //     {
  //       accessorKey: "actions",
  //       header: "",
  //     },
  //   ],
  //   data: movies,
  //   getCoreRowModel: getCoreRowModel<Movie>(),
  // });
  const columns = ["Title", "Year", "Directors", "Actors", "Colors", ""];
  console.log("movie :", tableMovies)

  const editMovie = (id: string) => {
    setSelectedMovie(movies.find((movie) => movie.id === id));
    setOpenDialog(true);
  };

  const deleteMovie = (id: string) => {
    // delete the movie
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTableMovies((prev) => prev.filter((movie) => movie.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setTableMovies(
      movies.filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          movie.directors
            .map((director) => `${director.firstName} ${director.lastName}`)
            .join(" ")
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          movie.actors
            .map((actor) => `${actor.firstName} ${actor.lastName}`)
            .join(" ")
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          movie.colors
            .map((color) => color.name)
            .join(" ")
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          movie.year.toString().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <main className="relative flex min-h-screen flex-col w-4/5 gap-6 mt-12">
      <h1 className="text-3xl font-bold">List of Movies</h1>
      <div className="flex justify-between items-center">
        <div className="flex py-4">
          <Input
            placeholder="Rechercher..."
            value={search}
            onChange={(event) => onChangeSearch(event)}
            className="max-w-sm bg-transparent text-white"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setOpenDialog((prev) => !prev), setSelectedMovie(undefined);
          }}
        >
          New Movie
        </Button>
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableMovies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.year}</TableCell>
                <TableCell>
                  {movie.directors.map((director) => (
                    <span key={director.id}>
                      {director.firstName} {director.lastName}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  {movie.actors.map((actor) => (
                    <span key={actor.id}>
                      {actor.firstName} {actor.lastName}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <div className="flex align-items">
                    {movie.colors.map((color) => (
                      <div key={color.id}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div
                                key={color.id}
                                style={{
                                  backgroundColor: color.value,
                                }}
                                className="-ml-2 w-8 h-8 rounded-full hover:scale-105 transform transition duration-300"
                              />
                            </TooltipTrigger>
                            <TooltipContent>{color.name}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button variant="ghost" onClick={() => deleteMovie(movie.id)}>
                    <Trash2Icon
                      className="h-6 w-6 hover:scale-110 transform transition duration-300"
                      color="#FF0000"
                    />
                  </Button>
                  <Button variant="ghost" onClick={() => editMovie(movie.id)}>
                    <ArrowRight className="h-6 w-6 hover:scale-110 transform transition duration-300" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Movie</DialogTitle>
            </DialogHeader>
            <MovieForm movieSelected={selectedMovie} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
