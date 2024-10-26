import React from "react";

interface VideoBoxProps {
  index: number;
  videoRef: React.RefCallback<HTMLVideoElement | null>;
  label: string;
  onClick: () => void;
  onTakePhoto: (index: number) => void;
  photo: string;
  width: string;
  height: string;
}

export default function VideoBox({ index, videoRef, label, onClick, onTakePhoto, photo, width, height }: VideoBoxProps) {
  return (
    <div
      className={`relative ${width} ${height} flex items-center justify-center bg-[#ffd3cd] hover:bg-[#FEE4E1] cursor-pointer`}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        autoPlay
        className="absolute inset-0 object-cover w-full h-full"
      />
      <p className="z-10">{label}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 클릭 이벤트 전파 방지
          onTakePhoto(index); // 사진 찍기
        }}
        className="absolute bottom-2 right-2 bg-[#ca3c4a] hover:bg-[#ca3c4a]/60 shadow-lg hover:shadow-[#ca3c4a]/50 text-white py-1 px-2 rounded"
      >
        <svg fill="#ffffff" height="1rem" width="1rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 487 487">
          <g>
            <g>
              <path d="M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z
                M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9
                v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z
                M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z
                M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z"/>
            </g>
          </g>
        </svg>
      </button>
      {photo && ( // 촬영된 사진이 있을 경우 미리보기
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={photo} alt={`Captured ${index}`} className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  );
}