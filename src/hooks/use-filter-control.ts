import isEqual from 'lodash/isEqual';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

//TODO: proper TypeScript support fix
type State<T> = T & {
  reset?: T;
  sort?: string;
  page?: string | number;
  limit?: string | number;
};

type Action<T, P> = { type: keyof State<T>; payload: P };

export function useFilterControls<StateType, ActionType>(
  initialState: State<StateType>
) {
  const navigate = useNavigate(); // ✅ React Router DOM yönlendirme
  const location = useLocation(); // ✅ Mevcut URL bilgilerini alma

  const searchParams = new URLSearchParams(location.search); // ✅ URL parametrelerini al

  const createQueryString = useCallback(
    (name: string | string[], value: string | string[]) => {
      const params = new URLSearchParams(location.search);
      if (!Array.isArray(name)) {
        params.set(name, value.toString());
      } else {
        name.forEach((n, idx) => params.set(n, value[idx]));
      }
      return params.toString();
    },
    [location.search]
  );

  const onSort = useCallback(
    (key: string) => {
      navigate(
        `${location.pathname}?${createQueryString(
          ['sort', 'page'],
          [isEqual(searchParams.get('sort'), key) ? `-${key}` : key, '1']
        )}`,
        { replace: true }
      );
    },
    [createQueryString, location.pathname, navigate, searchParams]
  );

  const paginate = useCallback(
    (pageNumber: string | number) =>
      navigate(`${location.pathname}?${createQueryString('page', pageNumber.toString())}`, {
        replace: true,
      }),
    [createQueryString, location.pathname, navigate]
  );

  const applyFilter = useCallback(
    (key: string, payload: string | any[]) => {
      const params = createQueryString(key, payload);
      navigate(`${location.pathname}?${params}`, { replace: true });
    },
    [createQueryString, location.pathname, navigate]
  );

  const clearFilter = (key: string[]) => {
    let url = new URL(window.location.href);
    key.forEach((item) => url.searchParams.delete(item));
    navigate(`${location.pathname}${url.search}`, { replace: true });
  };

  const reset = useCallback(
    function setResetValue<T extends URLSearchParams>(resetValue?: T) {
      const params = new URLSearchParams(resetValue);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    },
    [location.pathname, navigate]
  );

  const parsedSearchParams = Object.fromEntries(searchParams);
  const state = {
    ...initialState,
    ...Object.fromEntries(
      Object.entries(parsedSearchParams).map(([k, v]) => {
        if (k.includes('date_range') || k.includes('_date')) {
          return [k, v?.toString().split(';')];
        }
        return [k, v];
      })
    ),
  };

  const params = Object.entries(parsedSearchParams).reduce(
    (acc, [k, v]) => ({ ...acc, ...getQueryParams(k, v) }),
    {}
  );

  return {
    params,
    state,
    onSort,
    paginate,
    applyFilter,
    clearFilter,
    reset,
  };
}

function getQueryParams(key: string, payload: any) {
  if (key.includes('date_range') || key.includes('_date')) {
    const [start, end] = payload.split(';');
    if (start && end) {
      return { [`filter[${key}]`]: payload };
    }
    return {};
  }

  if (['page', 'sort', 'limit'].includes(key)) {
    return { [key]: payload };
  }
  return { [`filter[${key}]`]: payload };
}
