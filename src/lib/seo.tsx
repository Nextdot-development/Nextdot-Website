import { useEffect } from 'react';

const SITE_URL = 'https://nextdot.co.in';
const SITE_NAME = 'Nextdot';
const LEGAL_NAME = 'Nextdot';
const DEFAULT_IMAGE = `${SITE_URL}/images/logo.png`;
const CONTACT_EMAIL = 'contact@nextdot.co.in';

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  breadcrumbs?: { name: string; url: string }[];
};

function setMetaTag(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}='${name}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEO({title, description, path='/', image, breadcrumbs}: SEOProps) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
    document.title = `${title} | ${SITE_NAME}`;

    // canonical link
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.href = canonical;

    // Basic meta
    setMetaTag('description', description);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:url', canonical, 'property');
    setMetaTag('og:image', image || DEFAULT_IMAGE, 'property');
    setMetaTag('og:site_name', SITE_NAME, 'property');

    // JSON-LD structured data: Organization + Website + WebPage + Breadcrumbs
    const sdId = 'site-structured-data';
    let sd = document.getElementById(sdId) as HTMLScriptElement | null;
    const breadcrumbsList = (breadcrumbs || []).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.url === '/' ? '' : b.url}`,
    }));

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}#organization`,
          'name': SITE_NAME,
          'legalName': LEGAL_NAME,
          'alternateName': ['Nextdot AI Capability Center', 'Nextdot AI'],
          'url': SITE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': DEFAULT_IMAGE,
          },
          'email': CONTACT_EMAIL,
          'sameAs': [
            'https://www.linkedin.com/company/nextdot-in/',
            'https://www.instagram.com/nextdot_in/',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}#website`,
          'url': SITE_URL,
          'name': SITE_NAME,
          'publisher': { '@id': `${SITE_URL}#organization` },
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${SITE_URL}/blogs?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'WebPage',
          '@id': canonical + '#webpage',
          'url': canonical,
          'name': title,
          'description': description,
          'isPartOf': { '@id': `${SITE_URL}#website` },
        },
      ],
    } as any;

    if (breadcrumbsList.length) {
      jsonLd['@graph'].push({
        '@type': 'BreadcrumbList',
        '@id': canonical + '#breadcrumb',
        'itemListElement': breadcrumbsList,
      });
    }

    if (!sd) {
      sd = document.createElement('script');
      sd.id = sdId;
      sd.type = 'application/ld+json';
      document.head.appendChild(sd);
    }
    sd.text = JSON.stringify(jsonLd);

    return () => {
      // optional cleanup not to remove canonical/meta persistently
    };
  }, [title, description, path, image, breadcrumbs]);

  return null;
}
