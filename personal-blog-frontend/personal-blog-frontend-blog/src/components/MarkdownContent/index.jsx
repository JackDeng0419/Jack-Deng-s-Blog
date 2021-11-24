import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './markdown-content.scss';
import 'github-markdown-css';

export default function MarkdownContent(props) {
    useEffect(() => {
        // console.log(props.content);
    });
    return (
        <div className="markdown-body " id="article-area">
            <ReactMarkdown className="markdown-content">
                {props.content}
            </ReactMarkdown>
        </div>
    );
}
