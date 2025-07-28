import React from 'react';
import { Plus, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project, ValidationErrors } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  errors?: ValidationErrors;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange, errors }) => {
  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    };
    onChange([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, { technologies });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {errors?.projects && (
        <p className="text-red-500 text-sm">{errors.projects as string}</p>
      )}

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Project {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Awesome Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used *
                </label>
                <input
                  type="text"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateTechnologies(project.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                  placeholder="Describe what this project does and your role in it..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <ExternalLink size={16} className="inline mr-1" />
                  Live URL
                </label>
                <input
                  type="url"
                  value={project.liveUrl || ''}
                  onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://myproject.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Github size={16} className="inline mr-1" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No projects added yet. Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsForm;