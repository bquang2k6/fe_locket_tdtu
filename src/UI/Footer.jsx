import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur-md py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} · Powered by{' '}
          <span className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Locket Wan
          </span>
        </p>
      </div>
    </footer>
  );
}