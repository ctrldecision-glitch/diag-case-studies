(() => {
  if (document.getElementById('diag-toggle')) return;

  const section = id => document.querySelector(`[data-section-id="${id}"]`);
  const chapterThree = section('682327c7a3c4af090d913e05');
  const chapterFour = section('68235e0ffd0bc774bd9e8647');
  const pricing = section('6797b7e93da35e55cc604499');
  const packageGrid = pricing?.querySelector('.coaching-packages');
  const bloomInterventions = section('674f0b978d7c0436bb1aad36');
  const bloomResults = section('68236a51ea2bb56a69276811')?.querySelector('h2');
  const footer = document.getElementById('footer-sections');
  const header = document.getElementById('header');
  const raylaPanel = document.getElementById('dropdown-2cd48ec898e51edf05ab-2');
  const raylaResult = [...(raylaPanel?.querySelectorAll('p') ?? [])]
    .find(paragraph => paragraph.textContent.includes('double her profits'));
  const raylaTrigger = raylaPanel?.closest('.accordion-item')?.querySelector('.accordion-item__click-target');
  const packageCard = [...(packageGrid?.querySelectorAll('.package-box') ?? [])]
    .find(card => card.querySelector('.title')?.textContent.includes('3-Month'));

  if (![chapterThree, chapterFour, pricing, bloomInterventions, footer, header,
    bloomResults, raylaResult, raylaTrigger, packageCard].every(Boolean)) return;

  const evidence = {
    'diag-bloomdance-results': bloomResults,
    'diag-rayla-results': raylaResult,
    'diag-three-month-package': packageCard
  };
  for (const [id, target] of Object.entries(evidence)) {
    target.id = id;
    target.tabIndex = -1;
  }

  const diagnoses = [
    {
      number: '01',
      title: 'The cost of waiting remains abstract',
      paragraphs: [
        "Maya's story establishes the problem: “No steady flow. No predictability.”",
        'But the coaching solution appears before the financial consequence of another quiet month becomes clear.'
      ],
      question: 'What is waiting costing my business?'
    },
    {
      number: '02',
      title: 'Activities, not a path',
      paragraphs: [
        'Chapter 4 lists four coaching activities: positioning, pricing, marketing, and business organization.',
        "It explains what coaching covers, but not how those activities build on each other. Practical implementation support isn't explained in detail until the FAQs."
      ],
      question: 'How will this coaching solve my problem?'
    },
    {
      number: '03',
      title: 'The three-month outcome remains vague',
      paragraphs: [
        'The $3,000 package specifies session lengths, messaging support, and resources.',
        "Its stated outcome is to “start booking the right clients,” but doesn't explain what that progress should look like by the end of three months."
      ],
      question: 'What should be different about my business after three months?',
      highlight: packageCard.querySelector('.features li:last-child')
    },
    {
      number: '04',
      title: 'Detailed proof arrives after pricing',
      paragraphs: [
        "The hero contains a short testimonial, but the buyer reaches $3,000 before seeing BloomDance's revenue results or Rayla's profit growth from $35,000 to $70,000.",
        'The evidence exists. It arrives after the investment is presented.'
      ],
      question: 'Has this approach produced results worth investing in?',
      highlight: packageCard.querySelector('.price'),
      extra: `<div class="diag-links">
        <a href="#diag-bloomdance-results">View BloomDance results</a>
        <a href="#diag-rayla-results">View Rayla's results</a>
      </div>`
    },
    {
      number: '05',
      title: 'The button obscures the next step',
      paragraphs: [
        `“LET'S DO IT!”, “I'M READY!”, and “SIGN ME UP!” all link to the same calendar URL as the free strategy session.`,
        'The package buttons suggest commitment without explicitly explaining what happens next.'
      ],
      question: 'Am I purchasing coaching or booking a conversation?',
      highlight: packageCard.querySelector('.sqs-block-button-element'),
      extra: `<div class="diag-comparison">
        <p class="diag-label">Evidence from the original website</p>
        <ul>
          <li>Book a Free Strategy Session</li>
          <li>LET'S DO IT!</li>
          <li>I'M READY!</li>
          <li>SIGN ME UP!</li>
        </ul>
        <details>
          <summary>Shared calendar destination</summary>
          <p class="diag-calendar">https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2cyZQVweeJTm2zAnsn4jfr8XXkIPJlzNROXxUpnFTdW-V92j-XHtWE2juiANz3WH8T9h7W5KPQ</p>
        </details>
      </div>`
    },
    {
      number: '06',
      title: "The proof and the offer don't fully match",
      paragraphs: [
        "BloomDance's results followed pricing changes, marketing implementation, rebranding, and website work.",
        "The $3,000 coaching package lists sessions, messaging, and resources. It doesn't list branding or website implementation.",
        "The case study doesn't distinguish what coaching contributed from what the additional services contributed."
      ],
      question: 'What can I reasonably expect from the coaching package itself?',
      extra: '<div class="diag-links"><a href="#diag-three-month-package">View package</a></div>'
    }
  ];

  function createStrip(items) {
    const strip = document.createElement('div');
    strip.className = 'diag-strip';
    strip.innerHTML = items.map(({ number, title, paragraphs, question, extra }) => `
      <div class="diag-item">
        <h3 class="diag-heading">
          <button class="diag-trigger" type="button" id="diag-trigger-${number}"
            aria-expanded="false" aria-controls="diag-panel-${number}">
            <span class="diag-number">${number}</span>
            <span class="diag-title">${title}</span>
            <span class="diag-symbol" aria-hidden="true">+</span>
          </button>
        </h3>
        <div class="diag-panel" id="diag-panel-${number}" role="region"
          aria-labelledby="diag-trigger-${number}" hidden>
          ${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
          <div class="diag-decision">
            <p class="diag-label">Unresolved decision</p>
            <p>${question}</p>
          </div>
          ${extra ?? ''}
        </div>
      </div>`).join('');
    return strip;
  }

  const central = document.createElement('section');
  central.className = 'diag-central';
  central.setAttribute('aria-labelledby', 'diag-central-title');
  central.innerHTML = `<div class="diag-editorial">
    <p class="diag-label">CENTRAL DECISION BREAK</p>
    <h2 id="diag-central-title">Price before sufficient commercial justification.</h2>
    <p>The buyer reaches $3,000 with an unclear financial cost of waiting, a vague three-month outcome, and detailed commercial evidence still further down the page.</p>
    <p>They know what they're paying for.</p>
    <p>They don't yet have enough information to judge whether it's worth paying for.</p>
  </div>`;

  const toggle = document.createElement('button');
  toggle.className = 'diag-toggle';
  toggle.id = 'diag-toggle';
  toggle.type = 'button';
  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('aria-checked', 'true');
  toggle.innerHTML = 'Diagnostics<span class="diag-switch" aria-hidden="true"></span>';
  header.after(toggle);

  // The exported Fluid Engine grids have fixed tracks. Insert into document flow at their boundaries.
  const pricingStrip = createStrip(diagnoses.slice(2, 5));
  pricingStrip.classList.add('diag-pricing-strip');
  const strips = [
    [chapterThree, createStrip(diagnoses.slice(0, 1))],
    [chapterFour, createStrip(diagnoses.slice(1, 2))],
    [pricing, pricingStrip],
    [bloomInterventions, createStrip(diagnoses.slice(5))]
  ];
  const originalSections = [...document.querySelectorAll('#page section[data-section-id]'), footer];
  const rows = strips.flatMap(([, strip]) => [...strip.querySelectorAll('.diag-item')]);
  let expanded = null;

  function positionPricingStrip() {
    // Reclaim the grid's unused trailing space without changing the original section.
    const trailingSpace = pricing.getBoundingClientRect().bottom - packageGrid.getBoundingClientRect().bottom;
    pricingStrip.style.setProperty('--diag-pricing-offset', `${40 - trailingSpace}px`);
  }

  const pricingObserver = new ResizeObserver(positionPricingStrip);
  pricingObserver.observe(pricing);
  pricingObserver.observe(packageGrid);

  function setExpanded(index, open) {
    const row = rows[index];
    row.querySelector('.diag-trigger').setAttribute('aria-expanded', String(open));
    row.querySelector('.diag-symbol').textContent = open ? '−' : '+';
    row.querySelector('.diag-panel').hidden = !open;
    if (!open) row.querySelector('details[open]')?.removeAttribute('open');
    diagnoses[index].highlight?.classList.toggle('diag-evidence-highlight', open);
  }

  function keepPosition(anchor, update) {
    const top = anchor.getBoundingClientRect().top;
    update();
    const shift = anchor.getBoundingClientRect().top - top;
    if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
  }

  rows.forEach((row, index) => {
    const trigger = row.querySelector('.diag-trigger');
    trigger.addEventListener('click', () => {
      keepPosition(trigger, () => {
        if (expanded !== null) setExpanded(expanded, false);
        expanded = expanded === index ? null : index;
        if (expanded !== null) setExpanded(expanded, true);
      });
    });
  });

  function renderDiagnostics(enabled) {
    if (enabled) {
      positionPricingStrip();
      for (const [anchor, strip] of strips) anchor.after(strip);
      footer.before(central);
      return;
    }
    if (expanded !== null) setExpanded(expanded, false);
    expanded = null;
    for (const [, strip] of strips) strip.remove();
    central.remove();
  }

  function readingAnchor() {
    const line = window.innerHeight / 3;
    let nearest = originalSections[0];
    let distance = Infinity;
    for (const candidate of originalSections) {
      const { top, bottom } = candidate.getBoundingClientRect();
      const gap = Math.max(top - line, line - bottom, 0);
      if (gap < distance) {
        nearest = candidate;
        distance = gap;
      }
    }
    return nearest;
  }

  toggle.addEventListener('click', () => {
    const enabled = toggle.getAttribute('aria-checked') === 'false';
    toggle.setAttribute('aria-checked', String(enabled));
    keepPosition(readingAnchor(), () => renderDiagnostics(enabled));
  });

  const navBar = header.querySelector('.header-announcement-bar-wrapper') ?? header;
  const navOffset = () => Math.ceil(navBar.getBoundingClientRect().height);

  function positionToggle() {
    toggle.style.setProperty('--diag-nav-height', `${navOffset()}px`);
  }
  new ResizeObserver(positionToggle).observe(navBar);
  positionToggle();

  function revealEvidence(hash) {
    const id = hash.slice(1);
    if (!Object.hasOwn(evidence, id)) return;
    const target = evidence[id];
    if (target === raylaResult && raylaTrigger.getAttribute('aria-expanded') === 'false') {
      raylaTrigger.click();
    }
    target.focus({ preventScroll: true });
    window.scrollBy({
      top: target.getBoundingClientRect().top - navOffset() - 12,
      behavior: 'instant'
    });
  }

  for (const [, strip] of strips) {
    strip.addEventListener('click', event => {
      const link = event.target.closest('.diag-links a');
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (window.location.hash !== link.hash) history.pushState(null, '', link.hash);
      revealEvidence(link.hash);
    });
  }

  renderDiagnostics(true);
  addEventListener('hashchange', () => revealEvidence(window.location.hash));
  if (Object.hasOwn(evidence, window.location.hash.slice(1))) {
    // Initial font loading can move the target before the page settles.
    window.addEventListener('load', () => revealEvidence(window.location.hash), { once: true });
  }
})();
