import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ColorChoose } from "../color/ColorChoose";
import { DropZone } from "../component/drop-zone";
import { PutBlobResult } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Movie } from "@prisma/client";
import { MovieWithRelations } from "@/pages/admin/movies";

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
  movieSelected?: MovieWithRelations;
  onSubmit?: (data: MovieFormValues) => Promise<void>;
}

export function MovieForm({ movieSelected, onSubmit }: MovieFormProps) {
  onSubmit = onSubmit ?? (async (data) => console.log(data));

  const defaultValues: MovieFormValues = {
    title: movieSelected?.title ?? "",
    year: movieSelected?.year ?? 2021,
    directors:
      movieSelected?.directors.map(
        (director) => director.firstName + " " + director.lastName
      ) ?? [],
    actors:
      movieSelected?.actors.map(
        (actor) => actor.firstName + " " + actor.lastName
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
      {loading && (
        <div className="absolute w-full h-full bg-gray-100 opacity-50 z-10" />
      )}
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
                  console.log(value);
                  return value.map(
                    (director: any) =>
                      director.firstName + " " + director.lastName
                  );
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
                  console.log(value);
                  return value.map(
                    (actor: any) => actor.firstName + " " + actor.lastName
                  );
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
