import LifePhoto from "@/components/lifePhoto";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center font-cafeMeongi">
      <h1 className="text-7xl tracking-[.2rem] drop-shadow-md mt-20 mb-4 text-[#cb6872]">
        SNAPFRAME
      </h1>
      <LifePhoto />
      <Footer />
    </div>
  );
}
