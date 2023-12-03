import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-purple-700 p-2 text-white">
      <div className="flex gap-2">
        <Link href="/" className="font-bold">
          חשבון קליל
        </Link>
        <Image src="/archer.svg" width={18} height={18} />
      </div>
    </nav>
  );
}
