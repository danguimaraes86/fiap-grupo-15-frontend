import { JSX } from 'react';

interface ButtonProps {
  text: string;
  onClick: any;
}

export default function ButtonRegularComponent({
  onClick,
  text,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      style={{ backgroundColor: '#47A138', color: '#CBCBCB' }}
      className="btn btn-dark w-100 text-nowrap p-3"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
