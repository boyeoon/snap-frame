"use client";

import FrameList from './FrameSelect';
import Camera from './Camera';
import { useState } from 'react';

export default function LifePhoto() {
  const [videoSrc, setVideoSrc] = useState<MediaStream | null>(null); // MediaStream으로 비디오 소스 상태 설정

  return (
    <div className="flex flex-col items-center p-4">
      <Camera setVideoSrc={setVideoSrc} />
      <FrameList videoSrc={videoSrc} />
    </div>
  );
}