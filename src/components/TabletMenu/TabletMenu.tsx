type MenuItem = { label: string; href: string };
type Props = { items: MenuItem[] };

export function TabletMenu({ items }: Props) {
  return (
    <div className="py-2 d-none d-md-flex d-xl-none justify-content-center">
      <ul className="nav top-nav">
        {items.map((item) => (
          <li className="nav-item" key={item.label}>
            <a className="nav-link" href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
