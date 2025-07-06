import { JSX } from 'react';

interface ButtonProps {
  text: string;
  onClick: any;
}

export default function ButtonOutlineComponent({
  onClick,
  text,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      style={{ borderColor: '#47A138', color: '#47A138' }}
      className="btn w-100 text-nowrap p-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
