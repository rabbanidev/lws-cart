'use client';

import { createOrRemoveWishlistItemAction } from '@/actions/wishlist';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../UI/Loading';

export default function AutoWishlistItemAdder() {
  const params = useSearchParams();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && params.get('id')) {
      const startFetching = async () => {
        try {
          await createOrRemoveWishlistItemAction(params.get('id') as string);
        } catch (error) {
          throw error;
        } finally {
          router.push('/wishlist');
          setInitialized(true);
        }
      };

      startFetching();
    }
  }, [initialized, params, router]);

  return (
    <div className="bg-backdrop fixed inset-0 flex min-h-[65vh] w-full items-center justify-center">
      <Loading />
    </div>
  );
}
