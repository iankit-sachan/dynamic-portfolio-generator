import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { usePortfolios } from '../hooks/usePortfolios';
import { Portfolio } from '../types';
import ProfileCard from '../components/ProfileCard';

interface HomeProps {
  onCreateNew: () => void;
  onEditPortfolio: (portfolio: Portfolio) => void;
}

const Home: React.FC<HomeProps> = ({ onCreateNew, onEditPortfolio }) => {
  const { portfolios, loading, deletePortfolio } = usePortfolios();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'skills' | 'title'>('all');

  const filteredPortfolios = portfolios.filter(portfolio => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    switch (filterBy) {
      case 'skills':
        const allSkills = [
          ...portfolio.skills.technical,
          ...portfolio.skills.soft,
          ...portfolio.skills.tools
        ];
        return allSkills.some(skill => skill.toLowerCase().includes(searchLower));
      
      case 'title':
        return portfolio.personalInfo.title.toLowerCase().includes(searchLower);
      
      default:
        return (
          portfolio.personalInfo.name.toLowerCase().includes(searchLower) ||
          portfolio.personalInfo.title.toLowerCase().includes(searchLower) ||
          portfolio.bio.toLowerCase().includes(searchLower)
        );
    }
  });

  const handleDeletePortfolio = (portfolio: Portfolio) => {
    if (window.confirm(`Are you sure you want to delete ${portfolio.personalInfo.name}'s portfolio?`)) {
      deletePortfolio(portfolio.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Generator</h1>
            <p className="text-gray-600">Create and manage professional portfolios</p>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
          >
            <Plus size={20} />
            <span>Create New Portfolio</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search portfolios..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-3 text-gray-400" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'skills' | 'title')}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Fields</option>
              <option value="skills">Skills</option>
              <option value="title">Job Title</option>
            </select>
          </div>
        </div>

        {/* Portfolio Grid */}
        {filteredPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolios.map((portfolio) => (
              <ProfileCard
                key={portfolio.id}
                portfolio={portfolio}
                onEdit={() => onEditPortfolio(portfolio)}
                onDelete={() => handleDeletePortfolio(portfolio)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {portfolios.length === 0 ? (
              <div>
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Portfolios Yet</h3>
                <p className="text-gray-600 mb-6">Create your first professional portfolio to get started</p>
                <button
                  onClick={onCreateNew}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Portfolio
                </button>
              </div>
            ) : (
              <div>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;