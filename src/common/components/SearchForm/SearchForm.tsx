import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IFunctionality } from '../../types/functionality-types';
import { setFunctionalities } from '../../redux/functionality/functionality-actions';
import { useDispatch } from 'react-redux';
import { useQueryParams } from '../../custom-hooks/useQueryParams';

const minSearchLength = 3;

export function SearchForm() {
  console.log({__IS_BROWSER__});
  const dispatch = useDispatch();
  const { search: searchParam } = useQueryParams();
  const [search, setSearch] = useState<string>(searchParam ? searchParam.toString() : '');
  const [error, setError] = useState<string>();

  function fetchFunctionalitySupport(searchParam: string) {
    if (searchParam.length < minSearchLength) {
      return setError(`Search phrase must be at least ${minSearchLength} characters.`);
    }

    setError(null);

    fetch(`${location.origin}/api/caniuse?search=${searchParam}`)
      .then((res: Response) => res.json())
      .then((res: IFunctionality) => dispatch(setFunctionalities(res)))
      .catch((err: Error) => setError('Something went wrong with the search.'));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Update 'search' query param.
    fetchFunctionalitySupport(search);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search">Functionality</label>
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
