import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { UploaderPopUp } from '../Image/UploaderPopUp';
import { ColorWheel } from "../color/ColorWheel";

const movieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1890).max(2100),
  directors: z.array(z.string()),
  actors: z.array(z.string()),
  frames: z.array(z.string()),
  colors: z.array(z.string()),
});

type MovieFormValues = z.infer<typeof movieSchema>;

interface MovieFormProps {
  defaultValues?: MovieFormValues;
  onSubmit?: (data: MovieFormValues) => void;
}

export function MovieForm(
  { defaultValues, onSubmit }: MovieFormProps
) {
  onSubmit = onSubmit ?? ((data) => console.log(data));

  const { register, handleSubmit, formState: { errors } } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: defaultValues,
  });

  const [openFrameUploader, setOpenFrameUploader] = useState(false);
  const [openPreferredFrameUploader, setOpenPreferredFrameUploader] = useState(false);


  const [openColorPicker, setOpenColorPicker] = useState(false);

  const [frames, setFrames] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  function submit(data: MovieFormValues) {
    setLoading(true);


  }


  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit(submit)} >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="border border-gray-300 rounded-md"
              disabled={loading}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              {...register("year")}
              className="border border-gray-300 rounded-md"
              disabled={loading}
            />
            {errors.year && <span className="text-red-500">{errors.year.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="directors">Directors</label>
            <input
              id="directors"
              type="text"
              {...register("directors")}
              className="border border-gray-300 rounded-md"
              disabled={loading}
            />
            {errors.directors && <span className="text-red-500">{errors.directors.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="actors">Actors</label>
            <input
              id="actors"
              type="text"
              {...register("actors")}
              className="border border-gray-300 rounded-md"
              disabled={loading}
            />
            {errors.actors && <span className="text-red-500">{errors.actors.message}</span>}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="frames">Frames</label>
            <button
              type="button"
              className="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-violet-50"
              onClick={() => setOpenFrameUploader(true)}
              disabled={loading}
            >
              Select
            </button>
            {errors.frames && <span className="text-red-500">{errors.frames.message}</span>}

          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="frames">Cover</label>
            <button
              type="button"
              className="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-violet-50"
              onClick={() => setOpenPreferredFrameUploader(true)}
              disabled={loading}
            >
              Select
            </button>
            {errors.frames && <span className="text-red-500">{errors.frames.message}</span>}

          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="colors">Colors</label>
            <ColorWheel />

            {errors.colors && <span className="text-red-500">{errors.colors.message}</span>}
          </div>
        </div>
      </form>
      <UploaderPopUp
        open={openPreferredFrameUploader}
        onClose={() => setOpenPreferredFrameUploader(false)}
        onUpload={(files) => {
          console.log(files);
          const keys = files.map((file) => {
            const key = uuidv4();
            return key;
          });
          setFrames([...frames, ...keys]);
          setOpenPreferredFrameUploader(false);
        }} />
      <UploaderPopUp
        open={openFrameUploader}
        onClose={() => setOpenFrameUploader(false)}
        multiple
        onUpload={(files) => {
          console.log(files);
          const keys = files.map((file) => {
            const key = uuidv4();
            return key;
          });
          setFrames([...frames, ...keys]);
          setOpenFrameUploader(false);
        }} />

    </div>
  );
}
