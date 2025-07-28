import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePortfolios } from '../hooks/usePortfolios';
import ModernTemplate from '../templates/ModernTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const PortfolioView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPortfolio } = usePortfolios();

  // Handle preview mode with proper validation
  let portfolio;
  if (id === 'preview') {
    try {
      const previewData = sessionStorage.getItem('preview-portfolio');
      if (previewData) {
        const parsedData = JSON.parse(previewData);
        // Validate that the preview data has required properties
        if (parsedData && parsedData.personalInfo && parsedData.personalInfo.name) {
          portfolio = parsedData;
        }
      }
    } catch (error) {
      console.error('Error parsing preview portfolio data:', error);
    }
  } else {
    portfolio = getPortfolio(id!);
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h2>
          <p className="text-gray-600 mb-6">The portfolio you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (portfolio.template) {
      case 'creative':
        return <CreativeTemplate portfolio={portfolio} />;
      default:
        return <ModernTemplate portfolio={portfolio} />;
    }
  };

  return (
    <div>
      {/* Floating Back Button */}
      {id !== 'preview' && (
        <button
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-3 bg-white text-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
      )}
      
      {renderTemplate()}
    </div>
  );
};

export default PortfolioView;