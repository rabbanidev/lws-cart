import { Dictionary } from '../../../types';

type Props = {
  dict: Dictionary;
};

export default function SocialLogin({ dict }: Props) {
  return (
    <>
      <div className="relative mt-6 flex justify-center">
        <div className="relative z-10 bg-white px-3 uppercase text-gray-600">
          {dict.auth.or}
        </div>
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
      </div>
      <div className="mt-4 flex gap-4">
        <a
          href="#"
          className="w-1/2 rounded bg-blue-800 py-2 text-center font-roboto text-sm font-medium uppercase text-white hover:bg-blue-700"
        >
          {dict.auth.social.fb}
        </a>
        <a
          href="#"
          className="w-1/2 rounded bg-red-600 py-2 text-center font-roboto text-sm font-medium uppercase text-white hover:bg-red-500"
        >
          {dict.auth.social.google}
        </a>
      </div>
    </>
  );
}
