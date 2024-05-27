import BreadCrumb from '@/components/UI/BreadCrumb';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../../../lib/dictionaries';
import ImageGallery from '@/components/products/details/ImageGallery';
import DetailsContent from '@/components/products/details/DetailsContent';
import DescriptionAndReviews from '@/components/products/details/DescriptionAndReviews';
import RelatedProducts from '@/components/products/details/RelatedProducts';
import { getProduct } from '../../../../../../services/product.service';
import { Product as IProduct } from '../../../../../../types/index';
import { Suspense } from 'react';
import { ProductTopArrivalSkeleton } from '@/components/skeleton/ProductsSkeleton';

type Props = {
  params: { lang: Locale; id: string };
};

export default async function ProductDetails({ params: { lang, id } }: Props) {
  const dict = await getDictionary(lang);
  const product = (await getProduct(id)) as IProduct;

  return (
    <>
      <BreadCrumb lang={lang} title={dict.product.breadcrumbTitle} />
      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2">
        <ImageGallery alt={product.name} images={product.images} />
        <DetailsContent lang={lang} product={product} />
      </div>
      <DescriptionAndReviews
        dict={dict}
        description={product.description}
        reviews={JSON.parse(JSON.stringify(product.reviews))}
      />
      <Suspense
        fallback={
          <ProductTopArrivalSkeleton title={dict.product.relatedProducts} />
        }
      >
        <RelatedProducts lang={lang} />
      </Suspense>
    </>
  );
}
