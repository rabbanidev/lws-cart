import usePortal from '@/hooks/usePortal';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const container = usePortal();

  if (!container) {
    return null;
  }

  return createPortal(children, container);
}
