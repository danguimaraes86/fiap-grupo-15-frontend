import { JSX } from 'react';

interface ButtonProps {
  text: string;
}

export default function ButtonRegularComponent({
  text,
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      style={{ backgroundColor: '#47A138', color: '#CBCBCB' }}
      className="btn btn-dark w-100"
    >
      {text}
    </button>
  );
}
