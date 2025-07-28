import React from 'react';
import { ValidationErrors } from '../types';

interface BioFormProps {
  bio: string;
  onChange: (bio: string) => void;
  errors?: ValidationErrors;
}

const BioForm: React.FC<BioFormProps> = ({ bio, onChange, errors }) => {
  const charCount = bio.length;
  const isValidLength = charCount > 0 && charCount <= 500;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">About You</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio *
          <span className="text-gray-500 ml-2">(up to 500 characters)</span>
        </label>
        <textarea
          value={bio}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none h-32 ${
            errors?.bio ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Write a compelling professional bio that showcases your expertise, experience, and what makes you unique in your field..."
        />
        <div className="flex justify-between items-center mt-2">
          {errors?.bio && (
            <p className="text-red-500 text-sm">{errors.bio as string}</p>
          )}
          <p className={`text-sm ml-auto ${
            isValidLength ? 'text-green-600' : charCount > 500 ? 'text-red-500' : 'text-gray-500'
          }`}>
            {charCount}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioForm;