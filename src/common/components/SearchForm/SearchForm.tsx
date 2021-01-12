import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useQueryParams } from '../../custom-hooks/useQueryParams';

export function SearchForm() {
  console.log({__IS_BROWSER__});
  let { search: searchParam } = useQueryParams();
  const [search, setSearch] = useState<string>(searchParam.toString());

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('SearchForm.handleSubmit()');
    console.log(location);
    
    fetch(`${location.origin}/api/caniuse?search=${search}`)
      .then((res: Response) => res.json())
      .then((res: any) => console.log(res));
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="search">Functionality</label>
      <input 
        type="search"
        name="search"
        id="search"
        value={search}
        placeholder="svg, class, arrow functions, etc"
        onChange={handleChange}
      />
      <input type="submit" value="Search"/>
    </form>
  )
}
