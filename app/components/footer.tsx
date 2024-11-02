import Link from "next/link";

export default function Footer() {
  return (
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
  );
}
