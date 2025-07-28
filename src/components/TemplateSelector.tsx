import React from 'react';
import { Monitor, Palette } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'creative';
  onTemplateChange: (template: 'modern' | 'creative') => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern Professional',
      description: 'Clean, minimalist design perfect for tech professionals',
      icon: Monitor,
      preview: 'Linear layout with subtle animations and professional typography'
    },
    {
      id: 'creative' as const,
      name: 'Creative Designer',
      description: 'Bold, artistic layout ideal for creative professionals',
      icon: Palette,
      preview: 'Dynamic grid layout with vibrant colors and creative elements'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          
          return (
            <div
              key={template.id}
              className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {template.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {template.preview}
                  </p>
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;