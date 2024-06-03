'use client';

import Error from 'next/error';

export default function DashboardError({
  error,
}: {
  error: Error & { message: string };
}) {
  return (
    <div
      className="flex h-[60vh] w-full flex-col items-center justify-center"
      role="alert"
    >
      <p className="mb-4 w-1/2 rounded-lg bg-red-50 p-4 text-base text-primary">
        {error.message}
      </p>
    </div>
  );
}
