"use client";

import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

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
      html2canvas(frameElement, { scale: 4 }).then((canvas) => {
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
  }).replace(/\./g, '.');

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setIsBlackBackground(true)}
          className={`py-2 px-4 rounded ${isBlackBackground ? 'bg-gray-700' : 'bg-gray-500'}`}
        >
          Black
        </button>
        <button
          onClick={() => setIsBlackBackground(false)}
          className={`py-2 px-4 rounded ${!isBlackBackground ? 'bg-gray-700' : 'bg-gray-500'}`}
        >
          White
        </button>
      </div>
      <div id="frame" className={`px-5 pt-6 pb-5 border border-black ${isBlackBackground ? 'bg-black' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-3">
          <span className={`${isBlackBackground ? 'text-white' : 'text-black'} text-lg font-bold`}>
            SNAP FRAME
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="relative w-72 h-60 flex items-center justify-center bg-orange-100 cursor-pointer"
              onClick={() => handleBoxClick(index)} // 박스 클릭 시 카메라 시작
            >
              <video
                ref={(el) => { videoRefs.current[index] = el; }} // ref 설정
                autoPlay
                className="absolute inset-0 w-full h-full object-cover"
              />
              <p className="z-10">{label}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지
                  handleTakePhoto(index); // 사진 찍기
                }}
                className="absolute bottom-2 right-2 bg-blue-500 text-white py-1 px-2 rounded"
              >
                take a pic
              </button>
              {photos[index] && ( // 촬영된 사진이 있을 경우 미리보기
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src={photos[index]} alt={`Captured ${index}`} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <span className={`${isBlackBackground ? 'text-white' : 'text-black'} text-xs`}>
            {currentDate}
          </span>
        </div>
      </div>
      <button 
        onClick={downloadFrame} 
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Download
      </button>
    </div>
  );
}
