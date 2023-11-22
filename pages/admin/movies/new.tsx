import { MovieForm } from "@/components/movie/movie_form";

export default function NewMovie(props) {
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
