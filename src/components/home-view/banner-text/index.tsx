import { JSX } from 'react';

export default function HeroTextComponent({ text }: { text: string }): JSX.Element {
  return (
    <div style={{ color: '#47A138' }} className="col col-lg-6 my-md-auto text-center fs-4 fw-bold">
      {text}
    </div>
  );
}
