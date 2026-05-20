import React, { useEffect } from 'react';
import './react-components.css';

interface CaseStudyProps {
  project: any;
  onClose: () => void;
}

export default function CaseStudyOverlay({ project, onClose }: CaseStudyProps) {
  useEffect(() => {
    // Prevent scrolling on body when overlay is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  const handleCtaClick = () => {
    onClose();
    // Assuming goToSection is available globally
    if (typeof window !== 'undefined' && (window as any).goToSection) {
      setTimeout(() => (window as any).goToSection('#contact'), 300);
    }
  };

  return (
    <div className="case-study-overlay open">
      <div className="case-study-backdrop" onClick={onClose}></div>
      <div className="case-study-content">
        <button className="case-study-close" onClick={onClose} aria-label="Close Case Study">
          <i className="fa-solid fa-arrow-left"></i> 
          <span data-i18n="case_study_back">Back to Projects</span>
        </button>

        <div className="case-study-header">
          <div className="case-study-icon">
            <i className={project.icon}></i>
          </div>
          <div>
            <h3 className="case-study-title">{project.title}</h3>
            <div className="case-study-category">{project.category}</div>
          </div>
        </div>

        <div className="case-study-body">
          <div className="cs-section">
            <h4 className="cs-label">The Problem</h4>
            <p className="cs-text">{project.caseStudy.problem}</p>
          </div>
          
          <div className="cs-section">
            <h4 className="cs-label">The Solution</h4>
            <p className="cs-text">{project.caseStudy.solution}</p>
          </div>

          <div className="cs-section highlight">
            <h4 className="cs-label"><i className="fa-solid fa-chart-line"></i> The ROI</h4>
            <p className="cs-text">{project.caseStudy.roi}</p>
          </div>
        </div>

        <div className="case-study-footer">
          <button className="btn-primary w-full" onClick={handleCtaClick}>
            <span data-i18n="case_study_cta">Start a Similar Project</span>
            <i className="fa-solid fa-arrow-right" style={{marginLeft: '8px'}}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
