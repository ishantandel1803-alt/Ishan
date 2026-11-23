/* ---------- BlinkSpeak case study (research → product) ----------
   Open as case.html?p=blinkspeak. See cases/project-one.js for every block type.
   Sources: the IEEE I2CT 2024 paper (content/projects/blinkspeak/sources/
   Eye_Blink_based_Morse_Code__I2CT_.pdf), the BlinkSpeak README and app, and
   content/linkedin-notes.md. No invented user research or numbers.
   DRAFT: check the lines marked in content/open-questions.md ("BlinkSpeak").
   Media: img/blinkspeak/ (demo from "Case study Data/BlinkSpeak/BlinkSpeak case study cover.mov").
---------------------------------------------------------------- */
const PAPER = 'https://doi.org/10.1109/I2CT61223.2024.10543380';

const CASE = {
  title: 'BlinkSpeak: typing with eye blinks for people with ALS',
  accent: '#1f9d63',
  theme: {
    vars: {
      '--cs-dark': '#0c0f16',
      '--cs-accent-dark': '#4ee59a',
      '--cs-icon-bg': '#0c0f16',
    },
  },
  blocks: [

    { type: 'hero',
      icon: 'img/blinkspeak/icon.png',
      title: 'Typing with *eye blinks* for people with ALS',
      intro: 'For many people with ALS, the eyes are the last reliable way to communicate. Our IEEE paper showed a webcam could turn deliberate blinks into Morse code and text. BlinkSpeak takes that research out of a Python script and into a browser tab anyone can open.',
      meta: [
        { label: 'Role',     value: 'Co-author, designer and builder' },
        { label: 'Research', value: 'Peer-reviewed, IEEE Xplore', href: PAPER },
        { label: 'Product',  value: 'BlinkSpeak web app' },
        { label: 'Needs',    value: 'A webcam and a browser' },
      ],
      cta: { label: 'Read the research paper', href: PAPER } },

    { type: 'figure',
      images: [{ src: 'img/blinkspeak/blinkspeak-demo-wide.mp4', poster: 'img/blinkspeak/blinkspeak-demo-wide-poster.jpg', label: 'BlinkSpeak demo: the live feed tracks both eyes, blinks fill the Morse buffer, and the decoded message types out' }] },

    { type: 'facts',
      eyebrow: 'Project at a glance',
      title: 'From a *published paper* to a working product',
      text: 'The research proved the idea with Python, OpenCV and Dlib. The product question was different: could someone with ALS, or their carer, actually use it without an engineer in the room?',
      groups: [
        { label: 'What I did', items: [
          'Co-authored the IEEE paper on blink-based Morse code communication',
          'Designed BlinkSpeak’s interface: live feed, Morse buffer, decoded message, controls',
          'Rebuilt the system as a browser app, built with Claude Code',
          'Made calibration something a carer can do with two sliders',
        ] },
        { label: 'Outcome', items: [
          'Peer-reviewed and published by *IEEE* (I2CT 2024), indexed in IEEE Xplore',
          'Live as a web app: no hardware, no install, no cloud cost',
          '*98.3% accuracy* turning blinks into text in our testing',
        ] },
        { label: 'Team', items: [
          'Paper: Anuj Singh, Ishan Tandel, Sanket Salvi, Bhavana Tiple',
          'BlinkSpeak web app: Ishan',
        ] },
      ],
      callout: { label: 'The challenge in one sentence', text: 'Give someone who can only move their eyes a way to write, speak and send a message, using nothing more than the laptop or phone they already own.' } },

    { type: 'decisions',
      eyebrow: 'Decisions → impact',
      title: 'The calls that made it *usable at home*',
      items: [
        { decision: 'Only a webcam and a browser: no device, no install, no cloud.',
          why: 'Every alternative started with buying or wearing something.',
          num: '£0', impact: 'hardware, against £3,000–£8,000 for a dedicated AAC device' },
        { decision: 'Use deliberate short and long blinks, timed like Morse code.',
          why: 'The eyes are often the last reliable movement for people with ALS.',
          num: '98.3%', impact: 'accuracy turning blinks into text in our testing' },
        { decision: 'Turn calibration into two sliders, and show the machine’s view live.',
          why: 'Blinks differ from person to person and change as the illness progresses.',
          impact: '*A carer can tune it without an engineer*, and see straight away whether a blink registered.' },
      ] },

    { type: 'cards', cols: 3,
      eyebrow: 'Why it’s credible',
      title: 'Peer-reviewed, *not self-published*',
      text: 'IEEE is the world’s largest technical professional organisation. Its conference papers go through peer review before they are published in IEEE Xplore, the digital library engineers and researchers cite.',
      items: [
        { title: 'The conference', text: 'IEEE 9th International Conference for Convergence in Technology (I2CT 2024), Pune, 5–7 April 2024.' },
        { title: 'The review', text: 'Accepted after peer review into the official IEEE conference proceedings.' },
        { title: 'The record', text: 'Permanently indexed in IEEE Xplore with a DOI: 10.1109/I2CT61223.2024.10543380.' },
      ] },

    { type: 'statement', dark: true,
      eyebrow: 'The problem',
      title: 'Communication aids cost *thousands*. A webcam costs nothing extra.',
      text: 'As ALS and PLS progress, speech and muscle control are lost, and the eyes often become the only dependable output. Dedicated AAC devices can cost £3,000–£8,000, need specialist calibration and weeks of training, and stay out of reach for most families in low-income countries.' },

    { type: 'research',
      eyebrow: 'What already existed',
      title: 'Every option needed *special hardware*',
      tabs: [
        { name: 'Landscape', kind: 'list',
          note: 'The paper’s related-work review found five families of approaches: eye blinking, eye tracking, auditory BCIs, EOG and other assisted devices. People with ALS prefer eye-based methods, because the eyes last longest.',
          items: [
            { name: 'ALS specs', note: 'Glasses that track head and eye movement with LEDs and a camera, paired with a tablet app.' },
            { name: 'EyeLive', note: 'Infrared eye-gaze tracking with a microcontroller; letters chosen by looking and blinking.' },
            { name: 'IR eyeglasses', note: 'Morse code from blinks on an Arduino and LCD, limited by wired components.' },
            { name: 'Morse Glasses', note: 'A wearable that turns blinks into speech through an Android app.' },
            { name: 'Morse-to-speech apps', note: 'Touch-based Morse input, which still needs hand movement.' },
          ] },
        { name: 'The gap', kind: 'grid',
          note: 'What the existing tools asked of families before anyone could say a word.',
          items: ['Buy a device', 'Wear a headset', 'Wire up sensors', 'Specialist calibration', 'Weeks of training', 'One setup per patient', 'Hand movement', 'Limited actions', 'Out of reach in low-income countries'] },
      ] },

    { type: 'cards', cols: 2,
      eyebrow: 'Research to product',
      title: 'What the paper proved, and what it *left open*',
      text: 'The 2024 prototype worked, but it was built for a demo, not for a patient at home.',
      items: [
        { title: '2024 · The research prototype', text: 'A Python script with OpenCV and Dlib’s 68-point face model. Blinks became dots and dashes; opening the mouth triggered speech; closing the eyes for 9 seconds quit; PyWhatKit sent the message on WhatsApp. It needed Python, libraries and a terminal to run.' },
        { title: '2026 · BlinkSpeak', text: 'The same idea in a browser tab: eye landmarks and blink detection run on the device in real time. Big, clear actions replace hidden gestures: Speak, WhatsApp, Copy and Clear. Nothing to install, nothing sent to a server.' },
      ] },

    { type: 'principles',
      eyebrow: 'Design principles',
      title: 'Four decisions that made it *usable*',
      rows: [
        { problem: 'Hardware is the barrier', note: 'Every alternative started with buying or wearing something.', principle: 'Only a webcam and a browser' },
        { problem: 'Calibration needs an expert', note: 'Blink strength and speed differ from person to person, and change as the illness progresses.', principle: 'Two sliders a carer can tune' },
        { problem: 'Hidden gestures are hard to learn', note: 'The prototype used mouth-opening and a 9-second eye close as commands.', principle: 'Visible actions, one tap each' },
        { problem: 'Users can’t tell what the system saw', note: 'If a blink is missed, the person has no idea why their message is wrong.', principle: 'Show the machine’s view, live' },
      ] },

    { type: 'list',
      eyebrow: 'How it works',
      title: 'Short blink, long blink, *pause*',
      text: 'The interaction is plain Morse code, timed by the eyes. The Eye Aspect Ratio (EAR) measures how open the eyes are: when it drops below the threshold, the eye counts as closed, and how long it stays closed decides the symbol.',
      items: [
        'A *short blink* is a dot, a *long blink* is a dash',
        'A *1.5 second pause* ends the letter; a *3 second pause* adds a space',
        'The decoded message can be *spoken aloud*, *sent on WhatsApp* or *copied*',
        'Detection runs in the browser in real time, with zero paid APIs',
      ] },

    { type: 'figure',
      eyebrow: 'The interface',
      title: 'Every panel answers *“did it see me?”*',
      text: 'The live feed shows the tracked eye outlines, an Open or Closed badge and the current EAR value. The Morse buffer shows each dot and dash the moment it registers, and the decoded message types out beside it. Controls stay below the feed, away from the message.',
      images: [{ src: 'img/blinkspeak/interface.jpg', label: 'BlinkSpeak interface: live feed with eye tracking and EAR, Morse buffer, decoded message with Speak, WhatsApp, Copy and Clear, and EAR and dot/dash controls', bg: '#0c0b10', caption: 'Live feed, Morse buffer, decoded message and calibration controls. Click to open full size.' }] },

    { type: 'cards', cols: 3,
      eyebrow: 'Calibration',
      title: 'Tuned *to the person*, not the average',
      text: 'Blinks differ between people and change as ALS progresses, so the two thresholds that matter are exposed as plain sliders, with the extremes labelled in human terms.',
      items: [
        { title: 'EAR threshold', text: 'From 0.20 (sensitive) to 0.35 (relaxed): how closed the eye must be to count as a blink.' },
        { title: 'Dot / dash threshold', text: 'From 5 frames (fast blinker) to 20 frames (slow blinker): where a short blink ends and a long one begins.' },
        { title: 'Instant feedback', text: 'The EAR value and the Open badge update live, so a carer can see the effect of each change straight away.' },
      ] },

    { type: 'results', dark: true,
      eyebrow: 'Impact',
      title: 'What it achieved',
      items: [
        { num: 'IEEE', label: 'peer-reviewed paper at I2CT 2024, indexed in IEEE Xplore' },
        { num: '98.3%', label: 'accuracy turning blinks into text in our testing' },
        { num: '£0',    label: 'hardware needed, against £3,000–£8,000 for a dedicated AAC device' },
      ] },

    { type: 'reflection',
      eyebrow: 'Reflection',
      title: 'What I’d do *next*',
      items: [
        { name: 'Test with people with ALS', tools: 'Clinical partners · carers', text: 'Accuracy so far comes from our own testing. The next step is sessions with patients and carers, measuring fatigue, error rates and how long setup really takes.' },
        { name: 'Fewer blinks per word', tools: 'Prediction · shortcuts', text: 'Morse is slow for long messages. Word prediction and saved phrases (“I need water”, “Call my daughter”) would cut the blinks needed for everyday requests.' },
        { name: 'More languages and channels', tools: 'Localisation', text: 'The paper’s future work proposed live translation and more ways to send a message beyond WhatsApp.' },
      ] },

    { type: 'end', title: 'Read the *research*', cta: { label: 'Read the IEEE paper', href: PAPER } },
  ],
};
