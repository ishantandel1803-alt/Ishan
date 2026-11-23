/* ---------- LookAfter AI case study (product design) ----------
   Open as case.html?p=lookafter. See cases/project-one.js for every block type.
   Sources: the co-founder's technical case study (pasted 2026-11-16), the
   LookAfter pitch deck, market research and marketing spec (~/Downloads), and
   the Claude Design screens canvas. Engineering numbers are credited, not claimed.
   Written for healthtech PMs and recruiters: problem, people, principles,
   decisions, shipping, reflection. No invented research or user numbers.
   Images: App Store screenshots in img/lookafter/, app screens in img/lookafter/screens/.
   DRAFT: check every line marked in content/open-questions.md ("LookAfter AI").
---------------------------------------------------------------- */
// App Store CTA, used in the hero and at the end. Paste the App Store link into href.
const LOOKAFTER_STORES = [
  { store: 'appstore',   href: 'https://apps.apple.com/in/app/lookafter-ai/id6786725245' },
  { store: 'googleplay', href: 'https://play.google.com/store/apps/details?id=com.lookafterai.health' },
];

const CASE = {
  title: 'LookAfter AI: AI family health companion',
  accent: '#a95f42',
  // LookAfter AI brand: forest green, cream, terracotta; Bricolage Grotesque + Manrope
  theme: {
    fonts: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Manrope:wght@400;500;600;700&display=swap',
    vars: {
      '--bg': '#f3ead9',
      '--ink': '#1c2520',
      '--cs-dark': '#2e4a3e',
      '--cream': '#f1ecdf',
      '--cs-accent-dark': '#e8a882',
      '--display': '"Bricolage Grotesque", "Helvetica Neue", sans-serif',
      '--ui': '"Manrope", system-ui, sans-serif',
      '--cs-icon-bg': '#fbf7ef',
      '--cs-icon-pad': '12px',
      '--cs-icon-fit': 'contain',
    },
  },
  blocks: [

    { type: 'hero',
      icon: 'img/lookafter/logo.png',
      title: 'Designing *trust* into an AI that looks after the whole family',
      intro: 'LookAfter AI is one shared AI assistant that looks after your whole family’s health. Its name is Myra. Each person chooses what to share, and Myra only uses that to explain lab reports in plain words and keep track of everyone’s health day to day. I was the founding product designer, from the first screens to the App Store.',
      meta: [
        { label: 'Role',     value: 'Founding Product Designer' },
        { label: 'Team',     value: 'Me + a technical co-founder' },
        { label: 'Timeline', value: 'Dec 2025 – Aug 2026' },
        { label: 'Platform', value: 'iOS, Android, web' },
      ],
      stores: LOOKAFTER_STORES },

    { type: 'figure',
      images: [{ src: 'img/lookafter/lookafter-film.mp4', poster: 'img/lookafter/lookafter-film-poster.jpg', label: 'LookAfter AI product film: from scattered family health apps to one shared assistant' }] },

    { type: 'showcase', marquee: true,
      images: [
        { src: 'img/lookafter/family.webp',          label: 'Look after everyone you love: the family circle home screen' },
        { src: 'img/lookafter/ask-myra.webp',        label: 'Ask anything, get a real answer: chat with Myra, the AI assistant' },
        { src: 'img/lookafter/biomarkers.webp',      label: 'Your body’s numbers, finally explained: biomarkers' },
        { src: 'img/lookafter/health-analysis.webp', label: 'Upload a report, understand it instantly: health analysis' },
        { src: 'img/lookafter/monthly-summary.webp', label: 'Your family’s month, one clear summary' },
        { src: 'img/lookafter/biological-age.webp',  label: 'How old is your body, really? Biological age' },
        { src: 'img/lookafter/nudges.webp',          label: 'Smart nudges, no noise: notifications' },
      ] },

    { type: 'facts',
      eyebrow: 'Project at a glance',
      title: 'A health AI built for *the family*, not one patient',
      text: 'The big health AI launches of 2025–26 were all built for one person. Families don’t work that way: one person usually carries everyone’s health. LookAfter AI is designed around that person, and around the trust it takes to hand an AI your family’s medical data.',
      groups: [
        { label: 'What I did', items: [
          'Designed the app end to end: 14 flows and 75+ screens, including new-user states',
          'Built the design system for iOS and web',
          'Designed how Myra shows sources, confidence and limits',
          'Designed family sharing and consent: who sees what, per person',
          'Took the app through App Store review to launch',
        ] },
        { label: 'Outcome', items: [
          'Live on the *App Store* and *Google Play*',
          'Approved after 18 builds, 6 rejections and 3 months of review',
          'Every answer cites its source, or says plainly that it can’t',
        ] },
        { label: 'Team', items: [
          'Ishan: founding product designer',
          'Technical co-founder: AI, backend, retrieval',
        ] },
      ],
      callout: { label: 'The challenge in one sentence', text: 'Make an AI useful for a whole family’s health without it ever sounding more certain than the data allows, or showing anyone more than they were allowed to see.' } },

    { type: 'decisions',
      eyebrow: 'Decisions → impact',
      title: 'The calls that made an AI *safe to trust with family health*',
      items: [
        { decision: 'Every answer shows its source, or says plainly that it can’t answer.',
          why: 'You can’t trust a health AI with your mother’s blood test if you can’t see where a claim came from.',
          num: '97.6%', impact: 'of test questions found the right source first (the co-founder’s retrieval eval)' },
        { decision: 'Let the evidence, not the model, decide what the screen can say.',
          why: 'Confidence tiers unlock UI blocks; trend language needs at least three data points, and the model can’t raise its own tier.',
          impact: '*No trend claims on thin data.* The UI can’t sound more certain than the records behind it.' },
        { decision: 'Private by default: each person chooses what each family member sees.',
          why: 'One shared account would leak a diagnosis or cycle data to the whole family.',
          impact: '*Family alerts without exposing records.* Only summaries are shared, enforced in code, not just hidden in the UI.' },
        { decision: 'Design terms, privacy and medical disclaimers as real screens, and fix every screen review flagged.',
          why: 'Health apps get extra scrutiny from Apple.',
          num: '2 stores', impact: 'live on the App Store and Google Play, after 18 builds and 6 rejections' },
      ] },

    { type: 'statement', dark: true,
      eyebrow: 'The problem',
      title: '“Eight apps. Three doctors. *One exhausted parent.*”',
      text: 'A glucometer app for Dad, a children’s portal, a pharmacy reminder for Grandma, and sibling group chats to fill the gaps. In the UK alone, 1.4 million people care for their children and their parents at the same time (ONS). They become the human middleware between devices, portals and people.' },

    { type: 'cards', cols: 2,
      eyebrow: 'Where it breaks',
      title: 'Four gaps no single app *was closing*',
      text: 'The tools exist, but none of them talk to each other, and none of them explain anything.',
      items: [
        { title: 'Numbers without meaning', text: 'Lab reports arrive as a PDF of values and ranges. Nobody explains what they mean for your life, or what to do next.' },
        { title: 'Data in silos', text: 'Health data lives across several apps, portals and spreadsheets. No app has the full picture of one person, let alone a family.' },
        { title: 'Family blind spots', text: 'Caring for a parent or a child means guessing. Did Dad take his medication? Nobody knows until someone calls.' },
        { title: 'No continuity', text: 'There is no single place to see whether anyone is actually getting better over months, not just today.' },
      ] },

    { type: 'research',
      eyebrow: 'Who we designed for',
      title: 'One person carries the family’s health',
      tabs: [
        { name: 'Audience', kind: 'list',
          note: 'We designed for the family carer first, and made sure the app still works for someone using it alone.',
          items: [
            { name: 'The family carer', note: 'Keeps an eye on parents, a partner or children. Invites everyone else in. Our primary user.' },
            { name: 'The confused patient', note: 'Adults 25–45 who have had lab tests done and can’t make sense of the results.' },
            { name: 'Women managing their cycle', note: 'Including PCOS and hormonal health, where privacy matters most.' },
            { name: 'The data-driven', note: 'Fitness-focused people who want recovery and biomarkers in one place.' },
          ] },
        { name: 'Their day', kind: 'grid',
          note: 'Moments the product had to fit into, without adding another job to the carer’s day.',
          items: ['A new lab report PDF', 'Dad’s missed medication', 'A worrying number at night', 'Sibling group chats', 'Appointments to prepare for', 'Kids’ health records', 'A parent who won’t use apps', 'Private data, like a cycle', 'No time to read a report'] },
        { name: 'Landscape', kind: 'list',
          note: 'Everyone was building health AI for individuals. Nobody was building it for families.',
          items: [
            { name: 'Apple Health', note: 'Great wearable data and one-to-one sharing, but no AI layer and no family coordination.' },
            { name: 'Big Tech health AI', note: 'Personal assistants from OpenAI, Anthropic, Google and Amazon. All individual-only.' },
            { name: 'CareZone, CaringBridge', note: 'Records and family updates, but static: no AI, built around one care recipient.' },
            { name: 'Medisafe', note: 'Medication reminders for one person, with no wider health picture.' },
            { name: 'Ada, K Health', note: 'Symptom checking and triage for one patient, not a household.' },
          ] },
      ] },

    { type: 'principles',
      eyebrow: 'Design principles',
      title: 'Four rules every screen *had to follow*',
      rows: [
        { problem: 'Health AI answers from memory', note: 'You can’t tell where a claim came from, so you can’t trust it with your mother’s blood test.', principle: 'Show where every answer comes from' },
        { problem: 'Chatbots drift into diagnosis', note: 'A confident wrong answer about symptoms is the most dangerous thing this product could do.', principle: 'Explain, never diagnose' },
        { problem: 'Family sharing can expose people', note: 'One shared account would leak private data, like a cycle or a diagnosis, to the whole family.', principle: 'Private by default, shared by choice' },
        { problem: 'AI overstates patterns', note: 'Two data points are not a trend, but language models will happily call them one.', principle: 'Never sound more certain than the data' },
      ] },

    { type: 'statement', dark: true,
      eyebrow: 'The rule behind the UI',
      title: '“The model proposes language. *Code decides* numbers and what renders.”',
      text: 'The AI writes the words, but it never decides what appears on screen. Numbers, charts and warnings come from the user’s actual records. That split shaped how every AI screen was designed.' },

    { type: 'feature', flip: true,
      eyebrow: 'Ask Myra',
      title: 'An assistant that *knows its limits*',
      text: 'Myra answers questions about you and the people who chose to share with you. The first screen says so in plain words, and the suggested questions show what it is for.',
      after: { image: { src: 'img/lookafter/screens/ai.jpg', label: 'Ask Myra' }, note: '“I’ll only use what they’ve shared with you.” Suggested questions like “Did Mom take her medication today?” teach the family use case in one glance. Red-flag symptoms route to a clinician instead of an answer.' } },

    { type: 'cards', cols: 3,
      eyebrow: 'Designing for confidence',
      title: 'The screen *changes with the evidence*',
      text: 'Each answer gets a confidence tier from 1 to 4, based on how many data points back it. The tier decides which UI blocks may appear and how strong the wording can be. The model can’t raise its own tier.',
      items: [
        { title: 'Little data', text: 'A plain answer with its source. No charts, no trends, no bold claims.' },
        { title: 'Some data', text: 'More blocks unlock, like a summary of the user’s own records.' },
        { title: 'Enough data', text: 'Trend language only appears with at least three supporting data points. Otherwise it is removed.' },
      ] },

    { type: 'list',
      eyebrow: 'Lab reports',
      title: 'From a PDF of numbers to *what it means*',
      text: 'Lab reports are long and full of jargon. The design turns one upload into a few clear views, with the problems first and the reasoning visible.',
      items: [
        'Upload a PDF or a photo, and see honest progress while it is analysed (40–60 seconds)',
        '*118 biomarkers* grouped as optimal, watch or out of range, so what needs attention surfaces first',
        'Each marker shows its range, its trend and a confidence label, never just a number',
        'A *health score* across four pillars, and a *monthly summary* for each family member',
      ],
      screens: [
        { src: 'img/lookafter/screens/analyzing.jpg', label: 'Analysing an uploaded report' },
        { src: 'img/lookafter/screens/analysis.jpg', label: 'Analysis results' },
        { src: 'img/lookafter/screens/biomarkers.jpg', label: 'Biomarkers by status' },
        { src: 'img/lookafter/screens/apob.jpg', label: 'ApoB detail and trend' },
      ] },

    { type: 'list',
      eyebrow: 'Family and consent',
      title: 'One circle, *different permissions*',
      text: 'The home screen is a family circle, built around looking after other people, like spotting that Dad missed a medication. Each person still owns their own record and decides what the family can see.',
      items: [
        'Alerts surface on the home screen, like a missed medication, without opening anyone’s full record',
        'Each person chooses exactly what each family member can see',
        'Only summaries are shared, never raw records, and sharing can be stopped at any time',
        'Sharing rules are enforced in the code, not just hidden in the UI',
      ],
      screens: [
        { src: 'img/lookafter/screens/dashboard.jpg', label: 'Home: the family circle and key alerts' },
        { src: 'img/lookafter/screens/familyCircle.jpg', label: 'Family circle' },
        { src: 'img/lookafter/screens/memberSummary.jpg', label: 'Member summary' },
        { src: 'img/lookafter/screens/familySharing.jpg', label: 'Choosing what to share' },
      ] },

    { type: 'feature', flip: true,
      eyebrow: 'Sensitive data',
      title: 'Cycle data gets *its own consent*',
      text: 'Cycle and period data is some of the most sensitive data a health app holds. Reproductive health data is not stored on LookAfter’s servers, and period data is hidden before the AI ever sees it.',
      after: { image: { src: 'img/lookafter/screens/cycleData.jpg', label: 'Cycle privacy' }, note: 'Before the first question, one screen explains in plain words what happens to the data and that it can be viewed or deleted at any time. Consent comes first, not buried in settings.' } },

    { type: 'list',
      eyebrow: 'Day one',
      title: 'Designing for the *empty state*',
      text: 'A health app is useless on day one: no labs, no logs, no family yet. Every main screen has a new-user version that explains what will appear and gives one next step.',
      items: [
        'Core screens were designed twice: a new user’s first view and an active user’s',
        'Empty states point to one action, like uploading a first report or adding a family member',
        'A morning check-in builds the habit with a few taps instead of a long form',
      ],
      screens: [
        { src: 'img/lookafter/screens/dashboardEmpty.jpg', label: 'Home for a new user' },
        { src: 'img/lookafter/screens/dashboard.jpg', label: 'Home once the family is set up' },
        { src: 'img/lookafter/screens/checkin.jpg', label: 'Morning check-in' },
        { src: 'img/lookafter/screens/fileReport.jpg', label: 'Upload a first report' },
      ] },

    { type: 'iterations', dark: true,
      eyebrow: 'The whole app',
      title: '14 flows, *one design system*',
      text: 'Every flow uses the same system: forest green, cream and terracotta, Bricolage Grotesque, soft glass cards, and Ask Myra one tap away throughout the app.',
      tabs: [
        { name: 'Onboarding', note: 'From splash to Apple Health sync.', images: [ { src: 'img/lookafter/screens/splash.jpg', label: 'Splash' }, { src: 'img/lookafter/screens/onb3.jpg', label: 'Onboarding: add your family' }, { src: 'img/lookafter/screens/onb4.jpg', label: 'Onboarding: ask Myra' }, { src: 'img/lookafter/screens/appleHealth.jpg', label: 'Apple Health sync' } ] },
        { name: 'Sign in', note: 'Login, sign up and email verification.', images: [ { src: 'img/lookafter/screens/login.jpg', label: 'Login' }, { src: 'img/lookafter/screens/signup.jpg', label: 'Sign up' }, { src: 'img/lookafter/screens/verify.jpg', label: 'Verify email' }, { src: 'img/lookafter/screens/reset.jpg', label: 'Reset password' } ] },
        { name: 'Home & Myra', note: 'The daily dashboard, morning check-in, alerts and the AI assistant.', images: [ { src: 'img/lookafter/screens/dashboard.jpg', label: 'Dashboard' }, { src: 'img/lookafter/screens/checkin.jpg', label: 'Morning check-in' }, { src: 'img/lookafter/screens/ai.jpg', label: 'Ask Myra' }, { src: 'img/lookafter/screens/alerts.jpg', label: 'Alerts' } ] },
        { name: 'Lab reports', note: 'Upload a report, wait for the analysis, then read the results.', images: [ { src: 'img/lookafter/screens/fileReport.jpg', label: 'Upload a report' }, { src: 'img/lookafter/screens/analyzing.jpg', label: 'Analysing' }, { src: 'img/lookafter/screens/analysis.jpg', label: 'Analysis details' }, { src: 'img/lookafter/screens/biomarkers.jpg', label: 'Biomarkers' } ] },
        { name: 'Daily log', note: 'Connect your data, set goals, then log sleep and food.', images: [ { src: 'img/lookafter/screens/dataSource.jpg', label: 'Add your data' }, { src: 'img/lookafter/screens/goals.jpg', label: 'Goals setup' }, { src: 'img/lookafter/screens/logSleep.jpg', label: 'Daily log: sleep' }, { src: 'img/lookafter/screens/logEat.jpg', label: 'Daily log: eat' } ] },
        { name: 'Family', note: 'Family records, folders and sharing controls.', images: [ { src: 'img/lookafter/screens/familyEhr.jpg', label: 'Family records' }, { src: 'img/lookafter/screens/memberFolder.jpg', label: 'Member folder' }, { src: 'img/lookafter/screens/familyCircle.jpg', label: 'Family circle' }, { src: 'img/lookafter/screens/familySharing.jpg', label: 'Health sharing' } ] },
        { name: 'Reports', note: 'Monthly reports and biological age.', images: [ { src: 'img/lookafter/screens/rptList.jpg', label: 'Monthly reports' }, { src: 'img/lookafter/screens/rptDetail.jpg', label: 'Report detail' }, { src: 'img/lookafter/screens/bioAge.jpg', label: 'Biological age' }, { src: 'img/lookafter/screens/profile.jpg', label: 'Profile' } ] },
        { name: 'Cycle tracking', note: 'A private, step-by-step cycle setup.', images: [ { src: 'img/lookafter/screens/cycle.jpg', label: 'Cycle tracking' }, { src: 'img/lookafter/screens/cycleData.jpg', label: 'Cycle privacy' }, { src: 'img/lookafter/screens/cycleLength.jpg', label: 'Cycle length' }, { src: 'img/lookafter/screens/cycleLog.jpg', label: 'Log periods' } ] },
      ] },

    { type: 'list',
      eyebrow: 'Shipping',
      title: '18 builds to get *past App Store review*',
      text: 'Health apps get extra scrutiny from Apple. Approval took 18 builds, 6 rejections and 3 months of fixing what reviewers flagged.',
      items: [
        'Live on Google Play first, then approved on the App Store',
        'Terms, privacy and medical disclaimers designed as real screens, not links to a PDF',
        'A Next.js admin panel for the team',
      ] },

    { type: 'results', dark: true,
      eyebrow: 'Impact',
      title: 'What shipped',
      items: [
        { num: '2',     label: 'app stores: live on the App Store and Google Play' },
        { num: '75+',   label: 'screens across 14 flows, with new-user states' },
        { num: '97.6%', label: 'of test questions retrieved the right source first (the co-founder’s eval)' },
      ] },

    { type: 'reflection',
      eyebrow: 'Reflection',
      title: 'What I’d do *next*',
      items: [
        { name: 'Test with real carers', tools: 'Usability tests · diary study', text: 'Run a structured study with family carers and older parents, measuring trust, comprehension of lab results and time saved.' },
        { name: 'Measure the family loop', tools: 'Activation · retention', text: 'Track how many invited family members join and share, since the product only works when a second person is in.' },
        { name: 'Design for older parents', tools: 'Accessibility · voice', text: 'Larger type, simpler logging and a voice-first mode for parents who will never open a dashboard.' },
      ] },

    { type: 'end', title: 'Try *LookAfter AI*', cta: { label: 'Back to work', href: 'index.html#work' }, stores: LOOKAFTER_STORES },
  ],
};
