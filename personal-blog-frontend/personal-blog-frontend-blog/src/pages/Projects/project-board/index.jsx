import React, { useEffect } from 'react';
import ProjectCard from '../project-card';
import './index.scss';

export default function ProjectBoard(props) {
    // useEffect(()=>{

    // }. [props.projects])
    const { projects } = props;
    return (
        <div id="project-board">
            {/* <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard> */}
            {projects.map((project) => (
                <ProjectCard project={project}></ProjectCard>
            ))}
        </div>
    );
}
