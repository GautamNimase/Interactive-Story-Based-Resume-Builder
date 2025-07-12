import React, { createContext, useContext, useReducer } from 'react';

const ResumeContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  resumes: [
    {
      id: '1',
      title: 'Software Developer Resume',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      sections: [
        {
          id: '1',
          type: 'header',
          title: 'John Doe',
          subtitle: 'Software Developer',
          content: 'Passionate software developer with 5+ years of experience in web development.',
          order: 0
        },
        {
          id: '2',
          type: 'experience',
          title: 'Senior Developer',
          subtitle: 'Tech Corp',
          content: 'Led development of multiple web applications using React and Node.js.',
          date: '2022-2024',
          order: 1
        },
        {
          id: '3',
          type: 'education',
          title: 'Bachelor of Computer Science',
          subtitle: 'University of Technology',
          content: 'Graduated with honors, specialized in software engineering.',
          date: '2018-2022',
          order: 2
        },
        {
          id: '4',
          type: 'skills',
          title: 'Technical Skills',
          content: 'React, Node.js, TypeScript, Python, AWS, Docker',
          order: 3
        }
      ]
    }
  ],
  currentResume: null,
  isPreviewMode: false
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    
    case 'SET_CURRENT_RESUME':
      return {
        ...state,
        currentResume: action.payload
      };
    
    case 'ADD_RESUME':
      return {
        ...state,
        resumes: [...state.resumes, action.payload]
      };
    
    case 'UPDATE_RESUME':
      return {
        ...state,
        resumes: state.resumes.map(resume => 
          resume.id === action.payload.id ? action.payload : resume
        ),
        currentResume: state.currentResume?.id === action.payload.id ? action.payload : state.currentResume
      };
    
    case 'DELETE_RESUME':
      return {
        ...state,
        resumes: state.resumes.filter(resume => resume.id !== action.payload),
        currentResume: state.currentResume?.id === action.payload ? null : state.currentResume
      };
    
    case 'ADD_SECTION':
      const updatedResume = {
        ...state.currentResume,
        sections: [...state.currentResume.sections, action.payload]
      };
      return {
        ...state,
        currentResume: updatedResume,
        resumes: state.resumes.map(resume => 
          resume.id === updatedResume.id ? updatedResume : resume
        )
      };
    
    case 'UPDATE_SECTION':
      const resumeWithUpdatedSection = {
        ...state.currentResume,
        sections: state.currentResume.sections.map(section =>
          section.id === action.payload.id ? action.payload : section
        )
      };
      return {
        ...state,
        currentResume: resumeWithUpdatedSection,
        resumes: state.resumes.map(resume => 
          resume.id === resumeWithUpdatedSection.id ? resumeWithUpdatedSection : resume
        )
      };
    
    case 'DELETE_SECTION':
      const resumeWithDeletedSection = {
        ...state.currentResume,
        sections: state.currentResume.sections.filter(section => section.id !== action.payload)
      };
      return {
        ...state,
        currentResume: resumeWithDeletedSection,
        resumes: state.resumes.map(resume => 
          resume.id === resumeWithDeletedSection.id ? resumeWithDeletedSection : resume
        )
      };
    
    case 'REORDER_SECTIONS':
      const resumeWithReorderedSections = {
        ...state.currentResume,
        sections: action.payload
      };
      return {
        ...state,
        currentResume: resumeWithReorderedSections,
        resumes: state.resumes.map(resume => 
          resume.id === resumeWithReorderedSections.id ? resumeWithReorderedSections : resume
        )
      };
    
    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        isPreviewMode: !state.isPreviewMode
      };
    
    default:
      return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}; 