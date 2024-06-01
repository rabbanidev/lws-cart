import Loading from '@/components/UI/Loading';

export default function RootLoading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Loading />
      <p className="mt-4 animate-pulse text-4xl font-bold tracking-wider text-gray-300 md:text-5xl lg:text-6xl">
        Loading...
      </p>
    </div>
  );
}
