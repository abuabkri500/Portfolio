import React, { useState, useEffect, useRef } from 'react';
import "./../styles/RecentProjects.css";
import gsap from 'gsap';

const RecentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // initialize GSAP loop after projects rendered
    if (!trackRef.current || projects.length === 0) return;

    const track = trackRef.current;
    const container = containerRef.current;

    // remove any previous clones/animation
    gsap.killTweensOf(track);
    animationRef.current && animationRef.current.kill && animationRef.current.kill();

    // ensure there's enough content to create a seamless loop by cloning
    // clones until track width >= container width * 2
    // first remove previous clone nodes (we mark them with data-clone)
    Array.from(track.querySelectorAll('[data-clone="true"]')).forEach(n => n.remove());

    const makeClones = () => {
      let totalWidth = track.scrollWidth;
      const containerWidth = container.offsetWidth;
      let i = 0;
      const children = Array.from(track.children).filter(c => !c.dataset.clone);
      while (totalWidth < containerWidth * 2 && i < 20) {
        children.forEach((child) => {
          const clone = child.cloneNode(true);
          clone.setAttribute('data-clone', 'true');
          track.appendChild(clone);
        });
        totalWidth = track.scrollWidth;
        i += 1;
      }
      return totalWidth;
    };

    const totalWidth = makeClones();
    const speed = Math.max(10, totalWidth / 150); // lower is faster

    // animate using GSAP -- move left by half the track (original content width)
    const animate = gsap.to(track, {
      x: -totalWidth / 2,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => x) // keep as px
      }
    });

    animationRef.current = animate;

    // pause on hover
    const onEnter = () => animate.pause();
    const onLeave = () => animate.play();
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    // cleanup
    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      animate.kill();
      Array.from(track.querySelectorAll('[data-clone="true"]')).forEach(n => n.remove());
    };
  }, [projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/get-recent-projects`);
      const result = await response.json();
      if (response.ok) {
        setProjects(result.projects || []);
      } else {
        setError(result.message || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Error fetching projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='projects' className="recent-projects">
      <h2>Recent Projects</h2>
      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="projects-carousel" ref={containerRef}>
          <div className="carousel-track" ref={trackRef}>
            {projects.length === 0 ? (
              <p>No projects available.</p>
            ) : (
              projects.map((project, index) => (
                <div key={`${project._id}-${index}`} className="project-card">
                  <img src={project.profilePicture} alt={project.projectTitle} />
                  <div className="project-info">
                    <h3>{project.projectTitle}</h3>
                    <p>{project.projectDescription}</p>
                    <button onClick={() => project.projectLink && window.open(project.projectLink, '_blank')} className="view-project-btn">
                      View Project
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
