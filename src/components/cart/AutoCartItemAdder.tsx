'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../UI/Loading';
import { addToCartAction } from '@/actions/cart';

export default function AutoCartItemAdder() {
  const params = useSearchParams();
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);

  const id = params.get('id');
  const qty = Number(params.get('qty'));
  const color = params.get('color');
  const size = params.get('size');

  useEffect(() => {
    if (!initialized && id && qty && color && size) {
      const startFetching = async () => {
        try {
          await addToCartAction(id, qty, color, size);
        } catch (error) {
          throw error;
        } finally {
          router.push('/cart');
          setInitialized(true);
        }
      };

      startFetching();
    }
  }, [color, id, initialized, params, qty, router, size]);

  return (
    <div className="bg-backdrop fixed inset-0 flex min-h-[65vh] w-full items-center justify-center">
      <Loading />
    </div>
  );
}
