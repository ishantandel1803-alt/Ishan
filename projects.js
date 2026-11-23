/* ---------- Work I'm proud of: edit your projects here ----------
   company     company or product name, shown first and bold in the small line (e.g. 'Zoth.io')
   audience    first word of the small line above the title (e.g. 'B2C')
   descriptor  second part of that line
   title       card heading (max 2 lines): lead with the outcome, not the task
   summary     one-sentence outcome (max 2 lines)
   media       image/GIF/video path, or '' for a placeholder panel
   poster      still image shown while a video loads (videos only)
   filters     which pills the card shows under (must match FILTERS)
   href        link to the case study, or '' if it isn't ready (an https link opens in a new tab)
   position    which part of the image to show in the square, e.g. 'center' or 'top'
   status      'wip' shows the yellow "fixing bugs" sign instead of the arrow
   hideInAll   true = only shown under its own filter pills, not under All
   stores      official store badges: [{ store: 'appstore' | 'googleplay', href }] (show: true renders one without a link)
   badge       optional highlight tag on the image, e.g. 'Published research · IEEE I2CT 2024'
------------------------------------------------------------------ */
const FILTERS = ['B2C', 'B2B', 'Side projects'];

const PROJECTS = [
  {
    company: 'Aspora', audience: 'B2C', descriptor: 'Fintech · Growth',
    title: 'Lifting referral conversion from 51% to 84%',
    summary: 'I rebuilt the referral flow around the exact drop-off points I found in on-site user research.',
    media: '', filters: ['B2C'], href: 'case.html',
    stores: [
      { store: 'appstore',   href: 'https://apps.apple.com/app/id6444683240' },
      { store: 'googleplay', href: 'https://play.google.com/store/apps/details?id=tech.vance.app' },
    ],
  },
  {
    company: 'Zoth.io', audience: 'B2B', descriptor: 'Fintech · Investing',
    title: 'Cutting investment-flow friction by 43%',
    summary: 'I dropped the education gate for a marketplace with inline explainers; 10K+ members joined the Index Fund.',
    media: 'img/work/zoth-flow.mp4', poster: 'img/work/zoth-flow-poster.jpg', position: 'center', filters: ['B2B', 'B2C'], href: 'case.html?p=zoth',
  },
  {
    company: 'LookafterAI', audience: 'B2B2C', descriptor: 'Healthtech · 0→1',
    title: 'From zero to the App Store in 18 builds',
    summary: 'I made every AI answer show its source and gave each family member their own consent, then took it through review.',
    media: 'img/work/lookafter-flow.mp4', poster: 'img/work/lookafter-flow-poster.jpg', position: 'center', filters: ['B2C', 'B2B'], href: 'case.html?p=lookafter',
    stores: [{ store: 'appstore', href: 'https://apps.apple.com/in/app/lookafter-ai/id6786725245' }, { store: 'googleplay', href: 'https://play.google.com/store/apps/details?id=com.lookafterai.health' }],
  },
  {
    company: 'W’supMate', audience: 'B2C', descriptor: 'Social · 0→1',
    title: 'From idea to live on iOS and Android',
    summary: 'I cracked a café deal: its 10% commission funds a discount for matched students, bringing it footfall and us downloads.',
    media: 'img/work/wsupmate-flow.mp4', poster: 'img/work/wsupmate-flow-poster.jpg', position: 'center', filters: ['B2C'], href: 'case.html?p=wsupmate',
    stores: [{ store: 'appstore', href: 'https://apps.apple.com/in/app/wsupmate/id6825712555' }, { store: 'googleplay', href: 'https://play.google.com/store/apps/details?id=com.lookafter.wsup.prod' }],
  },
  {
    company: 'DEcent', audience: 'Side project', descriptor: 'Healthtech · Web3',
    title: 'Finalist out of 900+ teams with patient-owned records',
    summary: 'A Bright Ideas finalist out of 900+ teams; pitched to investors as a secure, consent-based health record app.',
    media: 'img/work/decent-flow.mp4', poster: 'img/work/decent-flow-poster.jpg', position: 'center', filters: ['Side projects'], href: '', status: 'wip',
  },
  {
    company: 'BlinkSpeak', audience: 'Research', descriptor: 'Accessibility',
    badge: 'Peer-reviewed · IEEE Xplore',
    title: 'IEEE-published: typing with eye blinks for people with ALS',
    summary: 'Peer-reviewed at IEEE I2CT 2024. A browser tool that turns eye blinks into text, no hardware needed.',
    media: 'img/work/blinkspeak-demo.mp4', poster: 'img/work/blinkspeak-demo-poster.jpg', position: 'center', filters: ['Side projects'], hideInAll: true,
    href: 'case.html?p=blinkspeak',
  },
  {
    company: 'ResearchMap', audience: 'AI tool', descriptor: 'Edtech',
    title: 'Understand a research paper in minutes, not hours',
    summary: 'Upload a PDF and Claude maps its ideas in 3D over your webcam, explored with hand gestures.',
    media: 'img/work/researchmap-demo.mp4', poster: 'img/work/researchmap-demo-poster.jpg', position: 'center', filters: ['Side projects'], hideInAll: true,
    href: 'https://www.researchmap.site',   // live app until a case study exists
  },
];
