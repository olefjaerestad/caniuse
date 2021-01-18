import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IFeatures } from '../../types/feature-types';
import { setFeatures } from '../../redux/feature/feature-actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../../custom-hooks/useQueryParams';

const minSearchLength = 3;

export function SearchForm() {
  const dispatch = useDispatch();
  const myHistory = useHistory();
  const { search: searchParam } = useQueryParams();
  const [search, setSearch] = useState<string>(searchParam ? searchParam.toString() : '');
  const [error, setError] = useState<string>();

  function fetchFeatureSupport(searchParam: string) {
    if (searchParam.length < minSearchLength) {
      return setError(`Search phrase must be at least ${minSearchLength} characters.`);
    }

    setError(null);

    fetch(`${location.origin}/api/caniuse?search=${searchParam}`)
      .then((res: Response) => res.json())
      .then((res: IFeatures) => dispatch(setFeatures(res)))
      .catch((err: Error) => setError('Something went wrong with the search.'));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value.replace(/</g, '\\u003c'));
  }
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Update 'search' query param:
    const searchParams = new URLSearchParams(myHistory.location.search);
    searchParams.set('search', search);
    myHistory.push(myHistory.location.pathname + '?' + searchParams.toString());
    
    fetchFeatureSupport(search);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search">Feature</label>
      <input 
        minLength={minSearchLength}
        type="search"
        name="search"
        id="search"
        value={search}
        placeholder="svg, class, arrow functions, etc"
        onChange={handleChange}
      />
      <input type="submit" value="Search"/>
      {error && <p>{error}</p>}
    </form>
  )
}
