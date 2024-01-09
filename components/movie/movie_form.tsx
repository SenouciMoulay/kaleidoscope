import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ColorChoose } from "../color/ColorChoose";
import { DropZone } from "../component/drop-zone";
import { PutBlobResult } from "@vercel/blob"
import { v4 as uuidv4 } from 'uuid';


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
  defaultValues?: MovieFormValues;
  onSubmit?: (data: MovieFormValues) => Promise<void>;
}

export function MovieForm(
  { defaultValues, onSubmit }: MovieFormProps
) {
  onSubmit = onSubmit ?? (async (data) => console.log(data));

  const {
    control,
    register, handleSubmit, formState: { errors } } = useForm<MovieFormValues>({
      resolver: zodResolver(movieSchema),
      defaultValues: defaultValues
    });

  const [loading, setLoading] = useState(false);

  function submit(data: MovieFormValues) {
    setLoading(true);
    // data.frames = ['https://ijgjorrbv0sd9i61.public.blob.vercel-storage.com/892a80f1-e586-4421-8168-4f38c564b88a-Cb1ouHDvRObnpFuhb6ASDa21LjmTCW',
    // 'https://ijgjorrbv0sd9i61.public.blob.vercel-storage.com/7e4795c3-0b88-427f-b19a-c0a2e0703a2b-ykYTZ16ZG83rv28QrB2yilpLdKiO9Y',
    // 'https://ijgjorrbv0sd9i61.public.blob.vercel-storage.com/e41c2944-2a76-4a55-a346-f79cb99cdb32-LvPueYN3aKmOnbnZxpoksZLVwbu6Rk',
    //   'https://ijgjorrbv0sd9i61.public.blob.vercel-storage.com/f091d15a-f9d8-4dc4-a9c7-26ee290a8f21-0BhNSHLubqopKy5ZcWJROuWsi2xy99',
    // ]

    const covers: Array<File> = []
    const images: Array<File> = []
    frames.forEach((frame) => {
      if (frame.name.includes("cover")) {
        covers.push(frame);
      } else {
        images.push(frame);
      }
    });
    if (covers.length == 0) {
      throw new Error("At least one cover is required")
    }

    const coverUploadPromises: Array<Promise<PutBlobResult>> = []
    covers.forEach((cover) => {
      const formData = new FormData();
      formData.append("file", cover);
      coverUploadPromises.push(
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json())
      )
    });

    const imageUploadPromises: Array<Promise<PutBlobResult>> = []
    images.forEach((image) => {
      const formData = new FormData();
      formData.append("file", image);
      imageUploadPromises.push(
        fetch("/api/upload", {
          method: "POST",
          body: formData,
        }).then((res) => res.json())

      )
    })

    Promise.all(coverUploadPromises).then((coverUrls) => {
      Promise.all(imageUploadPromises).then((imageUrls) => {
        const coverUrlsString = coverUrls.map((coverUrl) => coverUrl.url)
        const imageUrlsString = imageUrls.map((imageUrl) => imageUrl.url)
        data.frames = [...coverUrlsString, ...imageUrlsString]

            onSubmit?.(data).finally(() => setLoading(false));
          })
    })


  }

  const formRef = useRef<HTMLFormElement>(null);


  const [frames, setFrames] = useState<File[]>([]);

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit(submit)} ref={formRef} className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="border border-gray-300 rounded-md text-slate-950"
              disabled={loading}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="border border-gray-300 rounded-md text-slate-950"
              disabled={loading}
            />
            {errors.year && <span className="text-red-500">{errors.year.message}</span>}
          </div>
          <div className="flex flex-col space-y-1" >
            <label htmlFor="directors">Directors</label>
            <input
              id="directors"
              type="text"
              {...register("directors", { setValueAs: (value) => value.split(",") })}
              className="border border-gray-300 rounded-md text-slate-950"
              disabled={loading}
            />
            {errors.directors && <span className="text-red-500">{errors.directors.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="actors">Actors</label>
            <input
              id="actors"
              type="text"
              {...register("actors", { setValueAs: (value) => value.split(",") })}
              className="border border-gray-300 rounded-md text-slate-950"
              disabled={loading}
            />
            {errors.actors && <span className="text-red-500">{errors.actors.message}</span>}
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
            {errors.colors && <span className="text-red-500">{errors.colors.message}</span>}
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


            {errors.frames && <span className="text-red-500">{errors.frames.message}</span>}
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
