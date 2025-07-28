import React from 'react';
import { Linkedin, Github, Twitter, Globe } from 'lucide-react';
import { SocialLinks, ValidationErrors } from '../types';

interface SocialLinksFormProps {
  socialLinks: SocialLinks;
  onChange: (socialLinks: SocialLinks) => void;
  errors?: ValidationErrors;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ socialLinks, onChange, errors }) => {
  const handleChange = (platform: keyof SocialLinks, value: string) => {
    onChange({ ...socialLinks, [platform]: value });
  };

  const socialPlatforms = [
    {
      key: 'linkedin' as keyof SocialLinks,
      label: 'LinkedIn Profile',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/yourprofile',
      color: 'text-blue-600'
    },
    {
      key: 'github' as keyof SocialLinks,
      label: 'GitHub Profile',
      icon: Github,
      placeholder: 'https://github.com/yourusername',
      color: 'text-gray-800'
    },
    {
      key: 'twitter' as keyof SocialLinks,
      label: 'Twitter/X Profile',
      icon: Twitter,
      placeholder: 'https://twitter.com/yourusername',
      color: 'text-blue-400'
    },
    {
      key: 'website' as keyof SocialLinks,
      label: 'Personal Website',
      icon: Globe,
      placeholder: 'https://yourwebsite.com',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Social Media & Links</h2>
      <p className="text-gray-600">Add your professional social media profiles and website links</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div key={platform.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Icon size={16} className={`inline mr-2 ${platform.color}`} />
                {platform.label}
              </label>
              <input
                type="url"
                value={socialLinks[platform.key] || ''}
                onChange={(e) => handleChange(platform.key, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={platform.placeholder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksForm;