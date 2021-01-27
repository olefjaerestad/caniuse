import React from 'react';
import styles from './Index.module.css';
import { FeatureTable } from '../FeatureTable/FeatureTable';
import { LoadingSymbol } from '../LoadingSymbol/LoadingSymbol';
import { SearchForm } from '../SearchForm/SearchForm';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export function Index() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <ThemeSwitcher />
        </div>
        <SearchForm />
        <FeatureTable />
        <LoadingSymbol />
      </div>
    </>
  );
}
