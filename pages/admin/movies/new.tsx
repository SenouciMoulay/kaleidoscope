import { MovieForm, MovieFormValues } from "@/components/movie/movie_form";
import { CreationMovie } from "@/pages/api/movies";

export const colors = [
  { name: "Black'n White", hex: "#FFFFFF" },
  { name: "Blue", hex: "#0781FA" },
  { name: "Red", hex: "#E30613" },
  { name: "Dark Red", hex: "#D74127" },
  { name: "Pink", hex: "#E33A66" },
  { name: "Yellow", hex: "#FFC72C" },
  { name: "Green", hex: "#00EB79" },
  { name: "Purple", hex: "#A04AF0" },
  { name: "Brown", hex: "#D98750" },
];

export default function NewMovie() {
  async function onSubmit(data: MovieFormValues) {
    // POST /api/movies
    try {
      const validData: CreationMovie = {
        title: data.title,
        year: data.year,
        actors: data.actors.map((actor) => {
          if (actor.split(" ").length == 1) {
            return {
              firstName: actor,
              lastName: "",
            };
          } else if (actor.split(" ").length == 2) {
            return {
              firstName: actor.split(" ")[0],
              lastName: actor.split(" ")[1],
            };
          } else {
            return {
              firstName: actor.split(" ")[0],
              lastName: actor.split(" ").slice(1).join(" "),
            };
          }
        }),
        directors: data.directors.map((director) => {
          if (director.split(" ").length == 1) {
            return {
              firstName: director,
              lastName: "",
            };
          } else if (director.split(" ").length == 2) {
            return {
              firstName: director.split(" ")[0],
              lastName: director.split(" ")[1],
            };
          } else {
            return {
              firstName: director.split(" ")[0],
              lastName: director.split(" ").slice(1).join(" "),
            };
          }
        }),
        frames: data.frames.map((frame, index) => {
          return {
            key: frame,
            isPreferred: index == 0,
          };
        }),
        colors: data.colors.map((color) => {
          return {
            hex: color,
            name: colors.find((c) => c.hex == color)!.name,
          };
        }),
      };

      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validData),
      });
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
          <MovieForm onSubmit={onSubmit} />
        </div>
      </div>
    </main>
  );
}
