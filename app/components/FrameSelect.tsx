"use client";

import React, { useState } from 'react';
import OneByFourLayout from "../framelayout/OneByFourLayout";
import TwoByTwoLayout from "../framelayout/TwoByTwoLayout";

interface FrameListProps {
  videoSrc: MediaStream | null; 
  startCamera: () => Promise<void>; // 카메라 시작 함수 추가
}

const frames = [
  { id: 1, label: "1X4" },
  { id: 2, label: "2X2" },
  { id: 3, label: "테스트 3" }
];

export default function FrameList({ videoSrc, startCamera }: FrameListProps) {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <select 
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSelectedFrame(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>프레임 선택하기</option>
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
          // label={`${frames.find(frame => frame.id === selectedFrame)?.label} 프레임입니다.`} 
          label={` `}
          startCamera={startCamera} // 카메라 시작 함수 전달
        />
      )}
    </div>
  );
}
