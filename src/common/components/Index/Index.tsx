import React from 'react';
import styles from './Index.module.css';
import { FeatureList } from '../FeatureList/FeatureList';
import { SearchForm } from '../SearchForm/SearchForm';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export function Index() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Caniuse - based on browser usage</h1>
          <ThemeSwitcher />
        </div>
        <SearchForm />
        <FeatureList />
      </div>
    </>
  );
}
