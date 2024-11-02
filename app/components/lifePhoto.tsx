"use client";

import FrameSelect from "@/components/frameSelect";
import Camera from "@/components/camera";
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
    <div className="flex flex-col items-center p-4">
      <Camera setVideoSrc={setVideoSrc} />
      <FrameSelect videoSrc={videoSrc} startCamera={startCamera} />
    </div>
  );
}
