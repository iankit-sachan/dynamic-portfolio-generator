import { useState, useEffect } from 'react';
import { Portfolio } from '../types';
import { loadPortfolios, savePortfolio as savePortfolioToStorage, deletePortfolio as deletePortfolioFromStorage } from '../utils/storage';

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const data = loadPortfolios();
        setPortfolios(data);
      } catch (error) {
        console.error('Error loading portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const savePortfolio = (portfolio: Portfolio) => {
    savePortfolioToStorage(portfolio);
    setPortfolios(prev => {
      const existingIndex = prev.findIndex(p => p.id === portfolio.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = portfolio;
        return updated;
      }
      return [...prev, portfolio];
    });
  };

  const deletePortfolio = (id: string) => {
    deletePortfolioFromStorage(id);
    setPortfolios(prev => prev.filter(p => p.id !== id));
  };

  const getPortfolio = (id: string): Portfolio | undefined => {
    return portfolios.find(p => p.id === id);
  };

  return {
    portfolios,
    loading,
    savePortfolio,
    deletePortfolio,
    getPortfolio
  };
};