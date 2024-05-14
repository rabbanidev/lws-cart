import Image from 'next/image';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import { FaShoppingBag } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';

export default function TopNavbar() {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="w-32"
            width={128}
            height={40}
          />
        </Link>

        <div className="relative flex w-full max-w-xl">
          <span className="absolute left-4 top-3.5 text-lg text-gray-400">
            <IoSearch size={20} />
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="border-primary hidden w-full rounded-l-md border border-r-0 py-3 pl-12 pr-3 focus:outline-none md:flex"
            placeholder="search"
          />
          <button className="bg-primary border-primary hover:text-primary  hidden rounded-r-md border px-8 text-white transition hover:bg-transparent md:block">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/wishlist"
            className="hover:text-primary relative text-center text-gray-700 transition"
          >
            <div className="mx-auto text-2xl">
              <FaRegHeart />
            </div>
            <div className="mt-1 text-xs leading-3">Wishlist</div>
            <div className="bg-primary absolute -top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
              8
            </div>
          </Link>
          <Link
            href="/cart"
            className="hover:text-primary relative text-center text-gray-700 transition"
          >
            <div className="text-2xl">
              <FaShoppingBag />
            </div>
            <div className="mt-1 text-xs leading-3">Cart</div>
            <div className="bg-primary absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
              2
            </div>
          </Link>
          <Link
            href="/account"
            className="hover:text-primary relative flex flex-col items-center text-center text-gray-700 transition"
          >
            <div className="text-2xl">
              <FaRegUser />
            </div>
            <div className="mt-1 text-xs leading-3">Account</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
