import React from 'react';
import './ClientLogos.css';
import { logoFiles } from '@/lib/logos';
import { publicAsset } from '@/lib/utils';

// Derive a human-readable brand name from a logo filename so screen readers and
// search engines get the actual client, not a generic "logo 1". Falls back to a
// descriptive label when the filename carries no name (e.g. "3.png").
const prettifyLogoName = (file: string): string => {
  const base = file
    .replace(/\.[a-z0-9]+$/i, '')   // strip extension
    .replace(/\(\d+\)/g, '')         // drop "(1)" duplicate markers
    .replace(/[-_]+/g, ' ')          // dashes/underscores → spaces
    .replace(/\blogo\b/gi, '')       // drop the word "logo"
    .replace(/\s+\d+\s*$/g, '')      // drop trailing standalone numbers
    .replace(/\s+/g, ' ')
    .trim();
  if (!base || /^\d+$/.test(base)) return 'Nextdot client company';
  return base;
};

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
          {repeated.map((logo, idx) => {
            // The marquee triples the list for a seamless loop; only announce the
            // first copy of each logo and hide the visual duplicates from AT.
            const isOriginal = idx < logos.length;
            return (
              <div key={`row-a-${logo}-${idx}`} className="logo-cell" aria-hidden={isOriginal ? undefined : true}>
                <img
                  src={publicAsset(`images/logos/${logo}`)}
                  alt={isOriginal ? `${prettifyLogoName(logo)} logo` : ''}
                  className="client-logo"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        <div className={`marquee-content scroll-${direction} gap-3 md:gap-4 pr-3 md:pr-4`} aria-hidden="true">
          {repeated.map((logo, idx) => (
            <div key={`row-b-${logo}-${idx}`} className="logo-cell">
              <img
                src={publicAsset(`images/logos/${logo}`)}
                alt=""
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
