import React from 'react';
import { MapPin, Mail, Phone, ExternalLink, Github, Linkedin, Twitter, Globe, Star } from 'lucide-react';
import { Portfolio } from '../types';

interface CreativeTemplateProps {
  portfolio: Portfolio;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ portfolio }) => {
  const { personalInfo, bio, projects, skills, testimonials, socialLinks } = portfolio;

  const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    website: Globe
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-40 h-40 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white border-opacity-30">
              <span className="text-white text-4xl font-bold">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-3 text-shadow">
                {personalInfo.name}
              </h1>
              <p className="text-2xl font-light mb-6 text-white text-opacity-90">
                {personalInfo.title}
              </p>
              
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-8 text-white text-opacity-90">
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4 mt-6">
                {Object.entries(socialLinks).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Icon size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
            <p className="text-gray-700 leading-relaxed text-lg text-center">{bio}</p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => {
              const colors = [
                'from-purple-500 to-pink-500',
                'from-pink-500 to-orange-500',
                'from-orange-500 to-red-500'
              ];
              return (
                <div key={category} className="bg-white rounded-2xl p-6 shadow-xl border border-pink-100 transform hover:scale-105 transition-transform duration-300">
                  <div className={`w-full h-2 bg-gradient-to-r ${colors[index]} rounded-full mb-4`}></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {category === 'technical' ? '💻 Technical Skills' : 
                     category === 'soft' ? '🤝 Soft Skills' : '🛠️ Tools & Software'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-full h-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-purple-500 to-pink-500' : 'from-pink-500 to-orange-500'} rounded-full mb-6`}></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{project.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                What Clients Say
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">"</span>
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">
                        {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.clientName}</p>
                      <p className="text-gray-600">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-white text-opacity-90 text-sm">
              Built with ❤️ using React & TypeScript
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/iankit-sachan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm text-white hover:bg-opacity-30 rounded-lg transition-all duration-300"
              >
                <Github size={18} className="mr-2" />
                <span className="text-sm font-medium">View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreativeTemplate;