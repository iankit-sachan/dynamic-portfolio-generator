import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Portfolio, PortfolioFormData, ValidationErrors } from '../types';
import { usePortfolios } from '../hooks/usePortfolios';
import { validatePortfolio } from '../utils/validation';

import TemplateSelector from '../components/TemplateSelector';
import PersonalInfoForm from '../components/PersonalInfoForm';
import BioForm from '../components/BioForm';
import ProjectsForm from '../components/ProjectsForm';
import SkillsForm from '../components/SkillsForm';
import TestimonialsForm from '../components/TestimonialsForm';
import SocialLinksForm from '../components/SocialLinksForm';

interface PortfolioFormProps {
  editingPortfolio?: Portfolio;
  onBack: () => void;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ editingPortfolio, onBack }) => {
  const navigate = useNavigate();
  const { savePortfolio } = usePortfolios();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<PortfolioFormData>({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: ''
    },
    bio: '',
    projects: [{
      id: uuidv4(),
      title: 'Sample Project',
      description: 'A sample project to demonstrate the portfolio functionality',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: '',
      githubUrl: 'https://github.com/iankit-sachan'
    }],
    skills: {
      technical: [],
      soft: [],
      tools: []
    },
    testimonials: [],
    socialLinks: {},
    template: 'modern'
  });

  useEffect(() => {
    if (editingPortfolio) {
      setFormData({
        personalInfo: editingPortfolio.personalInfo,
        bio: editingPortfolio.bio,
        projects: editingPortfolio.projects,
        skills: editingPortfolio.skills,
        testimonials: editingPortfolio.testimonials,
        socialLinks: editingPortfolio.socialLinks,
        template: editingPortfolio.template
      });
    }
  }, [editingPortfolio]);

  const steps = [
    { title: 'Template', component: 'template' },
    { title: 'Personal Info', component: 'personal' },
    { title: 'About', component: 'bio' },
    { title: 'Projects', component: 'projects' },
    { title: 'Skills', component: 'skills' },
    { title: 'Testimonials', component: 'testimonials' },
    { title: 'Social Links', component: 'social' }
  ];

  const handleNext = () => {
    const validationErrors = validatePortfolio(formData);
    setErrors(validationErrors);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const validationErrors = validatePortfolio(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Find the first step with errors and navigate to it
      if (validationErrors.personalInfo) {
        setCurrentStep(1);
      } else if (validationErrors.bio) {
        setCurrentStep(2);
      }
      
      // Show a more helpful message
      const errorCount = Object.keys(validationErrors).length;
      alert(`Please fix ${errorCount} validation error${errorCount > 1 ? 's' : ''} before saving. Check the highlighted fields.`);
      return;
    }

    const portfolio: Portfolio = {
      id: editingPortfolio?.id || uuidv4(),
      ...formData,
      createdAt: editingPortfolio?.createdAt || new Date(),
      updatedAt: new Date()
    };

    savePortfolio(portfolio);
    onBack();
  };

  const handlePreview = () => {
    const validationErrors = validatePortfolio(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      // Navigate to first step with errors
      if (validationErrors.personalInfo) {
        setCurrentStep(1);
      } else if (validationErrors.bio) {
        setCurrentStep(2);
      }
      
      const errorCount = Object.keys(validationErrors).length;
      alert(`Please fix ${errorCount} validation error${errorCount > 1 ? 's' : ''} before previewing. Check the highlighted fields.`);
      return;
    }

    const tempPortfolio: Portfolio = {
      id: 'preview',
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store preview data temporarily
    sessionStorage.setItem('preview-portfolio', JSON.stringify(tempPortfolio));
    window.open('/portfolio/preview', '_blank');
  };

  const renderStep = () => {
    switch (steps[currentStep].component) {
      case 'template':
        return (
          <TemplateSelector
            selectedTemplate={formData.template}
            onTemplateChange={(template) => setFormData({ ...formData, template })}
          />
        );
      case 'personal':
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={(personalInfo) => setFormData({ ...formData, personalInfo })}
            errors={errors}
          />
        );
      case 'bio':
        return (
          <BioForm
            bio={formData.bio}
            onChange={(bio) => setFormData({ ...formData, bio })}
            errors={errors}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            projects={formData.projects}
            onChange={(projects) => setFormData({ ...formData, projects })}
            errors={errors}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={formData.skills}
            onChange={(skills) => setFormData({ ...formData, skills })}
            errors={errors}
          />
        );
      case 'testimonials':
        return (
          <TestimonialsForm
            testimonials={formData.testimonials}
            onChange={(testimonials) => setFormData({ ...formData, testimonials })}
            errors={errors}
          />
        );
      case 'social':
        return (
          <SocialLinksForm
            socialLinks={formData.socialLinks}
            onChange={(socialLinks) => setFormData({ ...formData, socialLinks })}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-3xl font-bold text-gray-900">
              {editingPortfolio ? 'Edit Portfolio' : 'Create New Portfolio'}
            </h1>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save size={16} />
              <span>Save Portfolio</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setCurrentStep(index)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  index === currentStep
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : index < currentStep
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Save & Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;