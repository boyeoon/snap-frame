import LifePhoto from "./components/LifePhoto";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl font-normal tracking-[.2rem] drop-shadow-md mt-20 mb-4 text-[#cb6872]">SNAPFRAME</h1>
      <LifePhoto />
    </div>
  );
}
