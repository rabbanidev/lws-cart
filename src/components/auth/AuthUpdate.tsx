/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

function deepEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export default function AuthUpdate({ session }: { session: any }) {
  const { update } = useSession();
  const [prevSession, setPrevSession] = useState(session);

  useEffect(() => {
    if (!deepEqual(prevSession, session)) {
      update({
        user: session.user,
        backendTokens: session.backendTokens,
      });
    }
  }, [session]);

  return null;
}
