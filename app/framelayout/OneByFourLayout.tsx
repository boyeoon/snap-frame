"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import VideoBox from "../components/VideoBox";

interface FrameItemProps {
  videoSrc: MediaStream | null;
  label: string;
  startCamera: (index: number) => Promise<void>; // 카메라 시작 함수에 인덱스 추가
}

export default function OneByTwoLayout({ videoSrc, label, startCamera }: FrameItemProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(4).fill(null)); // 비디오 참조 배열 초기화
  const [cameraStatus, setCameraStatus] = useState<boolean[]>(Array(4).fill(false)); // 각 박스의 카메라 상태 관리
  const [photos, setPhotos] = useState<string[]>(Array(4).fill("")); // 촬영된 사진 저장
  const [isBlackBackground, setIsBlackBackground] = useState<boolean>(true); // 배경색 상태 추가

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef && videoSrc && cameraStatus[index]) {
        videoRef.srcObject = videoSrc; // 스트림 설정
        videoRef.play();
      } else if (videoRef) {
        videoRef.srcObject = null; // 카메라 꺼짐 상태에서 비디오 스트림 해제
      }
    });
  }, [videoSrc, cameraStatus]);

  const handleBoxClick = async (index: number) => {
    if (!cameraStatus[index]) {
      await startCamera(index); // 클릭한 박스의 카메라 시작
      setCameraStatus((prev) => {
        const newStatus = [...prev];
        newStatus[index] = true; // 클릭한 박스의 카메라 상태 업데이트
        return newStatus;
      });
    }
  };

  const handleTakePhoto = (index: number) => {
    const videoRef = videoRefs.current[index];
    if (videoRef && videoRef.videoWidth > 0 && videoRef.videoHeight > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef, 0, 0);
      const photo = canvas.toDataURL("image/png");

      // 촬영된 사진 저장
      setPhotos((prev) => {
        const newPhotos = [...prev];
        newPhotos[index] = photo; // 해당 인덱스에 사진 저장
        return newPhotos;
      });
    } else {
      console.error("비디오가 아직 준비되지 않았습니다."); // 비디오 상태 확인
    }
  };

  const downloadFrame = () => {
    const frameElement = document.getElementById("frame");
    if (frameElement) {
      html2canvas(frameElement, { scale: 4, useCORS: true }).then((canvas) => {
        const finalPhoto = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = finalPhoto;
        link.download = "snap_frame.png";
        link.click(); // 다운로드 시작
      });
    }
  };

  // 현재 날짜 가져오기
  const currentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\./g, ".");

  return (
    <div>
      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setIsBlackBackground(true)}
          className={`py-2 px-4 rounded text-white ${isBlackBackground ? "bg-[#ca3c4a]" : "bg-[#ca3c4a]/60"} shadow-lg hover:shadow-[#ca3c4a]/50`}
        >
          White
        </button>
        <button
          onClick={() => setIsBlackBackground(false)}
          className={`py-2 px-4 rounded text-white ${!isBlackBackground ? "bg-[#ca3c4a]" : "bg-[#ca3c4a]/60"} shadow-lg hover:shadow-[#ca3c4a]/50`}
        >
          Black
        </button>
      </div>
      <div id="frame" className={`px-5 pt-6 pb-5 border border-black ${isBlackBackground ? "bg-white" : "bg-black"}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`${isBlackBackground ? "text-black" : "text-white"} text-lg`}>
            SNAP FRAME
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[...Array(4)].map((_, index) => (
            <VideoBox
              key={index}
              index={index}
              videoRef={(el) => { videoRefs.current[index] = el; }}
              label={label}
              onClick={() => handleBoxClick(index)}
              onTakePhoto={handleTakePhoto}
              photo={photos[index]}
              width="w-72"
              height="h-60"
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className={`${isBlackBackground ? "text-black" : "text-white"} text-xs`}>
            {currentDate}
          </span>
        </div>
      </div>
      <button 
        onClick={downloadFrame} 
        className="mt-4 bg-[#ca3c4a] text-white py-2 px-4 rounded hover:bg-[#ca3c4a]/60 shadow-lg hover:shadow-[#ca3c4a]/50"
      >
        Download
      </button>
    </div>
  );
}