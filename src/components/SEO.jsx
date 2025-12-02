import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = 'Arbaz | Senior Full-Stack Software Engineer';
    const defaultDescription = 'Arbaz - Senior Full-Stack Software Engineer specializing in React, React Native, Laravel, and Node.js. 5+ years of experience building scalable applications.';
    const defaultKeywords = 'Full-Stack Developer, React, React Native, Laravel, Node.js, Mobile Development, Web Development';
    const defaultImage = '/favicon.jpg'; // Assuming favicon or a specific OG image
    const siteUrl = 'https://arbaz.dev'; // Replace with actual URL if known, or pass as prop

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title ? `${title} | Arbaz` : siteTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            <meta name='keywords' content={keywords || defaultKeywords} />
            <meta name='author' content='Arbaz' />

            {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
            <meta property='og:title' content={title || siteTitle} />
            <meta property='og:description' content={description || defaultDescription} />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={url || siteUrl} />
            <meta property='og:image' content={image || defaultImage} />

            {/* Twitter Card tags */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={title || siteTitle} />
            <meta name='twitter:description' content={description || defaultDescription} />
            <meta name='twitter:image' content={image || defaultImage} />
        </Helmet>
    );
};

export default SEO;
