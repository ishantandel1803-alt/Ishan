/* ---------- W'supMate case study (founder + product design) ----------
   Open as case.html?p=wsupmate. See cases/project-one.js for every block type.
   Sources: content/projects/wsupmate/sources/wsupmate-progress-tracker.md (4 Oct – 16 Nov 2026),
   the W'supMate pitch deck and the W'sup design canvas (screens and videos extracted to
   content/projects/wsupmate/assets/). Numbers agreed with Ishan on 16 Nov: ~135 downloads,
   164 hackathon registrations, 4 ambassadors. OLT revenue/footfall figures are left out (unconfirmed).
   Rules: no names of ambassadors or partners' staff, never framed as dating, no fake numbers.
---------------------------------------------------------------- */
const WSUP_STORES = [
  { store: 'appstore',   href: 'https://apps.apple.com/in/app/wsupmate/id6825712555' },
  { store: 'googleplay', href: 'https://play.google.com/store/apps/details?id=com.lookafter.wsup.prod' },
];
const S = (id, label) => ({ src: `img/wsupmate/screens/${id}.jpg`, label });

const CASE = {
  title: "W'supMate: a mate for every plan",
  accent: '#284732',
  theme: {
    fonts: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap',
    vars: {
      '--bg': '#fbf8e6',
      '--ink': '#1c3324',
      '--cs-dark': '#1c3324',
      '--cream': '#fffedf',
      '--cs-accent-dark': '#ffd66b',
      '--display': '"DM Serif Display", Georgia, serif',
      '--ui': '"Inter", system-ui, sans-serif',
      '--cs-icon-bg': '#284732',
      '--cs-icon-pad': '0px',
      '--cs-icon-fit': 'cover',
    },
  },
  blocks: [

    { type: 'hero',
      icon: 'img/wsupmate/icon.png',
      title: 'A mate for *every plan*',
      intro: "W'supMate is the plans app. Post what you feel like doing in one line, get matched with one person who wants the same thing, and go and do it. I founded it and designed everything: the product, the brand, the store, the videos and the campus launch, in six weeks.",
      meta: [
        { label: 'Role',     value: 'Founder & Product Designer' },
        { label: 'Company',  value: 'Look After AI Limited' },
        { label: 'Timeline', value: 'Oct – Nov 2026 (6 weeks)' },
        { label: 'Status',   value: 'Live on iOS and Android' },
        { label: 'Website',  value: 'heywsup.life', href: 'https://www.heywsup.life/' },
      ],
      stores: WSUP_STORES },

    { type: 'showcase', marquee: true,
      images: [
        { src: 'img/wsupmate/store-01.jpg', label: 'Tell us what you want to do. We’ll find your people.' },
        { src: 'img/wsupmate/store-02.jpg', label: 'Post your intent' },
        { src: 'img/wsupmate/store-03.jpg', label: 'Plan your intent with people' },
        { src: 'img/wsupmate/store-04.jpg', label: 'View people, then plan with them' },
        { src: 'img/wsupmate/store-05.jpg', label: 'Sort the details, then go' },
        { src: 'img/wsupmate/store-06.jpg', label: 'Meet people. Keep them.' },
        { src: 'img/wsupmate/store-07.jpg', label: 'See what’s on near you' },
        { src: 'img/wsupmate/store-08.jpg', label: 'Find it on the map' },
      ] },

    { type: 'facts',
      eyebrow: 'Project at a glance',
      title: 'From a blank canvas to a *live app* in six weeks',
      text: 'I took W’supMate from the first logo sketch to a live app on the App Store and Google Play, a campus beta with ambassadors, a partner café and a 164-person hackathon, as a solo founder working with AI tools.',
      groups: [
        { label: 'What I did', items: [
          'Defined the product: one-on-one intents, plus Communities for groups',
          'Designed the app end to end, from onboarding to plans, chat and the Crowd map',
          'Built the brand: name, high-five logo, colours, type and illustration',
          'Made the store listing, posters, social content and 35+ videos',
          'Ran the go-to-market: campus beta, café partnership, ambassadors, push notifications',
        ] },
        { label: 'Outcome', items: [
          'Live on the *App Store* and *Google Play*',
          '*~135 downloads* from the first campus beta',
          '*164 registrations* for a hackathon promoted through the app',
          '*4 campus ambassadors* on the ground',
        ] },
        { label: 'Team', items: [
          'Ishan: founder, product, design and go-to-market',
          '4 campus ambassadors: community, events and partnerships',
        ] },
      ],
      callout: { label: 'The challenge in one sentence', text: 'Get strangers to meet in real life for a plan they both want, without the app ever feeling like a dating app.' } },

    { type: 'decisions',
      eyebrow: 'Decisions → impact',
      title: 'What I decided as founder, and *what happened*',
      items: [
        { decision: 'Launch on one campus first, with ambassadors and a café partner.',
          why: 'A match needs two people who want the same thing, at the same time, nearby. Density beats reach.',
          num: '~135', impact: 'downloads from the first campus beta, with 4 campus ambassadors' },
        { decision: 'Crack a café partnership, and turn its 10% commission into a 10% discount for students who match.',
          why: 'Users stay free and brands pay: charging people before they’ve met anyone stops the network from forming.',
          num: '10%', impact: 'commission that paid for the discount, bringing *more footfall to the café* and *downloads to W’supMate*' },
        { decision: 'Use events as acquisition: teams form by posting an intent.',
          why: 'A one-day AI hackathon at Kingston University was listed on W’supMate, and teams formed by posting an intent.',
          num: '164', impact: 'registrations for a hackathon promoted through the app' },
        { decision: 'Lead with the plan, never the profile.',
          why: 'People kept reading a matching app as dating.',
          impact: '*Repositioned as “the plans app”*: doodles before photos, and chat only after both say yes.' },
      ] },

    { type: 'statement', dark: true,
      eyebrow: 'The problem',
      title: '“Your people are around you. You just *never meet them*.”',
      text: 'You want to try a padel class or a new ramen place. Texting three or four friends reaches too few: if they are busy, you don’t go. Posting a story reaches everyone. Nothing reaches the right few people who want the same thing, at the same time, nearby.' },

    { type: 'figure',
      images: [{ src: 'img/wsupmate/problem-solution.mp4', poster: 'img/wsupmate/problem-solution-poster.jpg', label: 'W’supMate problem, solution and product, in 30 seconds', max: 360, caption: 'Problem, solution, product: the 30-second version.' }] },

    { type: 'research',
      eyebrow: 'The gap',
      title: 'Everyone starts from a *profile*. We start from a *plan*.',
      tabs: [
        { name: 'Landscape', kind: 'list',
          note: 'Every alternative either starts from a profile or only works with people you already know.',
          items: [
            { name: 'Dating apps', note: 'Start from a profile, built for romance. The frame we had to stay away from.' },
            { name: 'Bumble BFF', note: 'Start from a profile, built for making friends in general, not for a plan tonight.' },
            { name: 'Meetup', note: 'Starts from a group, built for professional networking and recurring events.' },
            { name: 'WhatsApp', note: 'Starts from your contacts, so it only reaches people you already know.' },
          ] },
        { name: 'Two sides', kind: 'grid',
          note: 'People want plans. Places want people. The same match serves both.',
          items: ['Students with free evenings', 'No one free to join', 'Cold-messaging strangers', 'Cafés with empty tables', 'Turfs with open slots', 'Gyms and classes', 'A plan becomes a visit', 'The visit is what brands pay for', 'Users stay free'] },
      ] },

    { type: 'principles',
      eyebrow: 'Design principles',
      title: 'Four rules that shaped *every screen*',
      rows: [
        { problem: 'Matching strangers reads as dating', note: 'People kept reading a matching app as dating, which scares off anyone who just wants a padel partner.', principle: 'Lead with the plan, never the profile' },
        { problem: 'Meeting strangers feels unsafe', note: 'People need to know who they are meeting before they agree to anything.', principle: 'Doodles until both say yes' },
        { problem: 'Unwanted messages kill trust', note: 'Open inboxes fill up with messages nobody asked for.', principle: 'Chat opens only after mutual opt-in' },
        { problem: 'Paywalls block the first plan', note: 'Charging people before they have met anyone stops the network from forming.', principle: 'Users stay free, brands pay' },
      ] },

    { type: 'list',
      eyebrow: 'The core flow',
      title: 'Intent in. *Plan out.*',
      text: 'The whole product is four steps. Post your intent in one line, pick when you’re free, get matched with one person who wants the same thing, and once you both opt in, the plan is sealed and the chat opens.',
      items: [
        '*Home*: one input, “What do you feel like doing?”, with real examples typing themselves',
        '*Scene › Peek*: see who posted the same plan and tap “I’m in”',
        '*Scene › Plan*: they propose a time and place; you accept, and it’s a plan',
        '*Mate*: your sealed plans, the chat, and the people you’ve met',
      ],
      screens: [S('home', 'Home: what do you feel like doing?'), S('peek', 'Peek: someone posting the same plan'), S('its-a-plan', 'It’s a plan'), S('chat', 'The plan chat')] },

    { type: 'figure',
      images: [{ src: 'img/wsupmate/how-it-works.mp4', poster: 'img/wsupmate/how-it-works-poster.jpg', label: 'How W’supMate works: post, match, plan, go', max: 360, caption: 'How it works, in 18 seconds. Restrained motion, no bounce or confetti.' }] },

    { type: 'list',
      eyebrow: 'Trust and safety',
      title: 'A coin with *two sides*',
      text: 'Everyone appears as a coin: an illustration on one side, a real photo on the other. You see the doodle first; the photo only flips round once both people say yes. Add a selfie check at sign-up and an 18+ rule, and meeting a stranger starts to feel like being introduced by a friend.',
      items: [
        'Profiles show a doodle until both people opt in',
        'Visibility settings decide where you can be reached',
        'After the meetup, a one-tap “how was it?” closes the loop',
      ],
      screens: [S('profile-popup', 'Tap a face to see their profile'), S('visibility', 'Where you’re reachable'), S('mate', 'Plans and people you met'), S('rate', 'How was it?')] },

    { type: 'list',
      eyebrow: 'Crowd',
      title: 'One-on-one by default, *groups by design*',
      text: 'Intents stay strictly one-on-one. Groups live in one place only: Communities, created by partners and hosts. The Crowd map shows cafés, events and offers, so a plan can start from a place, not just an idea.',
      items: [
        'The *map* shows cafés, events and partner offers, like “10% off” or “2 for 1”',
        '*Communities* are the only place for group plans, with a chat, plans and members',
        'Anyone can request a new community; partners and hosts run them',
      ],
      screens: [S('crowd-map', 'Crowd map with a pull-up list'), S('communities', 'All communities'), S('community-chat', 'Inside a community'), S('start-community', 'Request a new community')] },

    { type: 'list',
      eyebrow: 'Onboarding',
      title: 'Answers that *float up*',
      text: 'Onboarding is short and playful: each answer floats up as a balloon, invite codes look like tickets, and the notifications screen explains why before iOS asks.',
      items: [
        'Native Apple and Google sign-in, then an invite code with a “how to get one” video',
        'Your name floats up as a speech balloon',
        'Photos, then a reason to turn on notifications, then a three-screen story: say it, we match, show up together',
      ],
      screens: [S('invite-code', 'Invite code'), S('name', 'What should we call you?'), S('photos', 'Add a few photos'), S('story-say', 'Story: say it')] },

    { type: 'figure',
      eyebrow: 'Brand',
      title: 'A *high five*, not a heart',
      text: 'The name went from W’sup to W’supMate, and the logo through five rounds: a face, balloons, a grin, a smile, and finally a high five. It says “we’re doing this together”, which is exactly the feeling of a plan, and nothing like a dating app. Forest green and cream, a warm serif for intents, and hand-drawn people.',
      images: [{ src: 'img/wsupmate/logo-animation.mp4', poster: 'img/wsupmate/logo-animation-poster.jpg', label: 'W’supMate logo animation: the high five', max: 420 }] },

    { type: 'cards', cols: 3,
      eyebrow: 'Go-to-market',
      title: 'A café deal where *everyone wins*',
      text: 'Matching only works with density, so we launched on one campus in Pune with ambassadors on the ground. Then I cracked a partnership with a café near campus and turned it into a loop: the café pays us, we pass it on to students, students show up together.',
      items: [
        { title: 'I cracked the partnership', text: 'I pitched the café: W’supMate sends them students who have already made a plan to meet there. In return, the café pays W’supMate a 10% commission.' },
        { title: 'The 10% becomes the discount', text: 'That commission funds 10% off for students who match on the app and go to the café together. Students never pay to use W’supMate.' },
        { title: 'Matches turn into visits', text: 'QR posters at the café kick it off: post “I want to have coffee here”, get matched, show your match at the counter. Launch week came with a free cold coffee.' },
      ],
      after: { label: 'What it did', items: [
        '*More footfall for the café*: students arriving in pairs, with a plan',
        '*Downloads for W’supMate*: the offer only works through a match in the app',
        '*The first proof of the business model*: brands pay, users stay free',
      ] } },

    { type: 'figure',
      images: [{ src: 'img/wsupmate/olt-group-coffee.mp4', poster: 'img/wsupmate/olt-group-coffee-poster.jpg', label: 'OLT Group Coffee: open Crowd, join the event, fill 10 spots, go together', max: 360, caption: 'Group Coffee: when 10 spots fill, everyone’s coffee is free.' }] },

    { type: 'cards', cols: 2,
      eyebrow: 'Events as acquisition',
      title: 'A hackathon that *ran on W’supMate*',
      text: 'A one-day AI hackathon at Kingston University, London, was listed and promoted on W’supMate. Teams formed by posting an intent, the same way a coffee plan does.',
      items: [
        { title: '164 registrations', text: 'Registrations for the hackathon, promoted on W’supMate.' },
        { title: 'Teams by intent', text: 'Teams formed by posting an intent: what you want to build, matched with people who want the same thing.' },
      ] },

    { type: 'results', dark: true,
      eyebrow: 'Impact',
      title: 'What six weeks produced',
      items: [
        { num: '~135', label: 'downloads from the first campus beta' },
        { num: '164',  label: 'registrations for a hackathon promoted on the app' },
        { num: '35+',  label: 'videos: explainers, reels, ads and logo animations' },
      ] },

    { type: 'insights',
      eyebrow: 'What I learned',
      title: 'The numbers were *honest*, so were the lessons',
      items: [
        { title: 'Incentives bring installs, not habits', text: 'The free-coffee campaign aimed for 200 downloads and landed at about half. By the end of October around 100 Android users weren’t interacting. That led to a push notification playbook (segments, daily caps, Hinglish and Marathi lines) and a retention plan.' },
        { title: 'Positioning is a design problem', text: 'People kept reading a matching app as dating. We rebuilt the language around plans: “the plans app”, “a mate for every plan”, doodles not photos, and no date framing anywhere.' },
        { title: 'Density beats reach', text: 'A match needs two people who want the same thing, at the same time, nearby. One full campus is worth more than five half-empty cities, so we set gates before opening the next one.' },
        { title: 'Cut channels fast', text: 'An Instagram-to-WhatsApp bot and Dubai and London launches were dropped in weeks. X became the only DM channel; the focus moved to one campus.' },
      ] },

    { type: 'cards', cols: 3,
      eyebrow: 'How I worked',
      title: 'One founder, *AI as the studio*',
      text: 'With no design team, I used AI tools as a studio and kept the decisions, taste and copy myself.',
      items: [
        { title: 'One design canvas', text: 'Brand, website, app screens, store graphics, print and pitch deck all lived in one Claude Design canvas: 412 artboards, playable prototypes included.' },
        { title: 'Motion from code', text: 'A motion kit that renders video from code produced the explainers, reels and logo animations, with AI voiceovers for the longer films.' },
        { title: 'Docs that run the launch', text: 'Campus plan, retention plan, push notification playbook, partner deal playbook and pitch deck, each written, tested on the ground and revised.' },
      ] },

    { type: 'reflection',
      eyebrow: 'Reflection',
      title: 'What’s *next*',
      items: [
        { name: 'Measure the gates', tools: 'Analytics', text: '60% of intents matched within 48 hours, 50% of plans actually happen, 30% plan again within two weeks. None of these is measured yet, and they decide when the next campus opens.' },
        { name: 'Design the brand side', tools: 'B2B', text: 'Brands and venues are how W’supMate earns. Their side of the product, from listings to offers to results, still needs designing.' },
      ] },

    { type: 'end', title: 'Try *W’supMate*', cta: { label: 'Back to work', href: 'index.html#work' }, stores: WSUP_STORES },
  ],
};
