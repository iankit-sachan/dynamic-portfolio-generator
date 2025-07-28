import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Portfolio } from './types';

import Home from './pages/Home';
import PortfolioForm from './pages/PortfolioForm';
import PortfolioView from './pages/PortfolioView';

type AppView = 'home' | 'create' | 'edit';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | undefined>();

  const handleCreateNew = () => {
    setEditingPortfolio(undefined);
    setCurrentView('create');
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setCurrentView('edit');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setEditingPortfolio(undefined);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              currentView === 'home' ? (
                <Home 
                  onCreateNew={handleCreateNew}
                  onEditPortfolio={handleEditPortfolio}
                />
              ) : (
                <PortfolioForm 
                  editingPortfolio={editingPortfolio}
                  onBack={handleBackToHome}
                />
              )
            } 
          />
          <Route path="/portfolio/:id" element={<PortfolioView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;