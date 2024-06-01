import { ShopProductLoading } from '@/components/skeleton/ProductsSkeleton';

export default function ShopPageLoading() {
  return (
    <div className="container mt-10 grid grid-cols-2 items-start gap-6 pb-16 pt-4 md:grid-cols-4">
      <div className="col-span-1 hidden overflow-hidden rounded bg-white px-4 pb-6 shadow md:block">
        <div className="space-y-5 divide-y divide-gray-200">
          <div className="space-y-2">
            <div className="flex animate-pulse items-center">
              <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
              <div className="ml-3 h-4 w-20 rounded bg-gray-300"></div>
              <div className="ml-auto h-4 w-5 rounded bg-gray-300"></div>
            </div>
            <div className="flex animate-pulse items-center">
              <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
              <div className="ml-3 h-4 w-20 rounded bg-gray-300"></div>
              <div className="ml-auto h-4 w-5 rounded bg-gray-300"></div>
            </div>
            <div className="flex animate-pulse items-center">
              <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
              <div className="ml-3 h-4 w-20 rounded bg-gray-300"></div>
              <div className="ml-auto h-4 w-5 rounded bg-gray-300"></div>
            </div>
            <div className="flex animate-pulse items-center">
              <div className="h-4 w-4 rounded-sm bg-gray-300"></div>
              <div className="ml-3 h-4 w-20 rounded bg-gray-300"></div>
              <div className="ml-auto h-4 w-5 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="mt-4 flex animate-pulse items-center">
            <div className="h-8 w-full rounded bg-gray-300 shadow-sm"></div>
            <span className="mx-3 text-gray-500">-</span>
            <div className="h-8 w-full rounded bg-gray-300 shadow-sm"></div>
          </div>
          <div className="flex animate-pulse items-center gap-2">
            <div className="h-6 w-6 rounded-sm bg-gray-300 shadow-sm"></div>
            <div className="h-6 w-6 rounded-sm bg-gray-300 shadow-sm"></div>
            <div className="h-6 w-6 rounded-sm bg-gray-300 shadow-sm"></div>
            <div className="h-6 w-6 rounded-sm bg-gray-300 shadow-sm"></div>
            <div className="h-6 w-6 rounded-sm bg-gray-300 shadow-sm"></div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <ShopProductLoading />
      </div>
    </div>
  );
}
