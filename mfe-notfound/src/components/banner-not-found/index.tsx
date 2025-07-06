import { JSX } from 'react';

export default function BannerNotFoundComponent({
  imageSrc,
  altText,
}: {
  imageSrc: string;
  altText: string;
}): JSX.Element {
  return <img className="w-50 img-fluid" src={imageSrc} alt={altText} />;
}
