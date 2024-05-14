import Image from 'next/image';
import Link from 'next/link';
import { IoMenuOutline } from 'react-icons/io5';

export default function Navbar() {
  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="group relative hidden cursor-pointer items-center bg-primary px-8 py-4 md:flex">
          <span className="text-white">
            <IoMenuOutline size={24} />
          </span>
          <span className="ml-2 capitalize text-white">All Categories</span>

          {/*  dropdown */}
          <div className="invisible absolute left-0 top-full w-[300px] divide-y divide-dashed divide-gray-300 bg-white py-3 opacity-0 shadow-md transition duration-300 group-hover:visible group-hover:opacity-100">
            <Link
              href="/categories/category"
              className="flex items-center px-6 py-3 transition hover:bg-gray-100"
            >
              <Image
                src="/icons/sofa.svg"
                alt="sofa"
                className="h-5 w-5 object-contain"
                width={20}
                height={20}
              />
              <span className="ml-6 text-sm text-gray-600">Sofa</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-grow items-center justify-between py-5 md:pl-12">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 transition hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 transition hover:text-white"
            >
              Shop
            </Link>
            <Link
              href="/about-us"
              className="text-gray-200 transition hover:text-white"
            >
              About us
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-200 transition hover:text-white"
            >
              Contact us
            </Link>
          </div>
          <Link
            href="/login"
            className="text-gray-200 transition hover:text-white"
          >
            Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
