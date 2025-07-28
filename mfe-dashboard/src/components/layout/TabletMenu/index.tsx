import styles from './TabletMenu.module.css';

type MenuItem = { label: string; href: string };
type Props = { 
  items: MenuItem[]; 
  forceVisible?: boolean;
  activeHref?: string; // Nova prop para indicar qual link está ativo
};

export function TabletMenu({ items, forceVisible, activeHref }: Props) {
  const visibilityClass = forceVisible
    ? "py-2 d-flex justify-content-center tablet-menu"
    : "py-2 d-none d-md-flex d-xl-none justify-content-center";

  return (
    <div className={visibilityClass} style={{ height: '3rem' }}>
      <ul className="nav">
        {items.map((item) => {
          const isActive = item.href === activeHref;
          const linkClass = isActive 
            ? `nav-link ${styles.navLinkActive}` 
            : `nav-link ${styles.navLink}`;
            
          return (
            <li className="nav-item" key={item.label}>
              <a className={linkClass} href={item.href}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
