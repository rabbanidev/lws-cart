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
import { Metadata } from 'next';

type Props = {
  params: { lang: Locale; id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const product = (await getProduct(id)) as IProduct;

  if (!product) {
    return {
      title: 'Product not found!',
    };
  }

  return {
    title: product.name,
    description: product.description && product.description.slice(0, 100),
    category: product.categories.map((category) => category.name).join('-'),

    openGraph: {
      title: product.name,
      description: product.description && product.description.slice(0, 100),
      images: [
        {
          url:
            `https://lws-cart.vercel.app/api/details/${id}` ||
            product.images[0],
          width: 1200,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

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
        <RelatedProducts lang={lang} id={id} />
      </Suspense>
    </>
  );
}
