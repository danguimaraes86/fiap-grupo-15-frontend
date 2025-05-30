import { JSX } from 'react';

export default function HeroBannerComponent({
  imageSrc,
  altText,
}: {
  imageSrc: string;
  altText: string;
}): JSX.Element {
  return <img className="col col-lg-6 img-fluid" src={imageSrc} alt={altText} />;
}
