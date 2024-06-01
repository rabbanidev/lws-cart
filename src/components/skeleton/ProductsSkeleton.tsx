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

export function ProductDetailsSkeleton() {
  return (
    <div className="container mt-10 grid animate-pulse grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <div className="h-64 w-full rounded bg-gray-300"></div>
        <div className="mt-4 grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-20 w-full rounded bg-gray-300"></div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 h-8 w-3/4 rounded bg-gray-300"></div>
        <div className="mb-4 flex items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-4 w-4 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
          <div className="ml-3 h-4 w-16 rounded bg-gray-300"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          <div className="h-4 w-1/3 rounded bg-gray-300"></div>
          <div className="h-4 w-1/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/5 rounded bg-gray-300"></div>
        </div>
        <div className="mb-1 mt-4 flex items-baseline space-x-2 font-roboto">
          <div className="h-6 w-16 rounded bg-gray-300"></div>
          <div className="h-6 w-12 rounded bg-gray-300"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="mt-2 flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
            <div className="h-8 w-8 rounded bg-gray-300"></div>
            <div className="h-8 w-8 rounded bg-gray-300"></div>
            <div className="h-8 w-8 rounded bg-gray-300"></div>
          </div>
        </div>
        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
          <div className="h-10 w-32 rounded bg-gray-300"></div>
          <div className="h-10 w-32 rounded bg-gray-300"></div>
        </div>
        <div className="mt-4 flex gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export const ShopProductLoading = () => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <ProductCardSkeleton key={item} />
      ))}
    </div>
  );
};
