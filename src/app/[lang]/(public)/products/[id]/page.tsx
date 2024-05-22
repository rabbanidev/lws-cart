import BreadCrumb from '@/components/UI/BreadCrumb';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../../lib/dictionaries';
import ImageGallery from '@/components/products/details/ImageGallery';
import DetailsContent from '@/components/products/details/DetailsContent';
import DescriptionAndReviews from '@/components/products/details/DescriptionAndReviews';
import RelatedProducts from '@/components/products/details/RelatedProducts';

type Props = {
  params: { lang: Locale };
};

export default async function ProductDetails({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <>
      <BreadCrumb lang={lang} title={dict.product.breadcrumbTitle} />
      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        <ImageGallery />
        <DetailsContent lang={lang} />
      </div>
      <DescriptionAndReviews dict={dict} />
      <RelatedProducts lang={lang} />
    </>
  );
}
