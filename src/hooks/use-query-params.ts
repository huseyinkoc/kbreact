import { atom, useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const queryAtom = atom('');

export function createQueryString(queryObj: Record<string, string | number | boolean>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(queryObj)) {
    params.set(key, value.toString());
  }
  return params.toString();
}

export default function useQueryParams(pathname: string = '/') {
  const [query, setQuery] = useAtom(queryAtom);
  const location = useLocation(); // ✅ URL'den query parametrelerini al
  const navigate = useNavigate(); // ✅ Yönlendirme için

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const l = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(l);
  }, [query]);

  // 📌 Query Parametrelerini Temizleme
  const clearQueryParam = (keys: string[]) => {
    const params = new URLSearchParams(location.search);
    keys.forEach((key) => params.delete(key));
    setQuery(params.toString());
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  };

  // 📌 Yeni Query Parametreleri Set Etme
  const setQueryParams = (data: any) => {
    const queryString = typeof data === 'string' ? data : createQueryString(data);
    setQuery(queryString);
    navigate(`${pathname}?${queryString}`, { replace: true });
  };

  // 📌 Mevcut Query Parametrelerini Alma
  function getParams(url: string = window.location.href) {
    const params: Record<string, string | string[]> = {};
    new URL(url).searchParams.forEach((val, key) => {
      if (params[key] !== undefined) {
        if (!Array.isArray(params[key])) {
          params[key] = [params[key] as string];
        }
        (params[key] as string[]).push(val);
      } else {
        params[key] = val;
      }
    });
    return params;
  }

  // 📌 Query Parametrelerini Güncelleme
  const updateQueryParams = (key: string, value: string | number | boolean) => {
    if (!value) {
      clearQueryParam([key]);
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set(key, value.toString());
    setQuery(params.toString());
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  };

  return {
    query,
    loading,
    getParams,
    setQueryParams,
    updateQueryParams,
    clearQueryParam,
  };
}
