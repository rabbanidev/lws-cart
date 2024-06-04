/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Portal from './Portal';

type Props = {
  show: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  show = false,
  size = 'xs',
  onClose,
  children,
}: Props) {
  let sizeStyle;
  if (size === 'xs') {
    sizeStyle = 'max-w-[420px]';
  } else if (size === 'sm') {
    sizeStyle = 'sm:max-w-[600px]';
  } else if (size === 'md') {
    sizeStyle = 'md:max-w-[768px]';
  } else if (size === 'lg') {
    sizeStyle = 'lg:max-w-[984px]';
  }

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  if (!show) {
    return null;
  }

  return (
    <Portal>
      <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/60 backdrop-blur-sm">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={`absolute max-h-[90vh] w-full overflow-auto px-4 ${sizeStyle}`}
          >
            <div
              className="cursor-default overflow-hidden rounded-lg bg-white text-black shadow-md"
              onClick={stopPropagation}
            >
              {children}
            </div>

            <button
              type="button"
              className="absolute right-4 top-0 inline-flex items-center rounded-lg bg-gray-600 p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
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
          </div>
        </div>
      </div>
    </Portal>
  );
}
