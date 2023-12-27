import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-purple-700 p-2 text-white">
      <div className="flex">
        <div className="flex gap-2 mr-2">
          <Link href="/" className="font-bold">
            חשבון קליל
          </Link>
          <Image src="/archer.svg" alt="לוגו" width={18} height={18} />
        </div>
        <ul className="flex mr-11 gap-3">
          <li>
            <Link href="/levels">שלבים</Link>
          </li>
          <li>
            <Link href="/story">סיפור רקע</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
