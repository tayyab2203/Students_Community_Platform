import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#F3F4F6] p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-bold text-[#111827]">{project.title}</h4>
      <p className="text-[#1F2937]">{project.description}</p>
      {project.live_link && (
        <a href={project.live_link} className="text-[#1E3D99]" target="_blank" rel="noopener noreferrer">
          Live Link
        </a>
      )}
    </div>
  );
};

export default ProjectCard;