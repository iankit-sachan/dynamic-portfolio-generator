import { Portfolio } from '../types';

const STORAGE_KEY = 'portfolio-generator-data';

export const savePortfolios = (portfolios: Portfolio[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
};

export const loadPortfolios = (): Portfolio[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading portfolios from storage:', error);
    return [];
  }
};

export const savePortfolio = (portfolio: Portfolio): void => {
  const portfolios = loadPortfolios();
  const existingIndex = portfolios.findIndex(p => p.id === portfolio.id);
  
  if (existingIndex >= 0) {
    portfolios[existingIndex] = portfolio;
  } else {
    portfolios.push(portfolio);
  }
  
  savePortfolios(portfolios);
};

export const deletePortfolio = (id: string): void => {
  const portfolios = loadPortfolios().filter(p => p.id !== id);
  savePortfolios(portfolios);
};