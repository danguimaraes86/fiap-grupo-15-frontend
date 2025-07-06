import type { JSX } from "react";

interface CardProps {
  icon_src: string;
  alt_text: string;
  title: string;
  description: string;
}

export default function CardVantagemComponent({
  icon_src,
  alt_text,
  title,
  description,
}: CardProps): JSX.Element {
  return (
    <div className="col-12 col-md-6 col-lg">
      <div className="row gx-0 gy-3">
        <div className="col-12">
          <img
            style={{
              width: "73px",
              height: "56px",
            }}
            src={icon_src}
            alt={alt_text}
          />
        </div>
        <div className="col-12">{title}</div>
        <div style={{ color: "#CBCBCB" }} className="col-12">
          {description}
        </div>
      </div>
    </div>
  );
}
