'use client';

import { ReactNode, useState } from 'react';
import { CiGrid41 } from 'react-icons/ci';

export default function Drawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="text-center md:hidden">
        <button
          className="mb-2 mr-2 block rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:hidden dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={onOpen}
        >
          <CiGrid41 />
        </button>
      </div>
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-screen bg-black/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div
          className={`fixed left-0 top-0 z-40 h-full w-80 transform overflow-y-auto bg-white p-4 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h5 className="mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
            <svg
              className="mr-2 h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            Info
          </h5>
          <button
            type="button"
            className="absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
