(() => {
  if (document.getElementById('diag-toggle')) return;

  const section = id => document.querySelector(`[data-section-id="${id}"]`);
  const chapterThree = section('682327c7a3c4af090d913e05');
  const chapterFour = section('68235e0ffd0bc774bd9e8647');
  const chapterFive = section('682362913049eb0d653cde05');
  const entryArtwork = chapterFive?.querySelector('#block-yui_3_17_2_1_1747149368469_8789 img');
  const pricing = section('6797b7e93da35e55cc604499');
  const packageGrid = pricing?.querySelector('.coaching-packages');
  const bloomResults = section('68236a51ea2bb56a69276811');
  const footer = document.getElementById('footer-sections');
  const header = document.getElementById('header');
  const packageCard = [...(packageGrid?.querySelectorAll('.package-box') ?? [])]
    .find(card => card.querySelector('.title')?.textContent.includes('3-Month'));

  if (![chapterThree, chapterFour, pricing, bloomResults, footer, header, packageCard].every(Boolean)) return;

  const diagnoses = [
    {
      number: '01',
      title: "A quiet month never gets a price",
      paragraphs: [
        "The story says \"No steady flow. No predictability.\" Then it moves straight to the coach. It never says what one quiet month costs.",
        "When the buyer eventually reaches pricing, they'll know what coaching costs, but not what waiting costs."
      ],
      question: "What is waiting costing my business?"
    },
    {
      number: '02',
      title: "The plan is clear. The help to carry it out isn't.",
      paragraphs: [
        "The page explains the four areas the coaching covers, but not how the coach helps put them into practice.",
        "Maya has already \"absorbed a flood of advice.\" She needs more than another plan.",
        "Practical implementation support is explained much later, in the FAQ."
      ],
      question: "Will I get help doing the work, or only a plan?"
    },
    {
      number: '03',
      title: "The sessions are defined. The outcome isn't.",
      paragraphs: [
        "The $3,000 package lists one 90-minute session, six 60-minute sessions, unlimited messaging and templates. Its only result line is \"Launch strong and start booking the right clients.\"",
        "The buyer can count the hours, but can't see what progress to expect by the end of three months."
      ],
      question: "What will be different in my business after three months?",
      highlight: packageCard.querySelector('.features li:last-child')
    },
    {
      number: '04',
      title: "The price arrives before the strongest proof",
      paragraphs: [
        "The testimonial above the price says profits \"literally doubled.\" No starting figure. No end figure. No time frame.",
        "The detailed financial results appear further down the page, after the buyer is presented with a $3,000 investment."
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
      title: "The case study includes work the package doesn't.",
      paragraphs: [
        "BloomDance's results came with pricing changes, SEO, social and email marketing, a rebrand and a new website.",
        "The $3,000 package lists sessions, messaging and templates. No rebrand. No website. The page never says what coaching alone contributed.",
        "They think: \"Would $3,000 get me that, or is that a bigger project?\""
      ],
      question: "What can I expect from the package itself?"
    }
  ];

  function createStrip(items) {
    const strip = document.createElement('section');
    strip.className = 'diag-strip';
    const inner = document.createElement('div');
    inner.className = 'diag-strip-inner';
    inner.innerHTML = items.map(({ number, title, paragraphs, question }) => `
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
    strip.append(inner);
    return strip;
  }

  const central = document.createElement('section');
  central.className = 'diag-central';
  central.setAttribute('aria-labelledby', 'diag-central-title');
  central.innerHTML = `<div class="diag-editorial">
    <p class="diag-label">CENTRAL DECISION BREAK</p>
    <h2 id="diag-central-title">The price arrives before the reasons to pay it</h2>
    <p>At $3,000 the buyer knows what's in the package. They can't tell what it's worth.</p>
    <h3 class="diag-central-group">Two answers arrive too late:</h3>
    <ul>
      <li>Detailed financial proof.</li>
      <li>Help putting the plan into practice.</li>
    </ul>
    <h3 class="diag-central-group">Two answers never become clear:</h3>
    <ul>
      <li>The financial cost of waiting.</li>
      <li>The expected three-month outcome.</li>
    </ul>
    <p class="diag-central-closing">A buyer who can't judge the value doesn't say no. They say \"later.\"</p>
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
    [bloomResults, createStrip(diagnoses.slice(5))]
  ];
  const originalSections = [...document.querySelectorAll('#page section[data-section-id]'), footer];
  const originalImages = [...document.querySelectorAll('#page .sqs-block-image img, #footer-sections .sqs-block-image img')];
  const rows = strips.flatMap(([, strip]) => [...strip.querySelectorAll('.diag-item')]);
  const triggers = rows.map(row => row.querySelector('.diag-trigger'));
  const diagnosticSections = [...strips.map(([, strip]) => strip), central];
  const navBar = header.querySelector('.header-announcement-bar-wrapper') ?? header;
  const navOffset = () => Math.ceil(navBar.getBoundingClientRect().height);
  const headerClearance = () => navOffset() + 12;
  const viewport = window.visualViewport;
  let expanded = null;

  function fitChapterFiveEntry() {
    if (!entryArtwork || !chapterFive.previousElementSibling?.matches('.diag-strip')) return;
    const padding = parseFloat(getComputedStyle(chapterFive).paddingBlockStart);
    const overflow = chapterFive.getBoundingClientRect().top + padding - entryArtwork.getBoundingClientRect().top;
    const space = `${Math.max(0, Math.ceil(overflow))}px`;
    if (chapterFive.style.getPropertyValue('--diag-entry-space') !== space) {
      chapterFive.style.setProperty('--diag-entry-space', space);
    }
  }

  if (entryArtwork) new ResizeObserver(fitChapterFiveEntry).observe(chapterFive.querySelector('.fluid-engine'));

  function setExpanded(index, open) {
    const row = rows[index];
    triggers[index].setAttribute('aria-expanded', String(open));
    row.querySelector('.diag-symbol').textContent = open ? '−' : '+';
    row.querySelector('.diag-panel').hidden = !open;
    diagnoses[index].highlight?.classList.toggle('diag-evidence-highlight', open);
  }

  function keepPosition(anchor, update) {
    const top = anchor.getBoundingClientRect().top;
    update();
    const shift = anchor.getBoundingClientRect().top - top;
    if (Math.abs(shift) > 0.5) window.scrollBy({ top: shift, behavior: 'instant' });
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      keepPosition(trigger, () => {
        if (expanded !== null) setExpanded(expanded, false);
        expanded = expanded === index ? null : index;
        if (expanded !== null) setExpanded(expanded, true);
      });
      updateToggleVisibility();
    });
  });

  function renderDiagnostics(enabled) {
    if (enabled) {
      for (const [anchor, strip] of strips) anchor.after(strip);
      footer.before(central);
      fitChapterFiveEntry();
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
    updateToggleVisibility();
  });

  function toggleIsObstructed(hidden) {
    const { left, right, top, bottom } = toggle.getBoundingClientRect();
    const viewportTop = viewport?.offsetTop ?? 0;
    if (top < viewportTop || bottom > viewportTop + (viewport?.height ?? window.innerHeight)) return true;

    const nav = navBar.getBoundingClientRect();
    // As the nav slides in, reserve its destination before it reaches the toggle.
    const navBottom = header.style.transform === 'translateY(-100%)' ? nav.bottom : nav.height;
    const originalClearance = hidden ? 4 : 0;
    const upper = top - originalClearance;
    const lower = bottom + originalClearance;
    if (getComputedStyle(header).visibility === 'visible' && navBottom > upper && nav.top < lower) return true;

    const diagnosticClearance = hidden ? 24 : 12;
    return diagnosticSections.some(section => {
      const rect = section.getBoundingClientRect();
      return rect.height > 0 && rect.bottom > top - diagnosticClearance && rect.top < bottom + diagnosticClearance;
    }) || originalImages.some(image => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.left < right + 4 && rect.right > left - 4
        && rect.top < lower && rect.bottom > upper && getComputedStyle(image).visibility === 'visible';
    }) || localOriginalContentBounds(left - 4, right + 4, upper, lower).length > 0;
  }

  let revealTimer;
  function updateToggleVisibility() {
    const hidden = toggle.hasAttribute('data-diag-obstructed');
    if (toggleIsObstructed(hidden)) {
      clearTimeout(revealTimer);
      revealTimer = undefined;
      toggle.toggleAttribute('data-diag-obstructed', true);
    } else if (hidden && revealTimer === undefined) {
      // Require a wider, sustained gap so brief clearings do not flash the toggle.
      revealTimer = setTimeout(() => {
        revealTimer = undefined;
        if (!toggleIsObstructed(true)) toggle.removeAttribute('data-diag-obstructed');
      }, 120);
    }
  }

  let toggleFrame = 0;
  function scheduleToggleVisibility() {
    if (toggleFrame) return;
    toggleFrame = requestAnimationFrame(() => {
      toggleFrame = 0;
      updateToggleVisibility();
    });
  }

  const toggleObserver = new ResizeObserver(scheduleToggleVisibility);
  for (const element of [navBar, toggle, document.getElementById('siteWrapper'), ...diagnosticSections]) {
    toggleObserver.observe(element);
  }
  window.addEventListener('scroll', scheduleToggleVisibility, { passive: true });
  window.addEventListener('resize', scheduleToggleVisibility);
  viewport?.addEventListener('scroll', scheduleToggleVisibility, { passive: true });
  viewport?.addEventListener('resize', scheduleToggleVisibility);
  new MutationObserver(scheduleToggleVisibility).observe(header, {
    attributes: true,
    attributeFilter: ['data-local-header-obstructed']
  });
  for (const eventName of ['transitionend', 'transitioncancel']) {
    header.addEventListener(eventName, event => {
      if (event.target === header && event.propertyName === 'transform') scheduleToggleVisibility();
    });
  }
  document.fonts.addEventListener('loadingdone', scheduleToggleVisibility);

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
  updateToggleVisibility();
  window.addEventListener('hashchange', () => revealHashTarget(window.location.hash));
  if (window.location.hash) {
    // CSS and fonts can change the target's position during the initial load.
    window.addEventListener('load', () => revealHashTarget(window.location.hash), { once: true });
  }
})();
