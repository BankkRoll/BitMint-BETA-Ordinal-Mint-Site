// components/SocialLinks.tsx
import React from 'react';
import constants from '../../const/config';

// Social links (remove any you don't want to show by simply deleting the line)
const socialLinksArray: { link: string; svgPath: string; }[] = [];
const { twitter, instagram, discord, telegram, email, website } = constants.socialLinks;
if (twitter) socialLinksArray.push({link: twitter, svgPath: "/images/twitter.svg"});
if (instagram) socialLinksArray.push({link: instagram, svgPath: "/images/instagram.svg"});
if (discord) socialLinksArray.push({link: discord, svgPath: "/images/discord.svg"});
if (telegram) socialLinksArray.push({link: telegram, svgPath: "/images/telegram.svg"});
if (website) socialLinksArray.push({link: website, svgPath: "/images/website.svg"});
if (email) socialLinksArray.push({link: email, svgPath: "/images/email.svg"});

const SocialLinks: React.FC = () => {
  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mt-6">
      {socialLinksArray.map(({link, svgPath}, i) => (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          key={i}
          className="mt-12 flex items-center justify-center transform transition-transform duration-500 hover:scale-125"
        >
          <img src={svgPath} className="w-6 h-6 sm:w-6 sm:h-6" alt="" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

