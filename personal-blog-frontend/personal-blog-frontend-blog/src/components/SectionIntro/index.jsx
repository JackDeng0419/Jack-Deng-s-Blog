import React from 'react';
import './index.scss';

export default function SectionIntro(props) {
    return (
        <div className="section-intro">
            <h1 className="title">{props.title}</h1>
            <p className="desc">{props.desc}</p>
        </div>
    );
}
