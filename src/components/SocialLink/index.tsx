import Image from 'next/image';
import React from 'react';
import { SocialLink } from '../Hero/interface';

function SocialLinks({ icon }: SocialLink) {
  return (
    <Image
      src={icon}
      width={500} // Adjust the width value in pixels
      height={500} // Height value will be auto
      alt="icon/social"
      className="w-7 h-8 flex items-center cursor-pointer md:w-6 md:h-6 sm:w-5 sm:h-5 transition-all duration-200 hover:scale-110 "
    />
  );
}

export default SocialLinks;
