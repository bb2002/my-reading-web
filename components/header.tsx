"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--background)] shadow">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" passHref></Link>
          {/* 모바일 메뉴 토글 버튼 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="max-w-xl mx-auto px-4 pt-2 pb-3 space-y-1">
          <Link
            className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
            href="/product"
          >
            Product
          </Link>
        </div>
      )}
    </header>
  );
}
