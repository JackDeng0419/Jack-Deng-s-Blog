import React from 'react';
import './tag-basic-info.scss';

export default function TagBasicInfo(props) {
    return (
        <div className="tag-basic-info">
            <h1>
                Posts tagged: <span>{props.tag.name}</span>
            </h1>
            <p>{props.tag.blog_num} posts founded</p>
        </div>
    );
}
