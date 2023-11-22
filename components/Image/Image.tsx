
interface ImageProps {
  /**
   * key of the image (vercel blob)
   */
  src: string;
  /**
   * alt text for the image
   */
  alt: string;
  /**
   * width of the image
   */
  width: number;
  /**
   * height of the image
   */
  height: number;
}

export function Image(props: ImageProps) {
  const { src, alt, width, height } = props;
  const url = `/api/image?key=${src}`;

  return (
    <Image src={url} alt={alt} width={width} height={height} />
  );
}
