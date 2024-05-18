import { Locale } from '@/i18n.config';
import { useFormStatus } from 'react-dom';

type Props = {
  lang: Locale;
  [key: string]: string;
};

export default function SubmitButton({
  lang,
  className,
  children,
  ...others
}: Props) {
  const { pending } = useFormStatus();

  // decide what to render
  let content;
  if (lang === 'en' && pending) {
    console.log('yes');
    content = 'Loading...';
  } else if (lang === 'bn' && pending) {
    content = 'লোডিং...';
  } else {
    content = children;
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} ${pending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      {...others}
    >
      {content}
    </button>
  );
}
