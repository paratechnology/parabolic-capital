import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = 'https://www.paraboliccapital.ng/resume/ezenwadi-valentine-2026/';

// Keep these case notes aligned with the eight products on Ezenwadi Valentine's portfolio page.
const cases = [
  {
    slug: 'quickprolaw', name: 'QuickProLaw', sector: 'Legal operations', surface: 'Website and web application',
    heading: 'Legal workflow interfaces.',
    lead: 'A daily workspace for legal teams, where matters, dates, documents, tasks, and finance need to feel connected rather than scattered.',
    image: 'quickprolaw-app-dashboard.png', imageAlt: 'QuickProLaw dashboard showing urgent work and calendar information', imageCaption: 'The operational dashboard brings the next actions into view.',
    context: 'Legal teams move between clients, matters, court dates, tasks, documents, and billing. The interface has to keep that complexity visible without making every screen feel heavy. My frontend focus was the structure of the workspace and the clarity of its daily actions.',
    steps: [
      ['Dashboard hierarchy', 'Structured urgent work, upcoming dates, stalled matters, and recent activity for rapid review.'],
      ['Connected records', 'Aligned matter, client, task, document, and finance views through consistent navigation and context.'],
      ['Operational detail', 'Addressed dense forms, tables, permissions, and mobile layouts as core product surfaces.']
    ],
    links: [['Public website', 'https://quickprolaw.com'], ['Web app', 'https://app.quickprolaw.com']]
  },
  {
    slug: 'quickprohost', name: 'QuickProHost', sector: 'Hospitality operations', surface: 'Guest booking and owner application',
    heading: 'Guest and owner journeys.',
    lead: 'A hospitality product with two distinct journeys: a guest deciding on a stay and an owner managing the operation behind it.',
    image: 'quickprohost-public-listing.jpg', imageAlt: 'QuickProHost property listing and booking interface', imageCaption: 'Public listing and booking are the guest-facing edge of a larger owner workflow.',
    context: 'A booking starts with discovery but quickly moves into availability, holds, payment, guest communication, and property operations. The frontend challenge was to keep those transitions understandable for both guests and owners.',
    steps: [
      ['Guest booking', 'Presented listing details, booking options, and next steps clearly before a guest commits.'],
      ['Owner operations', 'Organized property, unit, booking, finance, and staff views around daily decisions.'],
      ['Booking status', 'Distinguished requested, held, confirmed, paid, and completed stages throughout the booking lifecycle.']
    ],
    links: [['Public website', 'https://quickprohost.ng'], ['Web app', 'https://app.quickprohost.ng']]
  },
  {
    slug: 'philedger', name: 'PhiLedger', sector: 'Business operations', surface: 'Website, web app, Android, and desktop',
    heading: 'Business records across devices.',
    lead: 'An everyday operating surface for small businesses working across invoices, payments, products, stock, expenses, and reports.',
    image: 'philedger-app-dashboard.png', imageAlt: 'PhiLedger application dashboard with business activity and summary information', imageCaption: 'The dashboard prioritizes business signals and common next actions.',
    context: 'PhiLedger spans many records that need to be created, reviewed, and followed up. My frontend focus was making the system feel coherent as users move between sales, purchases, inventory, contacts, and reporting across screen sizes.',
    steps: [
      ['Consistent patterns', 'Applied consistent forms, statuses, and record views across business modules.'],
      ['Useful overview', 'Prioritized overdue invoices, low stock, recent activity, and operational totals on the dashboard.'],
      ['Device adaptation', 'Adapted navigation, data density, and primary actions for web, Android, and desktop contexts.']
    ],
    links: [['Public website', 'https://philedger.ng'], ['Web app', 'https://app.philedger.ng']]
  },
  {
    slug: 'qpl-sign', name: 'QPL Sign', sector: 'Document execution', surface: 'Public signing journey and product website',
    heading: 'A clear signer journey.',
    lead: 'A focused signing experience that lets a recipient review and complete a document without entering a legal team’s internal workspace.',
    image: 'qpl-sign-website.png', imageAlt: 'QPL Sign public product website', imageCaption: 'The public surface introduces a trust-sensitive signing journey.',
    context: 'Document execution carries a higher burden of clarity. Signers need to know what they are reviewing, which action is required, and whether the process is complete. The frontend role is to make those states plain and reassuring.',
    steps: [
      ['Process clarity', 'Separated review, action, and completion so signers can understand their progress.'],
      ['Public route', 'Kept the signer experience focused and distinct from the QuickProLaw internal workspace.'],
      ['Completion feedback', 'Used clear confirmation and evidence language for completion and verification states.']
    ],
    links: [['QPL Sign page', 'https://quickprolaw.com/qps']]
  },
  {
    slug: 'cityvibe', name: 'CityVibe', sector: 'Local commerce', surface: 'Consumer, business, and admin frontends',
    heading: 'Interfaces for distinct audiences.',
    lead: 'One product family spanning city discovery, venue activity, orders, reservations, and the tools businesses use to operate.',
    image: 'cityvibe-business-dashboard.png', imageAlt: 'City Vibe Business desktop dashboard showing venue overview, service queues and staff attendance', imageCaption: 'Venue overview, service queues and staff attendance in the desktop workspace.',
    imageWidth: 1920, imageHeight: 1200,
    context: 'CityVibe serves different people with different goals. Consumers want to discover and act quickly; venues need to manage activity; admins need oversight. My frontend focus was giving each audience a coherent surface while keeping shared objects and states recognizable.',
    steps: [
      ['Audience-specific flows', 'Separated discovery, business operations, and admin control with appropriate navigation and hierarchy.'],
      ['Connected actions', 'Connected venue detail to orders, reservations, events, and account activity.'],
      ['Live status', 'Made order and reservation changes visible in the interfaces used during operations.']
    ],
    links: [['Public website', 'https://vibe-0001.web.app'], ['Web app', 'https://vibe-app-761331655125.web.app']]
  },
  {
    slug: 'teddy-city-hotels', name: 'Teddy City Hotels', sector: 'Hotel experience', surface: 'Public website and hotel operations',
    heading: 'Guest and staff workflows.',
    lead: 'A guest-facing hotel presence connected to the practical work of rooms, bookings, amenities, food service, and staff operations.',
    image: 'teddy-city-hotels-website.png', imageAlt: 'Teddy City Hotels public website', imageCaption: 'The public website sets the first impression for the hotel.',
    context: 'Hospitality interfaces need to be warm and useful. Guests should understand what is available and how to book; staff need clear operational views behind that experience. My frontend lens connected those two sides without making the public site feel like an admin tool.',
    steps: [
      ['Public experience', 'Made rooms, amenities, and booking entry points easy to find on the public site.'],
      ['Staff operations', 'Organized room, booking, kitchen, swimming, snooker, and revenue views around daily use.'],
      ['Service status', 'Presented booking and service states so staff could identify the next action.']
    ],
    links: [['Public website', 'https://teddycityhotels.com']]
  },
  {
    slug: 'mufit-studio', name: 'MuFit Studio', sector: 'Fitness and membership', surface: 'Website, member app, and staff tools',
    heading: 'A mobile member experience.',
    lead: 'A fitness experience across class discovery, member bookings, credits, purchases, netball programmes, and attendance.',
    image: 'mufit-studio-website.jpg', imageAlt: 'MuFit Studio public website', imageCaption: 'The website introduces the studio before members enter their booking flow.',
    context: 'Members often book on a phone and expect fast feedback. Instructors and staff need a different view of sessions, rosters, check-ins, and member records. The frontend work brings those roles into one understandable experience.',
    steps: [
      ['Mobile booking', 'Kept schedules, availability, booking, cancellation, and credits readable on small screens.'],
      ['Action feedback', 'Made purchase, registration, and check-in outcomes clear to members.'],
      ['Role-specific views', 'Separated member actions from instructor and admin operations while preserving a consistent visual language.']
    ],
    links: [['Public website', 'https://www.mufits.com']]
  },
  {
    slug: 'pollingunit', name: 'PollingUnit', sector: 'Civic information', surface: 'Public search interface',
    heading: 'Accessible civic information.',
    lead: 'A direct path from a person’s query to readable polling-unit information, with search doing the heavy lifting.',
    image: 'pollingunit-product.png', imageAlt: 'PollingUnit search interface for civic information', imageCaption: 'A focused lookup surface keeps the public task simple.',
    context: 'Civic information only helps if people can find and understand it. My frontend focus was a low-friction lookup: input that guides the query, results that are easy to distinguish, and layouts that remain readable on a phone.',
    steps: [
      ['Search first', 'Made query entry and autocomplete the primary interaction.'],
      ['Readable results', 'Structured matching polling-unit records for scanning and comparison.'],
      ['Responsive access', 'Kept the public lookup simple and readable across devices.']
    ],
    links: [['Public website', 'https://pollingunit1.web.app']]
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function render(item, index) {
  const next = cases[(index + 1) % cases.length];
  const title = `${item.name} | Ezenwadi Valentine Frontend Case Note`;
  const url = `${base}projects/${item.slug}.html`;
  const imageDimensions = item.imageWidth && item.imageHeight
    ? ` width="${item.imageWidth}" height="${item.imageHeight}"` : '';
  const imageMeta = item.imageWidth && item.imageHeight
    ? `\n    <meta property="og:image:width" content="${item.imageWidth}" />\n    <meta property="og:image:height" content="${item.imageHeight}" />\n    <meta property="og:image:alt" content="${escapeHtml(item.imageAlt)}" />` : '';
  const links = item.links.map(([label, href]) => `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer nofollow">${escapeHtml(label)} ↗</a>`).join('');
  const steps = item.steps.map(([heading, body], i) => `<article class="ev-case-step"><span>0${i + 1}</span><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></article>`).join('');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeHtml(item.name)} frontend case note from Ezenwadi Valentine's lead frontend developer portfolio." />
    <meta name="theme-color" content="#111314" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(item.lead)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://www.paraboliccapital.ng/assets/resume/${escapeHtml(item.image)}" />${imageMeta}
    <meta name="twitter:card" content="summary_large_image" />
    <title>${escapeHtml(title)}</title>
    <link rel="icon" href="../../../favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../../../styles.css" />
    <link rel="stylesheet" href="../valentine.css" />
    <script src="../valentine.js" defer></script>
  </head>
  <body class="candidate-body ev-body">
    <a class="ev-skip" href="#main">Skip to content</a>
    <header class="ev-topbar ev-case-topbar">
      <a class="ev-brand" href="../" aria-label="Ezenwadi Valentine profile"><span>EV<span class="ev-brand-dot">.</span></span><strong>Ezenwadi Valentine</strong></a>
      <nav aria-label="Case navigation"><a href="../#work">All projects</a><a href="../../../index.html">Parabolic Capital</a></nav>
    </header>
    <main id="main">
      <section class="ev-case-hero" aria-labelledby="case-title">
        <div><p class="ev-case-overline">${escapeHtml(String(index + 1).padStart(2, '0'))} / Frontend case note · ${escapeHtml(item.sector)}</p><h1 id="case-title">${escapeHtml(item.name)}.</h1><p>${escapeHtml(item.lead)}</p></div>
        <dl class="ev-case-facts"><div><dt>Role</dt><dd>Lead frontend developer</dd></div><div><dt>Product surface</dt><dd>${escapeHtml(item.surface)}</dd></div><div><dt>Sector</dt><dd>${escapeHtml(item.sector)}</dd></div></dl>
      </section>
      <figure class="ev-case-media"><img src="../../../assets/resume/${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}"${imageDimensions} /><figcaption><span>${escapeHtml(item.name)} / Product view</span><span>${escapeHtml(item.imageCaption)}</span></figcaption></figure>
      <section class="ev-case-story" aria-labelledby="story-title"><div class="ev-section-label"><span>Frontend focus</span><span>Application design and implementation</span></div><div class="ev-case-story-grid"><h2 id="story-title">${escapeHtml(item.heading)}</h2><div><p class="ev-case-story-intro">${escapeHtml(item.context)}</p><div class="ev-case-steps">${steps}</div><div class="ev-case-related">${links}</div></div></div></section>
      <div class="ev-case-next"><span>Next project</span><a href="${escapeHtml(next.slug)}.html">${escapeHtml(next.name)} ↗</a></div>
    </main>
    <footer class="ev-footer"><a href="../">← Ezenwadi Valentine</a><a href="../#work">All projects</a><a href="../../../index.html">Parabolic Capital context ↗</a></footer>
  </body>
</html>
`;
}

for (const source of ['resume', path.join('apps', 'website', 'resume')]) {
  const target = path.join(root, source, 'ezenwadi-valentine-2026', 'projects');
  await mkdir(target, { recursive: true });
  for (const [index, item] of cases.entries()) {
    await writeFile(path.join(target, `${item.slug}.html`), render(item, index), 'utf8');
  }
}

console.log(`Generated ${cases.length} Ezenwadi Valentine case notes in root and website source.`);
