import React from 'react';
import './index.scss';
import { withRouter } from 'react-router';

function ProjectCard(props) {
    const { project } = props;

    const goToWriteUp = (blog_id) => {
        if (blog_id === '' || blog_id === null) {
            return;
        } else {
            props.history.push('singleBlog/' + blog_id);
        }
    };

    const openNewTab = (url) => {
        window.open(url, '_blank').focus();
    };

    return (
        <>
            <div className="project">
                <h2 className="name">{project.name}</h2>
                <ul className="links">
                    {project.write_up_id === '' ||
                    project.write_up_id === null ? null : (
                        <li
                            onClick={() => {
                                goToWriteUp(project.write_up_id);
                            }}>
                            Write-up
                        </li>
                    )}
                    {project.source_url === '' ||
                    project.source_url === null ? null : (
                        <li
                            onClick={() => {
                                openNewTab(project.source_url);
                            }}>
                            Source
                        </li>
                    )}
                    {project.demo_url === '' ||
                    project.demo_url === null ? null : (
                        <li
                            onClick={() => {
                                openNewTab(project.demo_url);
                            }}>
                            Demo
                        </li>
                    )}
                </ul>
                <p className="desc">{project.desc}</p>
            </div>
        </>
    );
}
export default withRouter(ProjectCard);
