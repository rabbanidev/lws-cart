'use client';

export default function ErrorMessage({ message }: { message: string }) {
  if (!message) {
    return null;
  }
  return <span className="text-sm text-primary">{message}</span>;
}
