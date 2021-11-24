import React from 'react';
import SectionIntro from '../../components/SectionIntro';

export default function AboutMe() {
    const title = 'About me';
    const desc =
        'Software engineer, open-sourcerer, student in XMUM Software engineer, open-sourcerer, student in XMUM Software engineer, open-sourcerer, student in XMUM Software engineer, open-sourcerer, student in XMUMSoftware engineer, open-sourcerer, student in XMUM Software engineer, open-sourcerer, student in XMUM';

    return (
        <>
            <SectionIntro title={title} desc={desc}></SectionIntro>
        </>
    );
}
