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

export type MovieWithRelations = Prisma.MovieGetPayload<{
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
    movies: MovieWithRelations[];
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
  const [selectedMovie, setSelectedMovie] = useState<
    MovieWithRelations | undefined
  >(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns: [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "year",
        header: "Year",
      },
      {
        accessorKey: "directors",
        header: "Directors",
      },
      {
        accessorKey: "actors",
        header: "Actors",
      },
      {
        accessorKey: "colors",
        header: "Colors",
      },
      {
        accessorKey: "actions",
        header: "",
      },
    ],
    data: movies,
    getCoreRowModel: getCoreRowModel<Movie>(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

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
        movies = movies.filter((movie) => movie.id !== id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="relative flex min-h-screen flex-col w-4/5 gap-6 mt-12">
      <h1 className="text-3xl font-bold">List of Movies</h1>
      <div className="flex justify-between items-center">
        <div className="flex py-4">
          <Input
            placeholder="Rechercher..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
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
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
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
                                  backgroundColor: color.name,
                                }}
                                className="-ml-1 w-6 h-6 rounded-full"
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
                    <Trash2Icon className="h-6 w-6" color="#FF0000" />
                  </Button>
                  <Button variant="ghost" onClick={() => editMovie(movie.id)}>
                    <ArrowRight className="h-6 w-6" />
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
