import React from 'react';
import { FeatureList } from '../FeatureList/FeatureList';
import { SearchForm } from '../SearchForm/SearchForm';

export function Index() {
  return (
    <>
      <h1>Caniuse - based on browser usage</h1>
      <SearchForm />
      <FeatureList />
    </>
  );
}
