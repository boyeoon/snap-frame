"use client";

import React, { useRef, useState } from 'react';

interface CameraProps {
  setVideoSrc: (src: MediaStream | null) => void; // 비디오 소스를 설정하는 함수
}

export default function Camera({ setVideoSrc }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoSrc(stream); // MediaStream을 부모 컴포넌트로 전달
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // 비디오 요소에 스트림 설정
        videoRef.current.play(); // 비디오 재생
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("카메라를 켜는 데 실패했습니다:", error);
      alert("카메라를 켜는 데 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {isCameraOn ? (
        <video ref={videoRef} className="hidden" /> // 비디오 요소는 숨김
      ) : (
        <button 
          onClick={startCamera} 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          카메라 켜기
        </button>
      )}
    </div>
  );
}
