// components/DynamicBlurImage.tsx
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "placeholder"> & {
  blurDataURL?: string;
};

export default function DynamicBlurImage({ blurDataURL, alt, ...props }: Props) {
  return (
    <Image
      {...props}
      alt={alt}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
