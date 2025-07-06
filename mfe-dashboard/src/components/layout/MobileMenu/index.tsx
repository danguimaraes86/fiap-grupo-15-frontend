import styles from './MobileMenu.module.css';

export function MobileMenu({ items, active, forceVisible }) {
  const offcanvasClass = forceVisible
    ? `offcanvas offcanvas-start show ${styles.customMobileWidth}`
    : `offcanvas offcanvas-start ${styles.customMobileWidth}`;

  const style = forceVisible
    ? { visibility: 'visible', position: 'relative', transform: 'none' }
    : {};

  return (
    <div className={offcanvasClass} tabIndex={-1} id="mobileMenu" style={style}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Menu</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
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
