import { TextShimmer } from "@/components/ui/text-shimmer";
import { main } from "@/font/font";

export default function TextShimmerBasic() {
  return (
    <TextShimmer
      className={` [--base-color:theme(colors.zinc.50)] [--base-gradient-color:theme(colors.zinc.50)]  ${main.className} mt-4 max-w-4xl  text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl`}
    >
      Vincent Donaire Iglesia
    </TextShimmer>
  );
}
