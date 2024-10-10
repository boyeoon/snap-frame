"use client";

import React, { useState } from 'react';
import OneByTwoLayout from "../framelayout/OneByTwoLayout";
import TwoByTwoLayout from "../framelayout/TwoByTwoLayout";

interface FrameListProps {
  videoSrc: MediaStream | null; // MediaStream으로 비디오 소스 설정
}

// 프레임 목록
const frames = [
  { id: 1, label: "1X4" },
  { id: 2, label: "2X2" },
  { id: 3, label: "테스트 3" }
];

export default function FrameList({ videoSrc }: FrameListProps) {
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
        <OneByTwoLayout 
          videoSrc={videoSrc} 
          label={`1X4 ${frames.find(frame => frame.id === selectedFrame)?.label}`} // 선택된 프레임 레이블 표시
        />
      )}
      
      {selectedFrame === 2 && (
        <TwoByTwoLayout 
          videoSrc={videoSrc} 
          label={`2X2 ${frames.find(frame => frame.id === selectedFrame)?.label}`} // 선택된 프레임 레이블 표시
        />
      )}
    </div>
  );
}