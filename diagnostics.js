(() => {
  if (document.getElementById('diag-toggle')) return;

  const section = id => document.querySelector(`[data-section-id="${id}"]`);
  const chapterThree = section('682327c7a3c4af090d913e05');
  const chapterFour = section('68235e0ffd0bc774bd9e8647');
  const pricing = section('6797b7e93da35e55cc604499');
  const packageGrid = pricing?.querySelector('.coaching-packages');
  const bloomInterventions = section('674f0b978d7c0436bb1aad36');
  const footer = document.getElementById('footer-sections');
  const header = document.getElementById('header');
  const packageCard = [...(packageGrid?.querySelectorAll('.package-box') ?? [])]
    .find(card => card.querySelector('.title')?.textContent.includes('3-Month'));

  if (![chapterThree, chapterFour, pricing, bloomInterventions, footer, header, packageCard].every(Boolean)) return;

  const diagnoses = [
    {
      number: '01',
      title: "A quiet month never gets a price",
      paragraphs: [
        "The story says \"No steady flow. No predictability.\" Then it moves straight to the coach. It never says what one quiet month costs.",
        "The first dollar figure on the page is the $250 Focus Session.",
        "With no cost on the page, waiting is free. $3,000 gets compared with $0."
      ],
      question: "What is waiting costing my business?"
    },
    {
      number: '02',
      title: "The plan is on the page. The help to carry it out is in the FAQ",
      paragraphs: [
        "Coaching covers four things: niche and message, offers and pricing, a marketing plan, and organization. All four are planning.",
        "The page also says Maya already \"absorbed a flood of advice.\"",
        "Help with writing copy, creating content and implementing appears only in the FAQ. The $3,000 package doesn't list it.",
        "They think: \"I've had advice before. Will I still be doing this alone?\""
      ],
      question: "Will I get help doing the work, or only a plan?"
    },
    {
      number: '03',
      title: "Seven sessions, no finish line",
      paragraphs: [
        "The $3,000 package lists one 90-minute session, six 60-minute sessions, unlimited messaging and templates. Its only result line is \"Launch strong and start booking the right clients.\"",
        "No number. No time frame. The buyer can count the hours, but can't see what three months produces."
      ],
      question: "What will be different in my business after three months?",
      highlight: packageCard.querySelector('.features li:last-child')
    },
    {
      number: '04',
      title: "The proof that justifies $3,000 sits below the $3,000",
      paragraphs: [
        "The only testimonial above the price says profits \"literally doubled.\" It gives no figures.",
        "Rayla's $35,000 to $70,000 appears in the FAQ. BloomDance's 2.5× comes after the packages.",
        "The buyer meets the price holding one word: \"doubled.\" Doubled from what?"
      ],
      question: "Has this worked well enough to be worth the investment?",
      highlight: packageCard.querySelector('.price')
    },
    {
      number: '05',
      title: "Three \"buy\" buttons open a booking calendar",
      paragraphs: [
        "\"LET'S DO IT!\", \"I'M READY!\" and \"SIGN ME UP!\" link to the same calendar as the free strategy call. Nothing on the page says whether the click is a purchase or a call.",
        "A buyer who clicks \"SIGN ME UP!\" expecting checkout gets a booking link."
      ],
      question: "Am I buying coaching, or booking a call?",
      highlight: packageCard.querySelector('.sqs-block-button-element')
    },
    {
      number: '06',
      title: "The proof sold a bigger job than the $3,000 package",
      paragraphs: [
        "BloomDance's results came with pricing changes, SEO, social and email marketing, a rebrand and a new website.",
        "The $3,000 package lists sessions, messaging and templates. No rebrand. No website. The page never says what coaching alone contributed.",
        "They think: \"Would $3,000 get me that, or is that a bigger project?\""
      ],
      question: "What can I expect from the package itself?"
    }
  ];

  function createStrip(items) {
    const strip = document.createElement('div');
    strip.className = 'diag-strip';
    strip.innerHTML = items.map(({ number, title, paragraphs, question }) => `
      <div class="diag-item">
        <h3 class="diag-heading">
          <button class="diag-trigger" type="button" id="diag-trigger-${number}"
            aria-expanded="false" aria-controls="diag-panel-${number}">
            <span class="diag-label">DECISION BREAK ${number}</span>
            <span class="diag-symbol" aria-hidden="true">+</span>
            <span class="diag-title">${title}</span>
          </button>
        </h3>
        <div class="diag-panel" id="diag-panel-${number}" role="region"
          aria-labelledby="diag-trigger-${number}" hidden>
          ${paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}
          <div class="diag-decision">
            <p class="diag-label">UNRESOLVED DECISION</p>
            <p>${question}</p>
          </div>
        </div>
      </div>`).join('');
    return strip;
  }

  const central = document.createElement('section');
  central.className = 'diag-central';
  central.setAttribute('aria-labelledby', 'diag-central-title');
  central.innerHTML = `<div class="diag-editorial">
    <p class="diag-label">CENTRAL DECISION BREAK</p>
    <h2 id="diag-central-title">The price arrives before the reasons to pay it</h2>
    <p>At $3,000 the buyer knows what's in the package. They can't tell what it's worth.</p>
    <ul>
      <li>Waiting has no cost (Break 01)</li>
      <li>The package has no finish line (Break 03)</li>
      <li>The proof comes after the price (Break 04)</li>
    </ul>
    <p>A buyer who can't judge the value doesn't say no. They say "later."</p>
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
  const triggers = rows.map(row => row.querySelector('.diag-trigger'));
  const cards = strips.map(([, strip]) => strip);
  const navBar = header.querySelector('.header-announcement-bar-wrapper') ?? header;
  const navOffset = () => Math.ceil(navBar.getBoundingClientRect().height);
  const headerClearance = () => navOffset() + 12;
  const mobileToggle = window.matchMedia('(max-width: 767px), (pointer: coarse)');
  const viewport = window.visualViewport;
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
    triggers[index].setAttribute('aria-expanded', String(open));
    row.querySelector('.diag-symbol').textContent = open ? '−' : '+';
    row.querySelector('.diag-panel').hidden = !open;
    diagnoses[index].highlight?.classList.toggle('diag-evidence-highlight', open);
  }

  function keepPosition(anchor, update, minimumTop = -Infinity) {
    const top = anchor.getBoundingClientRect().top;
    const documentTop = top + window.scrollY;
    update();
    const updatedTop = anchor.getBoundingClientRect().top;
    // Scroll anchoring may already have moved the viewport when a row moves up.
    // Leave room for the original fixed header, which returns on upward scroll.
    const movedUp = updatedTop + window.scrollY < documentTop - 1;
    const visibleTop = movedUp ? Math.max(top, minimumTop) : top;
    const shift = updatedTop - visibleTop;
    if (Math.abs(shift) > 0.5) window.scrollBy({ top: shift, behavior: 'instant' });
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      keepPosition(trigger, () => {
        if (expanded !== null) setExpanded(expanded, false);
        expanded = expanded === index ? null : index;
        if (expanded !== null) setExpanded(expanded, true);
      }, headerClearance());
      positionToggle();
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
    positionToggle();
  });

  function desktopToggleTop({ left, right, height }, defaultTop) {
    const obstacles = triggers.map(control => control.getBoundingClientRect())
      .filter(rect => rect.height && rect.left < right && rect.right > left);
    const candidates = [defaultTop, ...obstacles.map(rect => rect.bottom + 4)]
      .filter(top => top >= defaultTop && top + height <= window.innerHeight)
      .sort((a, b) => a - b);
    return candidates.find(y => obstacles.every(rect => y >= rect.bottom || y + height <= rect.top)) ?? defaultTop;
  }

  function mobileToggleTop(height, defaultTop) {
    const clearance = 12;
    const viewportTop = viewport?.offsetTop ?? 0;
    const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight);
    // Keep the upper slot stable until the original navigation has slid away.
    const headerIsHidden = header.style.transform === 'translateY(-100%)'
      && navBar.getBoundingClientRect().bottom <= 0.5;
    const headerBottom = headerIsHidden ? 0 : navOffset();
    const firstTop = Math.ceil(Math.max(viewportTop, headerBottom) + 8);
    const lastTop = Math.floor(viewportBottom - height - 8);
    const obstacles = cards.map(card => card.getBoundingClientRect()).filter(rect =>
      rect.height && rect.bottom + clearance > viewportTop && rect.top - clearance < viewportBottom
    );
    // Prefer stable viewport edges before trying the gap below an individual strip.
    const candidates = [defaultTop, lastTop, firstTop, ...obstacles.map(rect => Math.ceil(rect.bottom + clearance))];
    return candidates.find(y => y >= firstTop && y <= lastTop && obstacles.every(rect =>
      y >= rect.bottom + clearance || y + height <= rect.top - clearance
    ));
  }

  function positionToggle() {
    const rect = toggle.getBoundingClientRect();
    const defaultTop = navOffset() + 8;
    const top = mobileToggle.matches ? mobileToggleTop(rect.height, defaultTop) : desktopToggleTop(rect, defaultTop);
    toggle.toggleAttribute('data-diag-obstructed', top === undefined);
    if (top !== undefined) toggle.style.setProperty('--diag-toggle-top', `${top}px`);
  }

  let toggleFrame = 0;
  function scheduleTogglePosition() {
    if (toggleFrame) return;
    toggleFrame = requestAnimationFrame(() => {
      toggleFrame = 0;
      positionToggle();
    });
  }

  const toggleObserver = new ResizeObserver(scheduleTogglePosition);
  for (const element of [navBar, toggle, ...cards]) {
    toggleObserver.observe(element);
  }
  window.addEventListener('scroll', scheduleTogglePosition, { passive: true });
  window.addEventListener('resize', scheduleTogglePosition);
  viewport?.addEventListener('scroll', scheduleTogglePosition, { passive: true });
  viewport?.addEventListener('resize', scheduleTogglePosition);
  mobileToggle.addEventListener('change', scheduleTogglePosition);
  for (const eventName of ['transitionend', 'transitioncancel']) {
    header.addEventListener(eventName, event => {
      if (event.target === header && event.propertyName === 'transform') scheduleTogglePosition();
    });
  }
  document.fonts.addEventListener('loadingdone', scheduleTogglePosition);

  function revealHashTarget(hash) {
    const id = hash.slice(1);
    const target = triggers.find(trigger => trigger.id === id);
    if (!target?.isConnected) return;
    target.focus({ preventScroll: true });
    window.scrollBy({
      top: target.getBoundingClientRect().top - headerClearance(),
      behavior: 'instant'
    });
  }

  renderDiagnostics(true);
  positionToggle();
  window.addEventListener('hashchange', () => revealHashTarget(window.location.hash));
  if (window.location.hash) {
    // CSS and fonts can change the target's position during the initial load.
    window.addEventListener('load', () => revealHashTarget(window.location.hash), { once: true });
  }
})();
