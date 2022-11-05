import React from 'react';

import styles from './Layout.module.css';

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Factorio Power Calculator</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <span className={styles.footerCopyright}>© St.Permiakov (aka Stranger)</span>
      </footer>
    </div>
  );
}