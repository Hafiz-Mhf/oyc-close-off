import { posters } from "@/data/posters";

interface StoryProgressProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function StoryProgress({ activeIndex, onSelect }: StoryProgressProps) {
  return (
    <ol className="grid grid-cols-7 gap-1" aria-label="Journey progress">
      {posters.map((poster, index) => {
        const status = index < activeIndex ? "previous" : index === activeIndex ? "current" : "upcoming";

        return (
          <li key={poster.id}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              className="group flex min-h-11 w-full cursor-pointer items-center rounded-md focus-visible:outline-offset-1"
              aria-label={`Poster ${poster.id}: ${poster.title}, ${status}`}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-full rounded-sm transition-colors group-hover:bg-oyc-cyan-soft ${
                  index <= activeIndex ? "bg-oyc-cyan" : "bg-white/20"
                }`}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
