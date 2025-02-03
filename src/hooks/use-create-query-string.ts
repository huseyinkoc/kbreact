import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useCreateQueryString() {
  const location = useLocation();
  const navigate = useNavigate();

  // 📌 Mevcut URL parametrelerini koruyarak yeni parametre ekler/günceller
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(location.search);
      params.set(name, value);

      // ✅ Yeni URL'yi oluştur ve yönlendir
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      return params.toString();
    },
    [location, navigate]
  );

  return { createQueryString };
}
