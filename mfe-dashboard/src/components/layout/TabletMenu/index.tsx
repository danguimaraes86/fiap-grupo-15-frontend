type MenuItem = { label: string; href: string };
type Props = { items: MenuItem[]; forceVisible?: boolean };

export function TabletMenu({ items, forceVisible }: Props) {
  const visibilityClass = forceVisible
    ? "py-2 d-flex justify-content-center"
    : "py-2 d-none d-md-flex d-xl-none justify-content-center";

  return (
    <div className={visibilityClass}>
      <ul className="nav top-nav">
        {items.map((item) => (
          <li className="nav-item" key={item.label}>
            <a className="nav-link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
