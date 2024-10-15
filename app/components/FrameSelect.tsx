"use client";

import React, { useState } from 'react';
import OneByFourLayout from "../framelayout/OneByFourLayout";
import TwoByTwoLayout from "../framelayout/TwoByTwoLayout";
import ThreeByOneLayout from "../framelayout/ThreeByOneLayout"

interface FrameListProps {
  videoSrc: MediaStream | null; 
  startCamera: () => Promise<void>; // 카메라 시작 함수 추가
}

const frames = [
  { id: 1, label: "one by four" },
  { id: 2, label: "two by two" },
  { id: 3, label: "three by one" }
];

export default function FrameList({ videoSrc, startCamera }: FrameListProps) {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <select 
        className="mb-8 p-2 outline-none border rounded-lg text-white bg-[#ca3c4a]/60"
        onChange={(e) => setSelectedFrame(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>Select Frame</option>
        {frames.map(({ id, label }) => (
          <option key={id} value={id}>{label}</option>
        ))}
      </select>

      {selectedFrame === 1 && (
        <OneByFourLayout 
          videoSrc={videoSrc} 
          // label={`${frames.find(frame => frame.id === selectedFrame)?.label}`} 
          label={` `}
          startCamera={startCamera} // 카메라 시작 함수 전달
        />
      )}
      
      {selectedFrame === 2 && (
        <TwoByTwoLayout 
          videoSrc={videoSrc} 
          label={` `}
          startCamera={startCamera}
        />
      )}

      {selectedFrame === 3 && (
        <ThreeByOneLayout 
          videoSrc={videoSrc} 
          label={` `}
          startCamera={startCamera}
        />
      )}
    </div>
  );
}
