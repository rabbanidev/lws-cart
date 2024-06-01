import Link from 'next/link';

export const metadata = {
  title: '404 - Not Found',
};

export default function RootNotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center text-center lg:px-2 xl:px-0">
        <p className="text-7xl font-bold tracking-wider text-gray-300 md:text-8xl lg:text-9xl">
          404
        </p>
        <p className="mt-2 text-4xl font-bold tracking-wider text-gray-300 md:text-5xl lg:text-6xl">
          Page Not Found
        </p>
        <p className="my-12 text-lg text-gray-500 md:text-xl lg:text-2xl">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
