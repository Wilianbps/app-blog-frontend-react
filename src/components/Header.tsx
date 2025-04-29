import styles from "./Header.module.css";

import igniteLogo from '../assets/ignite-logo.svg'

export function Header() {
  //styles é um objeto
  console.log(styles);
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="logotipo do ignite" />
    </header>
  );
}
