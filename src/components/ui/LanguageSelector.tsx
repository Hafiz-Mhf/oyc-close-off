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
      className={`inline-grid grid-cols-2 border border-white/15 bg-oyc-navy-deep/85 ${toolbar ? "rounded-xl p-0.5" : compact ? "rounded-xl p-1" : "w-full rounded-2xl p-1"}`}
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
            className={`${toolbar ? "min-h-11 min-w-11 px-2.5 text-xs" : "min-h-11 px-3 text-sm"} cursor-pointer rounded-lg font-bold transition-[background-color,color,box-shadow] duration-150 enabled:active:scale-[0.98] ${
              selected
                ? "bg-oyc-cyan text-oyc-navy-deep shadow-[0_6px_18px_-8px_rgb(0_229_237/65%)]"
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
