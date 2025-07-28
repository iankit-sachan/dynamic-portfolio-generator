import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Skills, ValidationErrors } from '../types';

interface SkillsFormProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
  errors?: ValidationErrors;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange, errors }) => {
  const [newSkills, setNewSkills] = useState({
    technical: '',
    soft: '',
    tools: ''
  });

  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim() && !skills[category].includes(skill.trim())) {
      onChange({
        ...skills,
        [category]: [...skills[category], skill.trim()]
      });
      setNewSkills({ ...newSkills, [category]: '' });
    }
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...skills,
      [category]: skills[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (category: keyof Skills, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category, newSkills[category]);
    }
  };

  const skillCategories = [
    {
      key: 'technical' as keyof Skills,
      title: 'Technical Skills',
      placeholder: 'e.g., JavaScript, Python, React...',
      description: 'Programming languages, frameworks, and technical expertise'
    },
    {
      key: 'soft' as keyof Skills,
      title: 'Soft Skills',
      placeholder: 'e.g., Leadership, Communication, Problem Solving...',
      description: 'Interpersonal and professional abilities'
    },
    {
      key: 'tools' as keyof Skills,
      title: 'Tools & Software',
      placeholder: 'e.g., VS Code, Figma, Docker...',
      description: 'Software tools and platforms you use'
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
      
      {errors?.skills && (
        <p className="text-red-500 text-sm">{errors.skills as string}</p>
      )}

      {skillCategories.map((category) => (
        <div key={category.key} className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newSkills[category.key]}
              onChange={(e) => setNewSkills({ ...newSkills, [category.key]: e.target.value })}
              onKeyPress={(e) => handleKeyPress(category.key, e)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={category.placeholder}
            />
            <button
              type="button"
              onClick={() => addSkill(category.key, newSkills[category.key])}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills[category.key].map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(category.key, skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          {skills[category.key].length === 0 && (
            <p className="text-gray-500 text-sm italic">No {category.title.toLowerCase()} added yet</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsForm;