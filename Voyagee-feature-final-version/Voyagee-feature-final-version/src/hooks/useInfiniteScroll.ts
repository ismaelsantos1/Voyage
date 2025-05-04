// hooks/useInfiniteScroll.ts
import { useState, useEffect, useCallback } from 'react';

export function useInfiniteScroll<T>(
  fetchFunction: (page: number) => Promise<{ items: T[]; hasMore: boolean }>,
  dependencies: any[] = [], // Novo parâmetro para controlar o refresh
  options = { threshold: 100 }
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async (isInitialLoad = false) => {
    if ((loading || !hasMore) && !isInitialLoad) return;

    setLoading(true);
    setError(null);

    try {
      const { items: newItems, hasMore: moreItems } = await fetchFunction(isInitialLoad ? 1 : page);
      
      setItems(prev => isInitialLoad ? newItems : [...prev, ...newItems]);
      setHasMore(moreItems);
      if (!isInitialLoad) {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mais itens');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, loading, hasMore]);

  // Carrega dados iniciais e recarrega quando as dependências mudam
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    loadMore(true);
  }, [...dependencies]); // Spread das dependências aqui

  // Monitora o scroll para carregar mais itens
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - options.threshold
      ) {
        loadMore(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, options.threshold]);

  return {
    items,
    loading,
    error,
    hasMore,
    setItems, // Exportado para caso seja necessário manipular os items externamente
  };
}