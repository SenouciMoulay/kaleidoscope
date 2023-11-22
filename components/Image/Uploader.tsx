/* eslint-disable jsx-a11y/alt-text */
// components/CustomFileInput.tsx
import { Cloud, Cross, Image, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { ImagePreview } from "./ImagePreview";

interface UploaderProps {
  onUpload: (files: File[]) => void;
  multiple?: boolean;

}

export function Uploader({
  onUpload,
  multiple
}: UploaderProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    console.log("click");
    console.log(ref.current ?? "no ref")
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    if (!multiple) {
      setSelectedFiles(files);
      return;
    }
    setSelectedFiles((prev) => [...prev, ...files]);
  };
  return (
    <div className="flex flex-col items-center justify-center" >
      {(selectedFiles.length == 0 &&
        <div
          onClick={handleClick}
          className="p-4 flex flex-col items-center gap-2 bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer select-none"
        >
          <Image size={48} />
          <span>Choose some files to upload</span>

        </div>
      )}
      {!!selectedFiles.length && (
        <>
          <div className="p-4 mt-4 bg-violet-50 overflow-hidden text-ellipsis rounded-lg flex flex-row items-center gap-2">
            {selectedFiles.map((file, i) => {
              return (
                <ImagePreview
                  className="+ m-2"
                  key={i} src={URL.createObjectURL(file)} alt={file.name} height={100} width={100} onClose={
                    () => {
                      setSelectedFiles((prev) => prev.filter((_, index) => index !== i));
                    }
                  } />
              );
            })}
            {/* add  */}
            <button className="p-1 rounded-xl bg-violet-500 hover:bg-violet-600 text-violet-50" onClick={handleClick}>
              <Plus />
            </button>
          </div>

          <div className="p-4 mt-4 bg-violet-50 overflow-hidden text-ellipsis rounded-lg flex flex-row items-center gap-2">
            {/* validate , clear */}
            <button className="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-violet-50" onClick={() => {
              setSelectedFiles([]);
            }}>
              Clear
            </button>
            <button className="p-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-violet-50" onClick={() => {
              onUpload(selectedFiles);
              setSelectedFiles([]);
            }}>
              Upload
            </button>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={ref}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
