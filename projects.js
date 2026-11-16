/* ---------- Work I'm proud of: edit your projects here ----------
   audience    first word of the small line above the title (e.g. 'B2C')
   descriptor  second part of that line
   title       card heading (max 2 lines)
   summary     one-sentence outcome (max 2 lines)
   media       image/GIF/video path, or '' for a placeholder panel
   poster      still image shown while a video loads (videos only)
   filters     which pills the card shows under (must match FILTERS)
   href        link to the case study, or '' if it isn't ready
   position    which part of the image to show in the square, e.g. 'center' or 'top'
   status      'wip' shows the yellow "fixing bugs" sign instead of the arrow
------------------------------------------------------------------ */
const FILTERS = ['B2C', 'B2B', 'Side projects'];

const PROJECTS = [
  {
    audience: 'B2C', descriptor: 'Fintech · Growth',
    title: 'Redesigning Aspora’s referral flow',
    summary: 'On-site research found where people dropped off; the redesign lifted referral conversion from 51% to 84%.',
    media: '', filters: ['B2C'], href: 'case.html',
  },
  {
    audience: 'B2B', descriptor: 'Fintech · RWA',
    title: 'Making on-chain investing feel simple at Zoth.io',
    summary: 'Redesigned an SOSV-backed RWA platform into a tokenised asset marketplace; 10K+ members joined through the Index Fund.',
    media: 'img/work/zoth-flow.mp4', poster: 'img/work/zoth-flow-poster.jpg', position: 'center', filters: ['B2B', 'B2C'], href: 'case.html?p=zoth',
  },
  {
    audience: 'B2B2C', descriptor: 'AI · Healthtech',
    title: 'Designing LookafterAI from zero to one',
    summary: 'First design hire on an AI family-health app, now live on Google Play, plus a design system for iOS and web.',
    media: '', filters: ['B2C', 'B2B'], href: '',
  },
  {
    audience: 'Side project', descriptor: 'Healthtech · Web3',
    title: 'DEcent: patients owning their medical data',
    summary: 'A Bright Ideas finalist out of 900+ teams; pitched to investors as a secure, consent-based health record app.',
    media: 'img/work/decent-flow.mp4', poster: 'img/work/decent-flow-poster.jpg', position: 'center', filters: ['Side projects'], href: '', status: 'wip',
  },
];
