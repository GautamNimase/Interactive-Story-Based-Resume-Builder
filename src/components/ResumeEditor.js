import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Award,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import SectionEditor from './SectionEditor';
import ResumePreview from './ResumePreview';

const ResumeEditor = ({ resumeId, onBack }) => {
  const { state, dispatch } = useResume();
  const [selectedSection, setSelectedSection] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const currentResume = state.resumes.find(r => r.id === resumeId) || state.currentResume;

  useEffect(() => {
    if (currentResume && !state.currentResume) {
      dispatch({ type: 'SET_CURRENT_RESUME', payload: currentResume });
    }
  }, [currentResume, dispatch, state.currentResume]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sections = Array.from(currentResume.sections);
    const [reorderedSection] = sections.splice(result.source.index, 1);
    sections.splice(result.destination.index, 0, reorderedSection);

    // Update order property
    const updatedSections = sections.map((section, index) => ({
      ...section,
      order: index
    }));

    dispatch({ type: 'REORDER_SECTIONS', payload: updatedSections });
  };

  const handleAddSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type,
      title: getDefaultTitle(type),
      subtitle: getDefaultSubtitle(type),
      content: getDefaultContent(type),
      date: type === 'experience' || type === 'education' ? '2024-Present' : '',
      order: currentResume.sections.length
    };

    dispatch({ type: 'ADD_SECTION', payload: newSection });
    setSelectedSection(newSection);
    setShowSectionEditor(true);
  };

  const handleEditSection = (section) => {
    setSelectedSection(section);
    setShowSectionEditor(true);
  };

  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      dispatch({ type: 'DELETE_SECTION', payload: sectionId });
      if (selectedSection?.id === sectionId) {
        setSelectedSection(null);
        setShowSectionEditor(false);
      }
    }
  };

  const getDefaultTitle = (type) => {
    switch (type) {
      case 'header': return 'Your Name';
      case 'experience': return 'Job Title';
      case 'education': return 'Degree Name';
      case 'skills': return 'Technical Skills';
      case 'contact': return 'Contact Information';
      case 'projects': return 'Project Name';
      default: return 'Section Title';
    }
  };

  const getDefaultSubtitle = (type) => {
    switch (type) {
      case 'header': return 'Your Professional Title';
      case 'experience': return 'Company Name';
      case 'education': return 'University Name';
      case 'skills': return 'Programming Languages & Tools';
      case 'contact': return 'Email, Phone, Location';
      case 'projects': return 'Technologies Used';
      default: return 'Subtitle';
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'header': return 'A brief description about yourself and your professional goals.';
      case 'experience': return 'Describe your responsibilities and achievements in this role.';
      case 'education': return 'Relevant coursework, GPA, honors, or specializations.';
      case 'skills': return 'List your technical skills, programming languages, and tools.';
      case 'contact': return 'Your contact information including email, phone, and location.';
      case 'projects': return 'Describe the project, your role, and the technologies used.';
      default: return 'Section content...';
    }
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

  const sectionTypes = [
    { type: 'header', label: 'Header', icon: <User className="w-4 h-4" /> },
    { type: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { type: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { type: 'skills', label: 'Skills', icon: <Star className="w-4 h-4" /> },
    { type: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
    { type: 'projects', label: 'Projects', icon: <Award className="w-4 h-4" /> }
  ];

  if (!currentResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume not found</h2>
          <button onClick={onBack} className="btn-primary">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentResume.title}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isPreviewMode 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isPreviewMode ? 'Edit Mode' : 'Preview'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <ResumePreview resume={currentResume} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline Editor */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Resume Timeline</h2>
                  <div className="relative">
                    <button
                      onClick={() => setShowSectionEditor(false)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Section</span>
                    </button>
                    
                    {/* Add Section Dropdown */}
                    <AnimatePresence>
                      {showSectionEditor && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                        >
                          <div className="p-2">
                            {sectionTypes.map((sectionType) => (
                              <button
                                key={sectionType.type}
                                onClick={() => handleAddSection(sectionType.type)}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                {sectionType.icon}
                                <span>{sectionType.label}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {currentResume.sections.map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={section.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`relative ${snapshot.isDragging ? 'z-10' : ''}`}
                              >
                                <div className="relative">
                                  {/* Timeline Line */}
                                  <div className="timeline-line"></div>
                                  
                                  {/* Timeline Dot */}
                                  <div className="timeline-dot"></div>
                                  
                                  {/* Section Card */}
                                  <div
                                    className={`section-card ml-12 ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}`}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-center space-x-3 flex-1">
                                        {getSectionIcon(section.type)}
                                        <div className="flex-1">
                                          <h3 className="font-medium text-gray-900">
                                            {section.title}
                                          </h3>
                                          {section.subtitle && (
                                            <p className="text-sm text-gray-600">
                                              {section.subtitle}
                                            </p>
                                          )}
                                          {section.date && (
                                            <p className="text-xs text-gray-500 mt-1">
                                              {section.date}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="flex space-x-2">
                                        <button
                                          onClick={() => handleEditSection(section)}
                                          className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                                          title="Edit Section"
                                        >
                                          <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteSection(section.id)}
                                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                          title="Delete Section"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {section.content && (
                                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                        {section.content}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {currentResume.sections.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No sections yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start building your resume by adding sections
                    </p>
                    <button
                      onClick={() => setShowSectionEditor(false)}
                      className="btn-primary"
                    >
                      Add Your First Section
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Section Editor Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence>
                {selectedSection && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="card sticky top-8"
                  >
                    <SectionEditor
                      section={selectedSection}
                      onSave={(updatedSection) => {
                        dispatch({ type: 'UPDATE_SECTION', payload: updatedSection });
                        setSelectedSection(updatedSection);
                      }}
                      onClose={() => {
                        setSelectedSection(null);
                        setShowSectionEditor(false);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor; 