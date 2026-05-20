import React, { useState, useRef } from 'react';
import CaseStudyOverlay from './CaseStudyOverlay';
import './react-components.css';

interface ProjectSliderProps {
  projects: any[];
}

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="project-slider-wrapper">
      <div className="slider-controls">
        <button onClick={scrollLeft} className="slider-btn" aria-label="Scroll left">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button onClick={scrollRight} className="slider-btn" aria-label="Scroll right">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="project-slider" ref={sliderRef}>
        {projects.map((project, idx) => (
          <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
            <div className="project-card-image">
              <div className="project-icon-overlay">
                <i className={project.icon}></i>
              </div>
            </div>
            <div className="project-card-content">
              <div className="project-category">{project.category}</div>
              <h3 className="project-title">{project.title}</h3>
              <div className="project-tags">
                {project.tech.map((t: string) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="project-card-hover-msg">
              <span>View Case Study</span>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <CaseStudyOverlay 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
