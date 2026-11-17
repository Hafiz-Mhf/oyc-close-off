import type { Language, ReflectionChoice } from "@/types/journey";

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

const bmReflectionOptions: readonly ReflectionOption[] = [
  {
    id: "strength",
    label: "Kenali kekuatan saya",
    description: "Fahami perkara yang saya minati dan lakukan dengan baik.",
    takeaway: "Mulakan dengan mengenali kekuatan yang telah anda bawa ke tempat kerja.",
  },
  {
    id: "conversation",
    label: "Adakan perbualan kerjaya",
    description: "Berbual dengan penyelia terdekat saya.",
    takeaway: "Perbualan kerjaya yang bermakna dengan penyelia terdekat boleh membantu anda melihat langkah seterusnya dengan lebih jelas.",
  },
  {
    id: "learning",
    label: "Pelajari sesuatu yang baharu",
    description: "Terokai kemahiran atau peluang pembangunan.",
    takeaway: "Langkah pembelajaran kecil hari ini boleh membuka kemungkinan baharu pada masa hadapan.",
  },
  {
    id: "action",
    label: "Ambil langkah seterusnya",
    description: "Tukarkan idea kepada tindakan yang praktikal.",
    takeaway: "Anda tidak perlu mengetahui semuanya. Mulakan dengan satu tindakan yang boleh dicapai.",
  },
];

export function getReflectionOptions(language: Language) {
  return language === "bm" ? bmReflectionOptions : reflectionOptions;
}
