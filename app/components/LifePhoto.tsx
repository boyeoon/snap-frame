"use client";

import FrameList from "./FrameSelect";
import Camera from "./Camera";
import { useState } from "react";

export default function LifePhoto() {
  const [videoSrc, setVideoSrc] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    if (!videoSrc) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoSrc(stream);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 pt-4 pb-12">
      <Camera setVideoSrc={setVideoSrc} />
      <FrameList videoSrc={videoSrc} startCamera={startCamera} />
    </div>
  );
}
