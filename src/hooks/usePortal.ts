import { useEffect, useState } from 'react';

export default function usePortal(): HTMLDivElement | null {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement('div');
    setContainer(div);
    const parent = document.getElementById('portal-root') || document.body;
    parent.appendChild(div);

    // Cleanup function
    return () => {
      if (parent.contains(div)) {
        parent.removeChild(div);
      }
    };
  }, []);

  return container;
}
