import { copy } from "@/data/copy";
import type { Language, Poster } from "@/types/journey";

interface StoryProgressProps {
  language: Language;
  posters: readonly Poster[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function StoryProgress({ language, posters, activeIndex, onSelect }: StoryProgressProps) {
  const text = copy[language];
  return (
    <ol className="grid grid-cols-7 gap-1" aria-label={text.journeyProgress}>
      {posters.map((poster, index) => {
        const status = index < activeIndex ? text.previousStatus : index === activeIndex ? text.current : text.upcoming;

        return (
          <li key={poster.id}>
            <button
              type="button"
              onClick={() => onSelect(index)}
              title={`${text.poster} ${poster.id}: ${poster.title}`}
              className="group flex min-h-11 w-full cursor-pointer items-center rounded-md focus-visible:outline-offset-1"
              aria-label={`${text.poster} ${poster.id}: ${poster.title}, ${status}`}
              aria-current={index === activeIndex ? "step" : undefined}
            >
              <span
                aria-hidden="true"
                className={`w-full rounded-full transition-[background-color,height,box-shadow] duration-200 group-hover:bg-oyc-cyan-soft ${
                  index === activeIndex
                    ? "h-2 bg-oyc-cyan shadow-[0_0_10px_rgb(0_229_237/55%)]"
                    : index < activeIndex
                      ? "h-1.5 bg-oyc-cyan/45"
                      : "h-1.5 bg-white/20"
                }`}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}
