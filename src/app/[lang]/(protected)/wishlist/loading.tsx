export default function WishlistPageLoading() {
  return (
    <div className="container mt-10 gap-6 pb-16 pt-4">
      <div className="mx-auto max-w-6xl space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex animate-pulse items-center justify-between gap-6 rounded border border-gray-200 p-4"
          >
            <div className="h-28 w-28 rounded bg-gray-300"></div>
            <div className="w-1/3 space-y-3">
              <div className="h-6 rounded bg-gray-300"></div>
              <div className="h-4 rounded bg-gray-300"></div>
              <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            </div>
            <div className="h-6 w-16 rounded bg-gray-300"></div>
            <div className="h-6 w-32 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
