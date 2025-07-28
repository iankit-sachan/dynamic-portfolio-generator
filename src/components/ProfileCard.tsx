import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Mail, Phone, User, Edit, Trash2 } from 'lucide-react';
import { Portfolio } from '../types';

interface ProfileCardProps {
  portfolio: Portfolio;
  onEdit: () => void;
  onDelete: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ portfolio, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { personalInfo, bio, skills } = portfolio;

  const topSkills = [
    ...skills.technical.slice(0, 2),
    ...skills.soft.slice(0, 1)
  ].slice(0, 3);

  const bioSnippet = bio.length > 100 ? bio.substring(0, 100) + '...' : bio;

  const handleViewPortfolio = () => {
    navigate(`/portfolio/${portfolio.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header with profile photo placeholder and actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{personalInfo.name}</h3>
              <p className="text-blue-600 font-medium">{personalInfo.title}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Portfolio"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Portfolio"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-2" />
            <span>{personalInfo.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={14} className="mr-2" />
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={14} className="mr-2" />
            <span>{personalInfo.phone}</span>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{bioSnippet}</p>

        {/* Top Skills */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Skills</h4>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewPortfolio}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          View Full Portfolio
        </button>
      </div>

      {/* Template indicator */}
      <div className="px-6 py-3 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Template: {portfolio.template === 'modern' ? 'Modern Professional' : 'Creative Designer'}
          </span>
          <span className="text-xs text-gray-500">
            Updated {new Date(portfolio.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;