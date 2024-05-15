import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ColorChoose } from "../color/ColorChoose";
import { DropZone } from "../component/drop-zone";
import { PutBlobResult } from "@vercel/blob";
import { TMovieAdmin } from "@/pages/admin/movies";
import { CreationMovie } from "@/pages/api/movies";
import { c } from "@vercel/blob/dist/put-96a1f07e";

const movieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1890).max(2100),
  directors: z.array(z.string()),
  actors: z.array(z.string()),
  frames: z.array(z.string()),
  colors: z.array(z.string()),
});

export type MovieFormValues = z.infer<typeof movieSchema>;

interface MovieFormProps {
  movieSelected?: TMovieAdmin;
}

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

export function MovieForm({ movieSelected }: MovieFormProps) {
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
          } if (actor.split(" ").length == 2) {
            return {
              firstName: actor.split(" ")[0],
              lastName: actor.split(" ")[1],
            };
          }
          return {
            firstName: actor.split(" ")[0],
            lastName: actor.split(" ").slice(1).join(" "),
          };

        }),
        directors: data.directors.map((director) => {
          if (director.split(" ").length == 1) {
            return {
              firstName: director,
              lastName: "",
            };
          }
          if (director.split(" ").length == 2) {
            return {
              firstName: director.split(" ")[0],
              lastName: director.split(" ")[1],
            };
          }
          return {
            firstName: director.split(" ")[0],
            lastName: director.split(" ").slice(1).join(" "),
          };
        }),
        frames: data.frames.map((frame, index) => {
          return {
            key: frame,
            isPreferred: index == 0,
          };
        }),
        colors: data.colors.map((color) => {
          console.log("submit color", color);
          console.log(
            "find color",
            colors.find((c) => c.hex == color)
          );
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
  const defaultValues: MovieFormValues = {
    title: movieSelected?.title ?? "",
    year: movieSelected?.year ?? 2021,
    directors:
      movieSelected?.directors.map(
        (director) => `${director.firstName} ${director.lastName}`
      ) ?? [],
    actors:
      movieSelected?.actors.map(
        (actor) => `${actor.firstName} ${actor.lastName}`
      ) ?? [],
    frames: movieSelected?.frames.map((frame) => frame.image) ?? [],
    colors: movieSelected?.colors.map((color) => color.name) ?? [],
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: defaultValues,
  });

  const [loading, setLoading] = useState(false);

  function submit(data: MovieFormValues) {
    setLoading(true);

    const covers: Array<File> = [];
    const images: Array<File> = [];
    frames.forEach((frame) => {
      if (frame.name.includes("cover")) {
        covers.push(frame);
      } else {
        images.push(frame);
      }
    });
    if (covers.length == 0) {
      throw new Error("At least one cover is required");
    }

    const coverUploadPromises: Array<Promise<PutBlobResult>> = [];
    covers.forEach((cover) => {
      const formData = new FormData();
      formData.append("file", cover);
      coverUploadPromises.push(
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json())
      );
    });

    const imageUploadPromises: Array<Promise<PutBlobResult>> = [];
    images.forEach((image) => {
      const formData = new FormData();
      formData.append("file", image);
      imageUploadPromises.push(
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json())
      );
    });

    Promise.all(coverUploadPromises).then((coverUrls) => {
      Promise.all(imageUploadPromises).then((imageUrls) => {
        const coverUrlsString = coverUrls.map((coverUrl) => coverUrl.url);
        const imageUrlsString = imageUrls.map((imageUrl) => imageUrl.url);
        data.frames = [...coverUrlsString, ...imageUrlsString];

        onSubmit?.(data).finally(() => setLoading(false));
      });
    });
  }

  const formRef = useRef<HTMLFormElement>(null);

  const [frames, setFrames] = useState<File[]>([]);

  return (
    <div className="flex flex-col space-y-4">
      <form
        onSubmit={handleSubmit(submit)}
        ref={formRef}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              disabled={loading}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              {...register("year", { valueAsNumber: true })}
              disabled={loading}
            />
            {errors.year && (
              <span className="text-red-500">{errors.year.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="directors">Directors</label>
            <input
              id="directors"
              type="text"
              {...register("directors", {
                setValueAs: (value) => {
                  if (value == "") return [];
                  if (value.length == 1) {
                    return [value];
                  }
                  return value.split(",").map((director: any) => director);
                },
              })}
              disabled={loading}
            />
            {errors.directors && (
              <span className="text-red-500">{errors.directors.message}</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="actors">Actors</label>
            <input
              id="actors"
              type="text"
              {...register("actors", {
                setValueAs: (value) => {
                  if (value == "") return [];
                  if (value.length == 1) {
                    return [value];
                  }
                  return value.split(",").map((actor: any) => actor);
                },
              })}
              disabled={loading}
            />
            {errors.actors && (
              <span className="text-red-500">{errors.actors.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="colors">Colors</label>
            <Controller
              name="colors"
              control={control}
              render={({ field }) => (
                <ColorChoose
                  id="colors"
                  defaultValue={defaultValues?.colors}
                  onChange={(colors) => {
                    field.onChange(colors);
                    console.log(colors);
                  }}
                  disabled={loading}
                />
              )}
            />
            {errors.colors && (
              <span className="text-red-500">{errors.colors.message}</span>
            )}
          </div>
          {/* frame */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="frames">Frames</label>
            <Controller
              name="frames"
              control={control}
              render={({ field }) => (
                <DropZone
                  id="frames"
                  onChange={(frames) => {
                    field.onChange(frames.map((file) => file.name));
                    setFrames(frames);
                  }}
                  disabled={loading}
                />
              )}
            />

            {errors.frames && (
              <span className="text-red-500">{errors.frames.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-green-50"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
