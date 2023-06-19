// pages/index.tsx
import React from 'react';
import Mint from '../components/Mint';
import Head from 'next/head';
import constants from '../../const/config';

const HomePage = () => {
    const imageUrl = `${constants.socialLinks.website}/${constants.collectionImage}`;

    return (
        <div>
            <Head>
                <title>{constants.title}</title>

                <meta name="description" content={constants.description} />
                <meta name="keywords" content="BitMint, bitcoin, ordinals, unisat, xverse, inscribed, minting, boilerplate"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={constants.socialLinks.website} />
                <meta property="og:title" content={constants.title} />
                <meta property="og:description" content={constants.description} />
                <meta property="og:image" content={imageUrl} />
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={constants.socialLinks.website} />
                <meta property="twitter:title" content={constants.title} />
                <meta property="twitter:description" content={constants.description} />
                <meta property="twitter:image" content={imageUrl} />
                {/* PWA primary color */}
                <meta name="theme-color" content="#000000"/>
                {/* Link tags */}
                <link rel="canonical" href={constants.socialLinks.website} />
                {/* Google / Search Engine Tags */}
                <meta itemProp="name" content={constants.title} />
                <meta itemProp="description" content={constants.description} />
                {/* GitHub Link */}
                <meta name="author" content="https://github.com/BankkRoll/BitMint-BETA-Ordinal-Mint-Site" />
            </Head>
            <main className="bg-black">
                <Mint />
            </main>
        </div>
    );
}

export default HomePage;
