import LifePhoto from "./components/LifePhoto";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-7xl font-normal tracking-[.2rem] drop-shadow-md mt-20 mb-4 text-[#cb6872]">SNAPFRAME</h1>
      <LifePhoto />
      <footer className="bottom-0 left-0 w-full mt-2 mb-6 text-center">
        <p>&copy; {new Date().getFullYear()}. Snap Frame. All rights reserved.</p>
        <div>
          <Link 
            href={"https://github.com/boyeoon/snap-frame"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#cb6872]"
          >
            GitHub
          </Link>
        </div>
      </footer>
    </div>
  );
}
