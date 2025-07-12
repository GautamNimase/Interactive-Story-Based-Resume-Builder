import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Mail, 
  Award,
  Phone,
  Globe,
  MapPin
} from 'lucide-react';

const ResumePreview = ({ resume }) => {
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

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'header':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {section.title}
            </h1>
            {section.subtitle && (
              <h2 className="text-xl text-primary-600 font-medium mb-4">
                {section.subtitle}
              </h2>
            )}
            {section.content && (
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {section.content}
              </p>
            )}
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-6 mb-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              {getSectionIcon(section.type)}
              <h3 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{section.subtitle || 'email@example.com'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{section.content || '+1 (555) 123-4567'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{section.title || 'City, State'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">linkedin.com/in/yourprofile</span>
              </div>
            </div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                {getSectionIcon(section.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  {section.date && (
                    <span className="text-sm text-gray-500 font-medium">
                      {section.date}
                    </span>
                  )}
                </div>
                {section.subtitle && (
                  <h4 className="text-primary-600 font-medium mb-2">
                    {section.subtitle}
                  </h4>
                )}
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 'education':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                {getSectionIcon(section.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  {section.date && (
                    <span className="text-sm text-gray-500 font-medium">
                      {section.date}
                    </span>
                  )}
                </div>
                {section.subtitle && (
                  <h4 className="text-green-600 font-medium mb-2">
                    {section.subtitle}
                  </h4>
                )}
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                {getSectionIcon(section.type)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>
            {section.content && (
              <div className="flex flex-wrap gap-2">
                {section.content.split(',').map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                {getSectionIcon(section.type)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  {section.date && (
                    <span className="text-sm text-gray-500 font-medium">
                      {section.date}
                    </span>
                  )}
                </div>
                {section.subtitle && (
                  <h4 className="text-purple-600 font-medium mb-2">
                    {section.subtitle}
                  </h4>
                )}
                {section.content && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              {getSectionIcon(section.type)}
              <h3 className="text-lg font-semibold text-gray-900">
                {section.title}
              </h3>
            </div>
            {section.subtitle && (
              <h4 className="text-gray-600 font-medium mb-2">
                {section.subtitle}
              </h4>
            )}
            {section.content && (
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-lg p-8 md:p-12"
      >
        {/* Resume Header */}
        <div className="text-center mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {resume.title}
          </h1>
          <p className="text-gray-500">
            Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Resume Content */}
        <div className="space-y-6">
          {resume.sections.map((section, index) => renderSection(section, index))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Generated with ResumeStory - Your Professional Resume Builder
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumePreview; 