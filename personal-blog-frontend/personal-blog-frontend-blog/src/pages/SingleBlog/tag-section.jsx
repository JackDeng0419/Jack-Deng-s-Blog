import React from 'react';
import { Tag } from 'antd';
import './tag-section.scss';
import { withRouter } from 'react-router';
function TagSection(props) {
    return (
        <div className="tag-section">
            {props.tagsArray.map((tag) => (
                <Tag
                    color={tag.color}
                    style={{
                        cursor: 'pointer',
                        fontSize: '18px',
                        height: '25px',
                        lineHeight: '25px',
                        // marginBottom: '10px',
                    }}
                    onClick={() => {
                        props.history.push('/tags/' + tag.name, { tag });
                    }}>
                    {tag.name}
                </Tag>
            ))}
        </div>
    );
}

export default withRouter(TagSection);
