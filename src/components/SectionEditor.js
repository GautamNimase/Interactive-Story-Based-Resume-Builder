import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, User, Briefcase, GraduationCap, Star, Mail, Award } from 'lucide-react';

const SectionEditor = ({ section, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    date: ''
  });

  useEffect(() => {
    setFormData({
      title: section.title || '',
      subtitle: section.subtitle || '',
      content: section.content || '',
      date: section.date || ''
    });
  }, [section]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedSection = {
      ...section,
      ...formData
    };
    onSave(updatedSection);
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'header': return <User className="w-5 h-5" />;
      case 'experience': return <Briefcase className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'skills': return <Star className="w-5 h-5" />;
      case 'contact': return <Mail className="w-5 h-5" />;
      case 'projects': return <Award className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getSectionTitle = (type) => {
    switch (type) {
      case 'header': return 'Header Section';
      case 'experience': return 'Experience Section';
      case 'education': return 'Education Section';
      case 'skills': return 'Skills Section';
      case 'contact': return 'Contact Section';
      case 'projects': return 'Projects Section';
      default: return 'Section';
    }
  };

  const getFieldLabels = (type) => {
    switch (type) {
      case 'header':
        return {
          title: 'Full Name',
          subtitle: 'Professional Title',
          content: 'Brief Description',
          date: ''
        };
      case 'experience':
        return {
          title: 'Job Title',
          subtitle: 'Company Name',
          content: 'Responsibilities & Achievements',
          date: 'Duration (e.g., 2022-2024)'
        };
      case 'education':
        return {
          title: 'Degree Name',
          subtitle: 'University/Institution',
          content: 'Relevant Coursework & Achievements',
          date: 'Graduation Year'
        };
      case 'skills':
        return {
          title: 'Skills Category',
          subtitle: 'Skill Level',
          content: 'Skills List',
          date: ''
        };
      case 'contact':
        return {
          title: 'Contact Type',
          subtitle: 'Contact Value',
          content: 'Additional Information',
          date: ''
        };
      case 'projects':
        return {
          title: 'Project Name',
          subtitle: 'Technologies Used',
          content: 'Project Description',
          date: 'Project Date'
        };
      default:
        return {
          title: 'Title',
          subtitle: 'Subtitle',
          content: 'Content',
          date: 'Date'
        };
    }
  };

  const labels = getFieldLabels(section.type);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getSectionIcon(section.type)}
          <h3 className="text-lg font-semibold text-gray-900">
            {getSectionTitle(section.type)}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.title}
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-field"
            placeholder={`Enter ${labels.title.toLowerCase()}`}
          />
        </div>

        {labels.subtitle && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.subtitle}
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="input-field"
              placeholder={`Enter ${labels.subtitle.toLowerCase()}`}
            />
          </div>
        )}

        {labels.date && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {labels.date}
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter date or duration"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.content}
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="input-field resize-none"
            placeholder={`Enter ${labels.content.toLowerCase()}`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Section Type Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Section Type: {getSectionTitle(section.type)}
        </h4>
        <p className="text-xs text-blue-700">
          This section will be displayed in your resume timeline. You can reorder sections by dragging them in the main editor.
        </p>
      </div>
    </motion.div>
  );
};

export default SectionEditor; 