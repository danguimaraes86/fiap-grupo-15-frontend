import styles from './Sidebar.module.css';

type MenuItem = { label: string; href: string };
type Props = { items: MenuItem[]; active?: string };

export function Sidebar({ items, active }: Props) {
  return (
      <div className={styles.sidebar}>
      <ul className="nav flex-column text-start">
        {items.map((item, index, arr) => {
          const isActive = active === item.label;
          const className = `nav-link ${isActive ? styles.active : styles.navLink}`;

          return (
            <li className={styles.navItem} key={item.label}>
              <a className={className} href={item.href}>
                {item.label}
              </a>
              { (index < arr.length - 1) && <hr className={styles.hrDivider} /> }
            </li>
          );
        })}
      </ul>
    </div>
  );
}
