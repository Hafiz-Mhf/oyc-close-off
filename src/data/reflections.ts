import type { Language, ReflectionChoice } from "@/types/journey";

export interface ReflectionOption {
  id: ReflectionChoice;
  label: string;
  description: string;
  takeaway: string;
  resourcePrompt?: string;
  resources?: readonly {
    stepLabel: string;
    title: string;
    description: string;
    resourceName: string;
    actionLabel: string;
    url: string;
    displayUrl: string;
  }[];
}

export const reflectionOptions: readonly ReflectionOption[] = [
  {
    id: "strength",
    label: "Discover my strengths",
    description: "Understand what I enjoy and do well.",
    takeaway: "Start by recognising the strengths you already bring to your work.",
    resourcePrompt: "Ready to begin? Follow these two steps:",
    resources: [
      {
        stepLabel: "Step 1",
        title: "Take the free assessment",
        description: "Complete PrinciplesYou and save your assessment report.",
        resourceName: "PrinciplesYou",
        actionLabel: "Take the assessment",
        url: "https://principlesyou.com/",
        displayUrl: "principlesyou.com",
      },
      {
        stepLabel: "Step 2",
        title: "Explore your career possibilities",
        description: "Upload your assessment report to the MRANTI Career Path Adviser.",
        resourceName: "MRANTI Career Path Adviser",
        actionLabel: "Upload your report",
        url: "https://gemini.google.com/gem/c132b301ca89?usp=sharing",
        displayUrl: "gemini.google.com",
      },
    ],
  },
  {
    id: "conversation",
    label: "Start a career chat",
    description: "Have a conversation with my immediate supervisor.",
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
    resourcePrompt: "Bersedia untuk bermula? Ikuti dua langkah ini:",
    resources: [
      {
        stepLabel: "Langkah 1",
        title: "Ambil penilaian percuma",
        description: "Lengkapkan PrinciplesYou dan simpan laporan penilaian anda.",
        resourceName: "PrinciplesYou",
        actionLabel: "Ambil penilaian",
        url: "https://principlesyou.com/",
        displayUrl: "principlesyou.com",
      },
      {
        stepLabel: "Langkah 2",
        title: "Terokai potensi laluan kerjaya",
        description: "Muat naik laporan penilaian anda ke MRANTI Career Path Adviser.",
        resourceName: "MRANTI Career Path Adviser",
        actionLabel: "Muat naik laporan",
        url: "https://gemini.google.com/gem/c132b301ca89?usp=sharing",
        displayUrl: "gemini.google.com",
      },
    ],
  },
  {
    id: "conversation",
    label: "Mulakan perbualan kerjaya",
    description: "Berbual dengan pengurus saya.",
    takeaway: "Perbualan kerjaya yang bermakna dengan pengurus boleh membantu anda melihat langkah seterusnya dengan lebih jelas.",
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
