import React from 'react';
import { FunctionalityList } from '../FunctionalityList/FunctionalityList';
import { SearchForm } from '../SearchForm/SearchForm';

export function Index() {
  return (
    <>
      <h1>Caniuse - based on browser usage</h1>
      <SearchForm />
      <FunctionalityList />
    </>
  );
}
