import { Locale } from '@/i18n.config';
import { Dictionary } from '../../../../../types/index';
import { getDictionary } from '../../../../../lib/dictionaries';
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import { Suspense } from 'react';

export default async function UserDashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dict: Dictionary = await getDictionary(params.lang);

  return (
    <div className="container gap-6 pb-16 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <Suspense>
          <DashboardSidebar lang={params.lang} dict={dict} />
        </Suspense>
        <div className="col-span-1 mt-8 border-l border-gray-200 lg:col-span-10 lg:mt-0 lg:px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
