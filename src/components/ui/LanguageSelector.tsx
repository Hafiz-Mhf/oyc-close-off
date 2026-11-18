import type { Language } from "@/types/journey";

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  ariaLabel: string;
  compact?: boolean;
  toolbar?: boolean;
}

const options: readonly { id: Language; short: string; full: string }[] = [
  { id: "eng", short: "EN", full: "English" },
  { id: "bm", short: "BM", full: "Bahasa Melayu" },
];

export function LanguageSelector({ language, onChange, ariaLabel, compact = false, toolbar = false }: LanguageSelectorProps) {
  return (
    <div
      className={`inline-grid grid-cols-2 ${
        compact
          ? ` items-center rounded-full border border-white/10 bg-oyc-navy-deep/90 shadow-2xl shadow-black/35 backdrop-blur-xl ${
              toolbar ? "p-0.5" : "min-h-14 p-1.5"
            }`
          : "w-full rounded-2xl border border-white/15 bg-oyc-navy-deep/85 p-1"
      }`}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const selected = option.id === language;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={`${
              compact
                ? `${toolbar ? "min-h-11 min-w-11 px-2.5" : "min-h-11 min-w-11 px-3"} rounded-full text-xs tracking-[0.06em]`
                : "min-h-11 rounded-xl px-3 text-sm"
            } cursor-pointer font-bold transition-[background-color,color,box-shadow] duration-150 enabled:active:scale-[0.98] ${
              selected
                ? compact
                  ? "bg-oyc-cyan/18 text-oyc-cyan shadow-[inset_0_0_0_1px_rgb(0_229_237/42%)]"
                  : "bg-oyc-cyan text-oyc-navy-deep shadow-[0_6px_18px_-8px_rgb(0_229_237/65%)]"
                : "text-oyc-text-muted hover:bg-white/8 hover:text-white"
            }`}
          >
            {compact ? option.short : option.full}
          </button>
        );
      })}
    </div>
  );
}
