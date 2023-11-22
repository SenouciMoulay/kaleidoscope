import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

interface ImagePreviewProps {
  onClose?: () => void;
  alt: string;
  src: string;
  height: number;
  width: number;
  className?: string;
}


export function ImagePreview({
  onClose,
  alt,
  src,
  height,
  width,
  className,
}: ImagePreviewProps) {

  const defaultClassName = "object-contain rounded-lg";

  const [hover, setHover] = useState(false);

  if (className?.charAt(0) === "+") {
    className = className.substring(1);
    className = defaultClassName + " " + className;
  }

  return (
    <div className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <Image
        alt={alt} src={src} width={width} height={height} className={className ?? defaultClassName} />
      {hover && onClose && (
        <div className="absolute top-1 right-1">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-violet-100 hover:text-violet-500 text-violet-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )

}
