import Image from "next/image";

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

export default function VideoBox({
  index,
  videoRef,
  label,
  onClick,
  onTakePhoto,
  photo,
  width,
  height,
}: VideoBoxProps) {
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
        <Image src={"/camera.svg"} alt="camera" width={16} height={16} />
      </button>
      {photo && ( // 촬영된 사진이 있을 경우 미리보기
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={photo}
            alt={`Captured ${index}`}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
