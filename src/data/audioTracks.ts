import type { AudioTrack } from "@/types/journey";

export const audioTracks: readonly AudioTrack[] = [
  {
    id: "comet",
    title: "Comet [NCS Release]",
    artist: "Skybreak & Keepsake",
    src: "/audio/comet.mp3",
    downloadUrl: "https://ncs.io/Comet",
    watchUrl: "https://ncs.lnk.to/CometAT/youtube",
    credit: "Music provided by NoCopyrightSounds",
  },
  {
    id: "echo",
    title: "Echo [NCS Release]",
    artist: "Apollo On The Run",
    src: "/audio/echo.mp3",
    downloadUrl: "https://ncs.io/A_Echo",
    watchUrl: "https://ncs.lnk.to/A_EchoAT/youtube",
    credit: "Music provided by NoCopyrightSounds",
  },
] as const;
