import React from 'react';
import './ClientLogos.css';
import { logoFiles } from '@/lib/logos';
import { publicAsset } from '@/lib/utils';

export const ClientLogos = () => {
  const row1: string[] = [];
  const row2: string[] = [];
  const row3: string[] = [];

  logoFiles.forEach((logo, index) => {
    if (index % 3 === 0) row1.push(logo);
    else if (index % 3 === 1) row2.push(logo);
    else row3.push(logo);
  });

  const renderRow = (logos: string[], direction: 'left' | 'right') => {
    const repeated = [...logos, ...logos, ...logos];

    return (
      <div className="marquee-container py-1.5 md:py-2">
        <div className={`marquee-content scroll-${direction} gap-3 md:gap-4 pr-3 md:pr-4`}>
          {repeated.map((logo, idx) => (
            <div key={`row-a-${logo}-${idx}`} className="logo-cell">
              <img
                src={publicAsset(`images/logos/${logo}`)}
                alt={`Client logo ${idx + 1}`}
                className="client-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className={`marquee-content scroll-${direction} gap-3 md:gap-4 pr-3 md:pr-4`} aria-hidden="true">
          {repeated.map((logo, idx) => (
            <div key={`row-b-${logo}-${idx}`} className="logo-cell">
              <img
                src={publicAsset(`images/logos/${logo}`)}
                alt={`Client logo ${idx + 1}`}
                className="client-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col gap-2 md:gap-3 lg:hidden">
        {renderRow([...row1, ...row3], 'left')}
        {renderRow(row2, 'right')}
      </div>

      <div className="hidden lg:flex lg:flex-col lg:gap-2">
        {renderRow(row1, 'left')}
        {renderRow(row2, 'right')}
        {renderRow(row3, 'left')}
      </div>
    </div>
  );
};
