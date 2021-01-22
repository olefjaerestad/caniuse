import React from 'react';
import styles from './Index.module.css';
import { FeatureList } from '../FeatureList/FeatureList';
import { SearchForm } from '../SearchForm/SearchForm';

export function Index() {
  return (
    <>
      <div className={styles.container}>
        <h1>Caniuse - based on browser usage</h1>
        <SearchForm />
        <FeatureList />
      </div>
    </>
  );
}
