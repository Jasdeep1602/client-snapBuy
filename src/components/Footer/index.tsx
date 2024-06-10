import React from 'react';

import { FooterProps } from './interface';

function Footer({ footerAPI: { sections } }: FooterProps) {
  return (
    <footer className="bg-theme pt-7 pb-5">
      <div className="nike-container text-slate-200">
        <div className="grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5">
          {sections.map(({ id, title, links }) => (
            <div key={id} className="grid items-center">
              <h1 className="text-lg lg:text-base md:text-sm uppercase font-semibold">{title}</h1>
              <ul className="grid items-center gap-1">
                {links.map(({ link }) => (
                  <li key={link} className="text-sm sm:text-xm">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <p className="text-sm md:text-center">
            Copyright<sup className="text-base font-bold">&copy;</sup> All Reserved Rights{' '}
            <span className="font-semibold">EDITH </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
