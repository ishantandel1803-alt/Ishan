/* ---------- Case study content ----------
   This file is the whole case study. Each item in `blocks` is one section of
   the page, in order. Remove, repeat or reorder blocks freely.
   Text: wrap words in *stars* to highlight them (accent colour in the hero
   title, bold everywhere else).
   Images: put files in img/<project>/ and set src: 'img/project-one/x.png'.
   Leave src '' to show a labelled placeholder.
------------------------------------------ */
const CASE = {
  title: 'Project one',              // browser tab title
  accent: '#f0504a',                 // highlight colour for this project
  blocks: [

    { type: 'hero',
      icon: '',                                            // app icon image (square)
      title: 'Redesigning onboarding to add *$X.XM* in deposits',
      intro: 'Placeholder: one or two lines on the company: what it is, who it serves, how big it is.',
      meta: [
        { label: 'Role',     value: 'Product designer' },
        { label: 'Team',     value: 'PM, 3 engineers, researcher' },
        { label: 'Timeline', value: 'X months, 2025' },
        { label: 'Platform', value: 'iOS & Android' },
      ] },

    { type: 'showcase',                                    // a row of final screens
      images: [
        { src: '', label: 'Welcome' },
        { src: '', label: 'Progress' },
        { src: '', label: 'Product choice' },
        { src: '', label: 'Verification' },
      ] },

    { type: 'context',
      eyebrow: 'Context',
      title: 'The product had grown from *one thing* into many',
      before: { label: 'Earlier', text: 'Placeholder: what the product used to be.', image: { src: '', label: 'Old app' } },
      after:  { label: 'Now',     text: 'Placeholder: what it became, and why onboarding no longer fit.', image: { src: '', label: 'New app' } } },

    { type: 'ask',
      eyebrow: 'The ask',
      title: 'Optimise the onboarding funnel to improve conversion',
      text: 'Placeholder: the goal you were given, the metric, and your first hunch about what was really going on.',
      voices: [
        { method: 'User interviews', quote: 'Placeholder: a real quote from a user.', who: 'User, 28, new signup' },
        { method: 'Support calls',   quote: 'Placeholder: what people kept asking support.', who: 'Recent drop-off' },
        { method: 'Usability tests', quote: 'Placeholder: a moment of confusion you observed.', who: 'Test participant' },
      ],
      insight: { label: 'The insight', text: 'Placeholder: the reframe, e.g. we were targeting the wrong audience.' } },

    { type: 'statement', dark: true,
      eyebrow: 'From funnel fix to company bet',
      title: 'The evidence gave us a *bigger opportunity*',
      text: 'Placeholder: how the research changed the scope, and who got aligned behind it.' },

    { type: 'journey',
      eyebrow: 'Journey',
      title: "We reshaped the journey around the user's mental model",
      before: [
        { label: 'Welcome screen' }, { label: 'Phone & OTP' }, { label: 'ID number', drop: true },
        { label: 'Pick a product' }, { label: 'Verify identity', drop: true }, { label: 'Selfie' }, { label: 'Done' },
      ],
      after: [
        { label: 'Welcome + value' }, { label: 'Phone & OTP' }, { label: 'Pick a product' },
        { label: 'ID with reason' }, { label: 'Verify (guided)' }, { label: 'Done' },
      ] },

    { type: 'research',
      eyebrow: 'Research',
      title: 'Understanding users beyond the app',
      tabs: [
        { name: 'Situations', kind: 'grid',
          note: 'Placeholder: what this grid shows, e.g. situations that shape how people sign up.',
          items: ['Low connectivity', 'First smartphone', 'Shared device', 'Language', 'Time pressure', 'Trust in apps', 'Document ready?', 'Financial literacy', 'Privacy worries'] },
        { name: 'Personas', kind: 'personas',
          items: [
            { name: 'Persona one', quote: 'Placeholder: what they want.', traits: ['Trait', 'Trait', 'Trait'] },
            { name: 'Persona two', quote: 'Placeholder: what worries them.', traits: ['Trait', 'Trait'] },
          ] },
        { name: 'Benchmarks', kind: 'list',
          items: [
            { name: 'App one', note: 'What it does well' }, { name: 'App two', note: 'Clutter-free selection' },
            { name: 'App three', note: 'Intent-based personalisation' }, { name: 'App four', note: 'Benefit-first permissions' },
          ] },
      ] },

    { type: 'principles',
      eyebrow: 'Principles',
      title: 'Three recurring problems gave us three principles',
      rows: [
        { problem: 'Unclear value', note: 'Placeholder: why people left early.', principle: 'Show value first' },
        { problem: 'Scary asks',    note: 'Placeholder: permissions felt invasive.', principle: 'Explain every ask' },
        { problem: 'Missed cross-sell', note: 'Placeholder: people never found other products.', principle: 'Guide with intent' },
      ] },

    { type: 'feature',
      eyebrow: 'Splash',
      title: 'Making the first impression count',
      before: { image: { src: '', label: 'Before' }, note: 'Placeholder: what was wrong.' },
      after:  { image: { src: '', label: 'After' },  note: 'Placeholder: what changed and why.' } },

    { type: 'feature',
      eyebrow: 'Permissions',
      title: 'Making permissions feel purposeful',
      before: { image: { src: '', label: 'Before' }, note: 'Placeholder: what was wrong.' },
      after:  { image: { src: '', label: 'After' },  note: 'Placeholder: what changed and why.' } },

    { type: 'feature', flip: true,
      eyebrow: 'Progress',
      title: 'Using waiting time to build confidence',
      after:  { image: { src: '', label: 'Progress screen' }, note: 'Placeholder: realistic time estimates, clear steps, celebrating progress.' } },

    { type: 'iterations', dark: true,
      eyebrow: 'Iterations',
      title: 'A product selection system built to evolve',
      text: 'Placeholder: the options you explored and how you chose.',
      tabs: [
        { name: 'Product-led',        note: 'Placeholder: idea one.', images: [{ src: '', label: 'Option A' }, { src: '', label: 'Option A2' }, { src: '', label: 'Option A3' }] },
        { name: 'Intent-led',         note: 'Placeholder: idea two.', images: [{ src: '', label: 'Option B' }, { src: '', label: 'Option B2' }, { src: '', label: 'Option B3' }] },
        { name: 'Recommendation-led', note: 'Placeholder: the one that shipped.', images: [{ src: '', label: 'Option C' }, { src: '', label: 'Option C2' }, { src: '', label: 'Option C3' }] },
      ] },

    { type: 'feature',
      eyebrow: 'Error handling',
      title: 'Turning a dead end into a next step',
      before: { image: { src: '', label: 'Before' }, note: 'Placeholder: what happened when things failed.' },
      after:  { image: { src: '', label: 'After' },  note: 'Placeholder: the recovery path you designed.' } },

    { type: 'results', dark: true,
      eyebrow: 'Impact',
      title: 'What changed',
      items: [
        { num: '14%',   label: 'Placeholder: conversion lift' },
        { num: '10K',   label: 'Placeholder: new accounts per month' },
        { num: '$2.4M', label: 'Placeholder: deposits added' },
      ] },

    { type: 'reflection',
      title: "How I'd approach this today",
      items: [
        { name: 'Research',            tools: 'Tool · Tool', text: 'Placeholder: what you would do differently.' },
        { name: 'Explore + prototype', tools: 'Tool · Tool', text: 'Placeholder: what you would do differently.' },
        { name: 'Measure',             tools: 'Tool',        text: 'Placeholder: what you would do differently.' },
      ] },

    { type: 'next',
      eyebrow: 'What came next',
      title: 'Placeholder: what happened after launch',
      text: 'Placeholder: follow-up work, what the team built on top, or what you learned.' },

    { type: 'end', title: 'Thanks for reading', cta: { label: 'Back to work', href: 'index.html#work' } },
  ],
};
