export type JourneyScreen = "welcome" | "story" | "reflection" | "closing";

export type Language = "eng" | "bm";

export type ReflectionChoice =
  | "strength"
  | "conversation"
  | "learning"
  | "action";

export interface Poster {
  id: number;
  src: string;
  title: string;
  alt: string;
  transcript: readonly string[];
  width: number;
  height: number;
}

export interface AudioTrack {
  id: "comet" | "echo";
  title: string;
  artist: string;
  src: string;
  downloadUrl: string;
  watchUrl: string;
  credit: "Music provided by NoCopyrightSounds";
}
