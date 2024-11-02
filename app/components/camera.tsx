"use client";

import { useRef } from "react";

interface CameraProps {
  setVideoSrc: (src: MediaStream | null) => void;
}

export default function Camera({}: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center mt-4">
      <video ref={videoRef} className="hidden" />
    </div>
  );
}
