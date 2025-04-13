'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkAdminStatus } from '@/lib/admin/adminStatus';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkAdminStatus().then((status) => {
      setIsAdmin(status);
    }
    );
  }, []);

  const handleLogout = async () => {
    await axios.delete('/api/admin/auth')
      .then(() => {
        window.location.href = '/';
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="rounded-b-2xl bg-amber-50 p-4 px-7 w-full absolute top-0 left-0 z-10">
      <div className="max-w-[100%] mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              width={70}
              height={70}
              src="/images/msa_logo1.png"
              alt="msa logo"
              className="max-w-[40px] max-h-[40px] sm:max-w-[70px] sm:max-h-[70px]"
            />
          </Link>
        </div>

        {/* desktop navbar options */}
        <ul className="hidden sm:flex space-x-8 pr-8">
          <li><a href="/programs" className="text-black hover:text-gray-900 text-lg">Programs</a></li>
          <li><a href="/about" className="text-black hover:text-gray-900 text-lg">About</a></li>
          {isAdmin &&
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 rounded hover:bg-red-600 text-lg cursor-pointer"
            >
              Logout
            </button>
          }
        </ul>

        {/* mobile navbar options */}
        <div className="flex sm:hidden items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
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

          {/* insert navbar links in opening menu */}
          <div className={`absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4 ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="space-y-4">
              <li><a href="/programs" className="text-black hover:text-gray-900 text-lg">Programs</a></li>
              <li><a href="/about" className="text-black hover:text-gray-900 text-lg">About</a></li>
              {isAdmin &&
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 rounded hover:bg-red-600 text-lg cursor-pointer"
                >
                  Logout
                </button>
              }
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;