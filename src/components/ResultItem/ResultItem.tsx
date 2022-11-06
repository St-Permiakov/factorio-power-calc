import React from 'react';

import styles from './ResultItem.module.css';

type TProps = {
  label: string;
  value: string | number;
}

export const ResultItem = ({ label, value }: TProps) => (
  <div className={styles.root}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);
