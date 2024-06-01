'use client';

import { IoReload } from 'react-icons/io5';

type Props = {
  reset: () => void;
};

export default function RootError({ reset }: Props) {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center"
      role="alert"
    >
      <div className="flex w-full flex-col items-center justify-center text-center lg:px-2 xl:px-0">
        <p className="text-7xl font-bold tracking-wider text-gray-300 md:text-8xl lg:text-9xl">
          500
        </p>
        <p className="mt-2 text-4xl font-bold tracking-wider text-gray-300 md:text-5xl lg:text-6xl">
          Internal Server Error
        </p>
        <p className="my-8 text-base text-gray-500 md:text-xl lg:text-2xl">
          We apologise and are fixing the problem.Please try again at a later
          stage.
        </p>

        <button
          type="button"
          className="flex items-center gap-2 rounded border border-primary bg-primary px-8 py-2 font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
          onClick={() => reset()}
        >
          <IoReload />
          Try Again
        </button>
      </div>
    </div>
  );
}
