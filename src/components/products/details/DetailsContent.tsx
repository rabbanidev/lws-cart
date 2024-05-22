import Rating from '@/components/shared/Rating';
import DetailsAction from './DetailsAction';
import SocialShare from './SocialShare';
import { Locale } from '@/i18n.config';
import { getDictionary } from '../../../../lib/dictionaries';
import { Dictionary } from '../../../../types';

type Props = {
  lang: Locale;
};

export default async function DetailsContent({ lang }: Props) {
  const dict: Dictionary = await getDictionary(lang);

  return (
    <div>
      <h2 className="mb-2 text-3xl font-medium uppercase">
        Italian L Shape Sofa
      </h2>
      <div className="mb-4 flex items-center">
        <Rating rating={3} />
        <div className="ml-3 text-xs text-gray-500">
          (150 {dict.product.reviews})
        </div>
      </div>
      <div className="space-y-2">
        <p className="space-x-2 font-semibold text-gray-800">
          <span>{dict.product.availability}: </span>
          <span className="text-green-600">In Stock</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.brand}:{' '}
          </span>
          <span className="text-gray-600">Apex</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.category}:{' '}
          </span>
          <span className="text-gray-600">Sofa</span>
        </p>
        <p className="space-x-2">
          <span className="font-semibold text-gray-800">
            {dict.product.sku}:{' '}
          </span>
          <span className="text-gray-600">BE45VGRT</span>
        </p>
      </div>
      <div className="mb-1 mt-4 flex items-baseline space-x-2 font-roboto">
        <p className="text-xl font-semibold text-primary">$45.00</p>
        <p className="text-base text-gray-400 line-through">$55.00</p>
      </div>

      <p className="mt-4 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum
        reprehenderit dolore vel mollitia optio consequatur hic asperiores
        inventore suscipit, velit consequuntur, voluptate doloremque iure
        necessitatibus adipisci magnam porro.
      </p>

      <DetailsAction qtyTitle={dict.product.qty} />
      <SocialShare />
    </div>
  );
}
