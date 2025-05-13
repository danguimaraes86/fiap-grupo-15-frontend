type MenuItem = { label: string; href: string };
type Props = { items: MenuItem[]; active?: string };

export function MobileMenu({ items, active }: Props) {
  return (
    <div className="offcanvas offcanvas-start d-md-none" tabIndex={-1} id="mobileMenu">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          {items.map((item) => (
            <li className="nav-item" key={item.label}>
              <a
                className={`nav-link ${active === item.label ? 'active' : ''}`}
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
