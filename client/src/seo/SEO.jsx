import { Helmet } from 'react-helmet-async';

/**
 * SEO Component — Webify Pro
 * Injects all meta tags, Open Graph, Twitter Card, Geo tags,
 * and JSON-LD structured data directly into <head> at runtime.
 *
 * Usage: <SEO /> — just drop it anywhere inside your app tree.
 * You can also pass props to override defaults for sub-pages.
 */
const SEO = ({
  title = 'Webify Pro | Web Development & Digital Marketing',
  description = 'Looking for the best web designer in Sialkot? Webify Pro offers expert web development, digital marketing, and SEO in Sialkot, Pakistan. Get a stunning website today!',
  keywords = [
    'web design Sialkot',
    'web developer Pakistan',
    'MERN stack developer',
    'digital marketing Sialkot',
    'Webify Pro',
  ].join(', '),
  url = 'https://www.webifypro.live/',
  image = 'https://www.webifypro.live/favicon.png',
  siteName = 'Webify Pro',
  twitterHandle = '@webifypro',
}) => {

  // ── JSON-LD: LocalBusiness ────────────────────────────────────────────────
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: 'Webify Pro',
    alternateName: 'Webify Pro Sialkot',
    description: 'Best web design and digital marketing agency in Sialkot, Pakistan. Expert in React, Node.js, MERN stack, SEO, and social media marketing.',
    url: 'https://www.webifypro.live',
    image: 'https://www.webifypro.live/favicon.png',
    logo: 'https://www.webifypro.live/favicon.png',
    founder: 'Musab Iftikhar',
    telephone: '+92-370-8316591',
    email: 'webifypro9@gmail.com',
    priceRange: '$$',
    currenciesAccepted: 'PKR, USD',
    paymentAccepted: 'Cash, Bank Transfer, JazzCash, EasyPaisa',
    openingHours: 'Mo-Sa 09:00-20:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sialkot',
      addressLocality: 'Sialkot',
      addressRegion: 'Punjab',
      postalCode: '51310',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.4945,
      longitude: 74.5229,
    },
    areaServed: [
      { '@type': 'City', name: 'Sialkot' },
      { '@type': 'City', name: 'Gujranwala' },
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web & Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design & Development',
            description: 'Professional website design and development using React, Node.js, and MERN stack.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description: 'SEO, social media marketing, Google Ads, and Facebook Ads management.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Development',
            description: 'Full-featured online store development with payment gateway integration.',
          },
        },
      ],
    },
    sameAs: [
      'https://www.facebook.com/webify.pro/',
      'https://www.instagram.com/webifypro',
      'https://www.linkedin.com/in/musab-iftikhar-94668a330',
      'https://github.com/musab-18',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    knowsAbout: [
      'Web Design',
      'Web Development',
      'React.js',
      'Node.js',
      'MERN Stack',
      'Digital Marketing',
      'SEO',
      'Social Media Marketing',
      'E-commerce Development',
    ],
  };

  // ── JSON-LD: FAQ ──────────────────────────────────────────────────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is the best web designer in Sialkot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Webify Pro is widely regarded as the best web designer in Sialkot, offering premium website design, React development, and digital marketing services with 50+ successful projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a website cost in Sialkot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At Webify Pro, website pricing starts from affordable packages. Basic websites start from PKR 15,000 and custom MERN stack web applications are priced based on project requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide digital marketing services in Sialkot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Webify Pro offers complete digital marketing services in Sialkot including SEO, social media marketing, Google Ads, Facebook Ads, and content creation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Webify Pro build an ecommerce website in Sialkot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Webify Pro specializes in building full-featured ecommerce websites with payment gateway integration, product management, and mobile-responsive design.',
        },
      },
    ],
  };

  return (
    <Helmet>
      {/* ── Primary Meta Tags ──────────────────────────────────────────────── */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Webify Pro — Musab Iftikhar" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="category" content="Web Design, Digital Marketing" />

      {/* ── Canonical ─────────────────────────────────────────────────────── */}
      <link rel="canonical" href={url} />

      {/* ── Geo Tags ──────────────────────────────────────────────────────── */}
      <meta name="geo.region" content="PK-PB" />
      <meta name="geo.placename" content="Sialkot, Punjab, Pakistan" />
      <meta name="geo.position" content="32.4945;74.5229" />
      <meta name="ICBM" content="32.4945, 74.5229" />

      {/* ── Open Graph / Facebook ─────────────────────────────────────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Webify Pro — Best Web Designer in Sialkot" />
      <meta property="og:locale" content="en_US" />

      {/* ── Twitter Card ──────────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Webify Pro — Best Web Designer in Sialkot" />

      {/* ── Mobile / Theme ────────────────────────────────────────────────── */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-title" content="Webify Pro" />
      <meta name="application-name" content="Webify Pro" />

      {/* ── JSON-LD: LocalBusiness ────────────────────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>

      {/* ── JSON-LD: FAQ (huge SEO boost for featured snippets) ───────────── */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
