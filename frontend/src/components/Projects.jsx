import React, { useState } from 'react';
import { PROJECTS } from '../data/constants';
import { ExternalLink, Sparkles, FolderGit2, X } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-slate-950/40 relative border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Portfolio Demo
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A showcase of software systems, web platforms, and AI architectures engineered by our team.
          </p>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-purple-300 text-xs font-medium">
                    {project.category}
                  </span>
                  <FolderGit2 className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-600/50 text-slate-200 hover:text-white text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>View Project Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demonstration Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 inline-flex items-center gap-1.5 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800/60">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Note: These showcase projects represent architectural demonstration solutions engineered by Afresh IT.
          </p>
        </div>

      </div>

      {/* Project Modal Preview */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-card max-w-lg w-full rounded-2xl p-6 border border-slate-700 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-300 text-xs font-medium">
              {selectedProject.category}
            </span>

            <h3 className="text-2xl font-bold text-white mt-3 mb-3">{selectedProject.title}</h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-semibold text-slate-400 uppercase">Technologies Used</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-purple-300 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
