import type { ReflectionChoice } from "@/types/journey";

export interface ReflectionOption {
  id: ReflectionChoice;
  label: string;
  description: string;
  takeaway: string;
}

export const reflectionOptions: readonly ReflectionOption[] = [
  {
    id: "strength",
    label: "Discover my strengths",
    description: "Understand what I enjoy and do well.",
    takeaway: "Start by recognising the strengths you already bring to your work.",
  },
  {
    id: "conversation",
    label: "Have a career chat",
    description: "Talk with my immediate supervisor.",
    takeaway:
      "A meaningful career conversation with your immediate supervisor can help you see your next step more clearly.",
  },
  {
    id: "learning",
    label: "Learn something new",
    description: "Explore a skill or development opportunity.",
    takeaway: "Small learning steps today can open up new possibilities tomorrow.",
  },
  {
    id: "action",
    label: "Take my next step",
    description: "Turn an idea into a practical action.",
    takeaway:
      "You don't need to have everything figured out. Start with one achievable action.",
  },
] as const;
