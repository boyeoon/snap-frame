"use client";

import React, { useRef } from 'react';

interface CameraProps {
  setVideoSrc: (src: MediaStream | null) => void; 
}

export default function Camera({ setVideoSrc }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setVideoSrc(stream);
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.play();
  //     }
  //   } catch (error) {
  //     console.error("카메라를 켜는 데 실패했습니다:", error);
  //     alert("카메라를 켜는 데 실패했습니다.");
  //   }
  // };

  return (
    <div className="flex flex-col items-center mt-4">
      {/* <button onClick={startCamera} className="bg-blue-500 text-white py-2 px-4 rounded">
        카메라 켜기
      </button> */}
      <video ref={videoRef} className="hidden" />
    </div>
  );
}
