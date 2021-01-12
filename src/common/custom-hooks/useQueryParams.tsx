import { useLocation } from 'react-router-dom';

export function useQueryParams(): {[key: string]: string | string[]} {
  const params = {};
  const searchParams = new URLSearchParams(useLocation().search);

  for (const [key, val] of searchParams.entries()) {
    if (params[key] && !Array.isArray(params[key])) {
      params[key] = [params[key]];
    }

    if (Array.isArray(params[key])) {
      params[key].push(val);
    } else {
      params[key] = val;
    }
  }
  
  return params;
}
