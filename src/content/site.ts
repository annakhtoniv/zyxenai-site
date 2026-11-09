/**
 * SITE CONTENT
 * Every word on the site lives in this file. Edit the text between the quotes
 * and save. You never need to open a component to change copy.
 *
 * Rules that apply to anything written here are in CLAUDE.md
 * (codenames only, no invented numbers, honest statuses, no personal details).
 */
import type { ProductAccent } from '../theme/tokens'

export type ProductIcon = 'flame' | 'moon' | 'compass' | 'gear' | 'funnel' | 'radar' | 'book'

export interface Product {
  index: string
  /** Used for anchors. Lowercase, no spaces. */
  id: string
  name: string
  /** Shows the small CODENAME tag. */
  codename: boolean
  teaser: string
  bullets: readonly [string, string, string]
  status: string
  accent: ProductAccent
  icon: ProductIcon
}

export const site = {
  brand: 'ZYXENAI',
  /** The wordmark is drawn as two parts so the second can take the accent colour. */
  wordmark: { main: 'ZYXEN', accent: 'AI' },
  url: 'https://zyxenai.com',
  description:
    'ZYXENAI is an AI systems lab in Dubai. Seven systems in development. Early access is open.',

  /** The one contact address. Every email button and copy button reads it from here. */
  email: 'vinoth@zyxenai.com',
  emailSubjects: {
    general: 'Early access request',
    /** Used as "Early access: <product name>". */
    productPrefix: 'Early access: ',
  },
  copyLabels: { copy: 'Copy address', copied: 'Copied' },

  announcement: {
    text: 'Seven systems in development. Early access is open.',
    href: '#access',
  },

  nav: {
    links: [
      { label: 'Vision', href: '#vision' },
      { label: 'Products', href: '#lab' },
      { label: 'Method', href: '#method' },
      { label: 'Academy', href: '#academy' },
    ],
    cta: 'Get early access',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  hero: {
    label: 'ZYXENAI // AI SYSTEMS LAB // DUBAI',
    headline: 'We build AI that does the work.',
    subline:
      'Seven systems in development. One obsession: turning slow, manual work into something that runs itself.',
    primaryCta: 'Get early access',
    secondaryCta: "See what's inside",
    secondaryHref: '#lab',
    addressLead: 'Or write to',
    scrollCue: 'Scroll',
    /** Small texture labels in the corners of the hero. */
    details: ['25.2048 N / 55.2708 E', 'SYSTEMS 07', 'STATUS: DECLASSIFYING'],
  },

  marquee: ['AGENTS', 'AUTOMATION', 'VOICE', 'LEARNING', 'DELIVERY', 'WELLBEING'],

  vision: {
    label: 'VISION',
    statements: [
      'Most AI demos impress. Few survive a Monday morning.',
      'We build narrow, reliable systems with a human always in control.',
      'Then we ship them.',
    ],
  },

  lab: {
    label: 'THE LAB',
    intro: "Seven systems. Some you can see. Some you'll have to ask about.",
    codenameTag: 'CODENAME',
    lookInside: 'Request a look inside',
  },

  products: [
    {
      index: '01',
      id: 'vigil',
      name: 'VIGIL',
      codename: true,
      teaser: 'Forty days. One circle. Nobody drifts.',
      bullets: [
        'Day-by-day guided journeys',
        'Streaks and gentle nudges',
        "A teacher's view of every cohort",
      ],
      status: 'WORKING MVP',
      accent: 'saffron',
      icon: 'flame',
    },
    {
      index: '02',
      id: 'umbra',
      name: 'UMBRA',
      codename: true,
      teaser: "Designed for the hours you can't switch off.",
      bullets: [
        'Guided audio sessions',
        'A sleep-first experience',
        'Web and mobile from one build',
      ],
      status: 'CONCEPT',
      accent: 'indigo',
      icon: 'moon',
    },
    {
      index: '03',
      id: 'plumbline',
      name: 'PLUMBLINE',
      codename: true,
      teaser: 'From the first requirement to go-live, on one line.',
      bullets: [
        'Requirements to user stories with AI',
        'One work item, many views: board, backlog, timeline',
        'Risks, decisions, and documents in one place',
      ],
      status: 'MVP BUILT',
      accent: 'cyan',
      icon: 'compass',
    },
    {
      index: '04',
      id: 'factory',
      name: 'AI Solution Factory',
      codename: false,
      teaser: "We didn't build a product. We built the thing that builds them.",
      bullets: [
        'A problem goes in, a working system comes out',
        'Repeatable blueprints, not one-off builds',
        'Human approval at every gate',
      ],
      status: 'IN BUILD',
      accent: 'violet',
      icon: 'gear',
    },
    {
      index: '05',
      id: 'lead-to-deal',
      name: 'Lead to Deal Automation System',
      codename: false,
      teaser: 'Every lead answered. Every follow-up remembered.',
      bullets: [
        'Consent-first lead capture',
        'AI conversations that qualify and book',
        'A live pipeline view',
      ],
      status: 'IN BUILD',
      accent: 'emerald',
      icon: 'funnel',
    },
    {
      index: '06',
      id: 'mission-control',
      name: 'ZYXEN AI Mission Control',
      codename: false,
      teaser: 'A full software team. Every member is an agent.',
      bullets: [
        'Specialist agents for each role',
        'One human sets direction and approves',
        'Every decision on the record',
      ],
      status: 'IN BUILD',
      accent: 'amber',
      icon: 'radar',
    },
    {
      index: '07',
      id: 'academy',
      name: 'ZYXENAI Academy',
      codename: false,
      teaser: 'Learn with a tutor that never runs out of patience.',
      bullets: [
        'Structured courses with assessments',
        'An AI tutor in every lesson',
        'Portals for teams',
      ],
      status: 'IN DESIGN',
      accent: 'rose',
      icon: 'book',
    },
  ] satisfies readonly Product[],

  method: {
    label: 'HOW WE BUILD',
    steps: [
      { title: 'Map the work', text: 'We watch how the job is done today, step by step, before we automate any of it.' },
      { title: 'Build the narrow agent', text: 'One agent, one job, with clear limits on what it may touch.' },
      { title: 'Keep a human in the loop', text: 'A person approves anything that matters before it happens.' },
      { title: 'Ship, measure, improve', text: 'It goes into real use, we watch what it does, and we tighten it.' },
    ],
  },

  principles: {
    label: 'PRINCIPLES',
    items: [
      { title: 'Human approval by design.', text: 'Approval steps are part of the system, not an afterthought.' },
      { title: 'Private by default.', text: 'Your data stays yours. We collect only what the job needs.' },
      { title: 'Built to be white-labelled.', text: 'Our systems are made to carry your name, not ours.' },
      { title: "Honest about what AI can't do yet.", text: 'If a task is beyond it today, we say so.' },
    ],
  },

  cta: {
    headline: "Want to see what's behind the curtain?",
    button: 'Email us for early access',
  },

  footer: {
    columns: {
      products: 'Products',
      company: 'Company',
      contact: 'Contact',
    },
    companyLinks: [
      { label: 'Vision', href: '/#vision' },
      { label: 'Method', href: '/#method' },
      { label: 'Principles', href: '/#principles' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
    social: { label: 'LinkedIn', href: 'https://www.linkedin.com/company/143832913/' },
    newTabNote: '(opens in a new tab)',
    builtIn: 'Built in Dubai.',
  },

  legal: {
    backHome: 'Back to the site',
    privacy: {
      title: 'Privacy',
      paragraphs: [
        'This page is a placeholder. A full privacy notice will be published here.',
        'This site does not use analytics, tracking scripts, or cookies. There are no forms. If you email us, we use your message only to reply to you.',
      ],
    },
    terms: {
      title: 'Terms',
      paragraphs: [
        'This page is a placeholder. Full terms will be published here.',
        'The systems shown on this site are in development. Nothing here is an offer of a product or service.',
      ],
    },
    contactLead: 'Questions:',
  },
} as const

/** Builds an email link with the subject line already filled in. */
export function mailto(subject: string = site.emailSubjects.general): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
}

export function productMailto(product: Pick<Product, 'name'>): string {
  return mailto(site.emailSubjects.productPrefix + product.name)
}
