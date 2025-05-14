import { JSX } from 'react';

interface ButtonProps {
  text: string;
}

export default function ButtonOutlineComponent({
  text,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      style={{ borderColor: '#47A138', color: '#47A138' }}
      className="btn w-100"
    >
      {text}
    </button>
  );
}
