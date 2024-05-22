export async function ProductTopArrivalSkeleton({ title }: { title: string }) {
  return (
    <div className="container pb-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded bg-white shadow">
      <div className="relative">
        <div className="h-56 w-full bg-gray-300"></div>
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black bg-opacity-40 opacity-0 transition">
          <div className="h-8 w-9 rounded-full bg-gray-400"></div>
          <div className="h-8 w-9 rounded-full bg-gray-400"></div>
        </div>
      </div>
      <div className="px-4 pb-3 pt-4">
        <div className="mb-2 h-6 w-3/4 bg-gray-300"></div>
        <div className="mb-1 flex items-baseline space-x-2">
          <div className="h-6 w-1/4 bg-gray-300"></div>
          <div className="h-4 w-1/6 bg-gray-200"></div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
            <div className="h-4 w-4 rounded bg-gray-300"></div>
          </div>
          <div className="ml-3 h-4 w-8 bg-gray-200"></div>
        </div>
      </div>
      <div className="block w-full rounded-b bg-gray-300 py-3 text-center"></div>
    </div>
  );
}
