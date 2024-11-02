"use client";

import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import VideoBox from "@/components/videoBox";

interface FrameItemProps {
  videoSrc: MediaStream | null;
  label: string;
  startCamera: (index: number) => Promise<void>;
}

export default function OneByTwoLayout({
  videoSrc,
  label,
  startCamera,
}: FrameItemProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(4).fill(null)); // 비디오 요소에 대한 참조 배열 초기화
  const [cameraStatus, setCameraStatus] = useState<boolean[]>(
    Array(4).fill(false)
  ); // 각 비디오 박스의 카메라 상태(켜짐/꺼짐)를 관리
  const [photos, setPhotos] = useState<string[]>(Array(4).fill("")); // 촬영된 사진을 저장
  const [isBlackBackground, setIsBlackBackground] = useState<boolean>(true); // 배경색 상태를 관리
  const [flash, setFlash] = useState<boolean>(false); // 플래시 사용 여부를 관리
  const [countdown, setCountdown] = useState<number | null>(null); // 카운트다운 타이머를 관리

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
    setCountdown(3); // 카운트다운 시작

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setFlash(true); // 플래시 효과 켜기
          setTimeout(() => {
            capturePhoto(index); // 플래시가 켜진 후 사진 찍기
            setFlash(false); // 플래시 끄기
          }, 300); // 300ms 후에 사진 찍기
          return null; // 카운트다운 종료
        }
        return prev ? prev - 1 : null; // 카운트다운 감소
      });
    }, 1000); // 1초마다 감소
  };

  const capturePhoto = (index: number) => {
    const videoRef = videoRefs.current[index];
    if (videoRef && videoRef.videoWidth > 0 && videoRef.videoHeight > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef, 0, 0);
      const photo = canvas.toDataURL("image/png");

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
  const currentDate = new Date()
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ".");

  return (
    <div className="relative">
      <div className="flex mb-4 space-x-4">
        <button
          onClick={() => setIsBlackBackground(true)}
          className={`py-2 px-4 rounded text-white ${
            isBlackBackground ? "bg-[#ca3c4a]" : "bg-[#ca3c4a]/60"
          } shadow-lg hover:shadow-[#ca3c4a]/50`}
        >
          White
        </button>
        <button
          onClick={() => setIsBlackBackground(false)}
          className={`py-2 px-4 rounded text-white ${
            !isBlackBackground ? "bg-[#ca3c4a]" : "bg-[#ca3c4a]/60"
          } shadow-lg hover:shadow-[#ca3c4a]/50`}
        >
          Black
        </button>
      </div>
      <div
        id="frame"
        className={`px-5 pt-6 pb-5 border border-black ${
          isBlackBackground ? "bg-white" : "bg-black"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className={`${
              isBlackBackground ? "text-black" : "text-white"
            } text-lg`}
          >
            SNAP FRAME
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, index) => (
            <VideoBox
              key={index}
              index={index}
              videoRef={(el) => {
                videoRefs.current[index] = el;
              }}
              label={label}
              onClick={() => handleBoxClick(index)}
              onTakePhoto={handleTakePhoto}
              photo={photos[index]}
              width="w-64"
              height="h-80"
            />
          ))}
        </div>

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center text-5xl text-[#ca3c4a]">
            <div className="p-8 bg-white opacity-90 rounded-2xl drop-shadow-lg">
              {countdown}
            </div>
          </div>
        )}

        {flash && (
          <div className="fixed inset-0 z-40 transition-opacity duration-300 bg-white" />
        )}

        <div className="flex justify-center mt-4">
          <span
            className={`${
              isBlackBackground ? "text-black" : "text-white"
            } text-xs`}
          >
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
