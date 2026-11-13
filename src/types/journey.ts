export type JourneyScreen = "welcome" | "story" | "reflection" | "closing";

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
  width: 1200;
  height: 1500;
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
