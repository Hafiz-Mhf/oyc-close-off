import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/data/copy";
import { getReflectionOptions } from "@/data/reflections";
import type { Language, ReflectionChoice } from "@/types/journey";

interface ReflectionScreenProps {
  language: Language;
  selected: ReflectionChoice | null;
  onSelect: (choice: ReflectionChoice) => void;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function ReflectionScreen({
  language,
  selected,
  onSelect,
  onContinue,
  onSkip,
  onBack,
}: ReflectionScreenProps) {
  const text = copy[language];
  const newTabLabel = language === "bm" ? "dibuka dalam tab baharu" : "opens in a new tab";
  const reflectionOptions = getReflectionOptions(language);
  const selectedOption = reflectionOptions.find((option) => option.id === selected);

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = reflectionOptions.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (nextIndex === null) return;

    event.preventDefault();
    onSelect(reflectionOptions[nextIndex].id);
    const options = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[data-reflection-option]");
    options?.[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-1 flex-col px-5 py-6 tablet:px-12 tablet:py-10">
      <Button variant="quiet" size="sm" onClick={onBack} className="mr-auto">
        {text.backPoster7}
      </Button>
      <div className="mx-auto mt-5 w-full max-w-4xl">
        <p className="text-sm font-bold tracking-[0.16em] text-oyc-cyan uppercase">{text.reflectionEyebrow}</p>
        <h1 id="reflection-heading" className="mt-3 text-3xl leading-tight font-black tracking-[-0.03em] tablet:text-5xl">
          {text.reflectionTitle}
        </h1>
        <p className="mt-3 text-sm leading-6 text-oyc-text-muted">
          {text.reflectionPrivacy}
        </p>

        <div
          role="radiogroup"
          aria-labelledby="reflection-heading"
          className="mt-7 grid gap-3 tablet:grid-cols-2"
        >
          {reflectionOptions.map((option, index) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={selected ? (isSelected ? 0 : -1) : (index === 0 ? 0 : -1)}
                data-reflection-option
                onClick={() => onSelect(option.id)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                className={`min-h-24 cursor-pointer rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow] duration-200 ${
                  isSelected
                    ? "border-oyc-cyan bg-oyc-cyan/12 text-white shadow-[0_0_0_1px_rgb(0_229_237/35%)]"
                    : "border-oyc-border bg-white/5 text-oyc-text hover:border-oyc-cyan/60 hover:bg-white/8"
                }`}
              >
                <span className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border ${isSelected ? "border-oyc-cyan bg-oyc-cyan text-oyc-navy" : "border-oyc-border"}`}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span>
                    <span className="block font-bold">{option.label}</span>
                    <span className="mt-1 block text-sm leading-5 font-normal text-oyc-text-muted">
                      {option.description}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="min-h-24">
          {selectedOption && (
            <div className="mt-5 rounded-2xl border border-oyc-cyan/50 bg-oyc-navy-panel/75 p-5">
              <p className="text-xs font-bold tracking-[0.14em] text-oyc-cyan uppercase">{text.takeaway}</p>
              <p className="mt-2 text-sm leading-6 text-oyc-text tablet:text-base">
                {selectedOption.takeaway}
              </p>
              {selectedOption.resources && (
                <div className="mt-4 border-t border-oyc-border/70 pt-4">
                  <p className="text-sm font-bold text-white tablet:text-base">
                    {selectedOption.resourcePrompt}
                  </p>
                  <div className="mt-3 grid gap-3 tablet:grid-cols-2">
                    {selectedOption.resources.map((resource) => (
                      <a
                        key={resource.url}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-24 cursor-pointer items-center justify-between gap-4 rounded-xl border border-oyc-cyan/70 bg-oyc-cyan/10 p-4 text-left transition-[border-color,background-color,box-shadow,transform] hover:border-oyc-cyan hover:bg-oyc-cyan/18 hover:shadow-[0_0_0_1px_rgb(0_229_237/35%)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oyc-cyan"
                        aria-label={`${resource.label}: ${selectedOption.resourceActionLabel} (${newTabLabel})`}
                      >
                        <span className="min-w-0">
                          <span className="block font-bold text-white underline decoration-oyc-cyan decoration-2 underline-offset-4">
                            {resource.label}
                          </span>
                          <span className="mt-1 block text-xs text-oyc-text-muted">
                            {resource.displayUrl}
                          </span>
                          <span className="mt-2 block text-sm font-semibold text-oyc-cyan">
                            {selectedOption.resourceActionLabel}
                          </span>
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 shrink-0 text-oyc-cyan transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-col-reverse gap-3 phone:flex-row phone:justify-end">
          <Button variant="secondary" onClick={onSkip}>
            {text.skip}
          </Button>
          <Button onClick={onContinue} disabled={!selected}>
            {text.continue}
          </Button>
        </div>
      </div>
    </div>
  );
}
