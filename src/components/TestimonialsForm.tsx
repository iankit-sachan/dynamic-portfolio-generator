import React from 'react';
import { Plus, Trash2, Star } from 'lucide-react';
import { Testimonial, ValidationErrors } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TestimonialsFormProps {
  testimonials: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
  errors?: ValidationErrors;
}

const TestimonialsForm: React.FC<TestimonialsFormProps> = ({ testimonials, onChange, errors }) => {
  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: uuidv4(),
      clientName: '',
      company: '',
      text: '',
      rating: 5
    };
    onChange([...testimonials, newTestimonial]);
  };

  const removeTestimonial = (id: string) => {
    onChange(testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    onChange(testimonials.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const renderStarRating = (testimonial: Testimonial) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateTestimonial(testimonial.id, { rating: star })}
            className={`transition-colors ${
              star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star size={20} fill="currentColor" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
        <button
          type="button"
          onClick={addTestimonial}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="p-6 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Testimonial {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeTestimonial(testimonial.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={testimonial.clientName}
                  onChange={(e) => updateTestimonial(testimonial.id, { clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization *
                </label>
                <input
                  type="text"
                  value={testimonial.company}
                  onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              {renderStarRating(testimonial)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Text *
              </label>
              <textarea
                value={testimonial.text}
                onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
                placeholder="Write what the client said about your work..."
              />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No testimonials added yet. Click "Add Testimonial" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsForm;