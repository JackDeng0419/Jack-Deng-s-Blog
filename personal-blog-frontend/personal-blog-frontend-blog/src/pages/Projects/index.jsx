import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import SectionIntro from '../../components/SectionIntro';
import ProjectBoard from './project-board';

export default function Projects() {
    const title = 'Projects';
    const desc =
        'A few highlights of my open-source projects. View them all on GitHub.';

    const [projectList, setProjectList] = useState([]);

    const fetchProjectList = async () => {
        const result = {
            status: 0,
            data: [
                {
                    _id: Date.now(),
                    name: 'Take note',
                    desc: 'This is a note taking website.',
                    write_up_id: '618d19b90676fdcc6ceb4397',
                    source_url:
                        'https://github.com/JackNeedFocus/atcrowdfunding',
                    demo_url: 'https://www.baidu.com/',
                },
                {
                    _id: Date.now(),
                    name: 'Take note',
                    desc: 'This is a note taking website.',
                    write_up_id: '618d19b90676fdcc6ceb4397',
                    source_url:
                        'https://github.com/JackNeedFocus/atcrowdfunding',
                    demo_url: 'https://www.baidu.com/',
                },
                {
                    _id: Date.now(),
                    name: 'Take note',
                    desc: 'This is a note taking website.',
                    write_up_id: '618d19b90676fdcc6ceb4397',
                    source_url:
                        'https://github.com/JackNeedFocus/atcrowdfunding',
                    demo_url: '',
                },
                {
                    _id: Date.now(),
                    name: 'Take note',
                    desc: 'This is a note taking website.',
                    write_up_id: '',
                    source_url:
                        'https://github.com/JackNeedFocus/atcrowdfunding',
                    demo_url: '',
                },
                {
                    _id: Date.now(),
                    name: 'Take note',
                    desc: 'This is a note taking website.',
                    write_up_id: '618d19b90676fdcc6ceb4397',
                    source_url:
                        'https://github.com/JackNeedFocus/atcrowdfunding',
                    demo_url: 'https://www.baidu.com/',
                },
            ],
        };
        if (result.status === 0) {
            setProjectList(result.data);
        } else {
            message.error(result.msg);
        }
    };

    useEffect(() => {
        fetchProjectList();
    }, []);
    return (
        <div>
            <SectionIntro title={title} desc={desc}></SectionIntro>
            <ProjectBoard projects={projectList}></ProjectBoard>
        </div>
    );
}
