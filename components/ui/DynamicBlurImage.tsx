// components/DynamicBlurImage.tsx
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "placeholder"> & {
  blurDataURL?: string;
};

export default function DynamicBlurImage({ blurDataURL, ...props }: Props) {
  return (
    <Image
      {...props}
      alt={"img"}
      placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          
    />
  );
}
