import { MovieForm } from "@/components/movie/movie_form";

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

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-1">
          <MovieForm />
        </div>
      </div>
    </main>
  );
}
