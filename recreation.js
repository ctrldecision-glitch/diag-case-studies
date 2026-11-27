/* Local UI only. The source page's copy, markup and section order are retained. */
const disableLink=link=>{
 link.removeAttribute('href');
 link.setAttribute('aria-disabled','true');
 link.setAttribute('tabindex','-1');
 link.addEventListener('click',event=>event.preventDefault());
};
document.querySelectorAll('.header-title-logo a, .header-nav a, .header-menu-nav-list a, .header-actions a, .sqs-block-button-element, footer a').forEach(disableLink);
document.querySelectorAll('.header-nav-folder-title').forEach(button=>{
 button.removeAttribute('data-href');
 button.setAttribute('aria-disabled','true');
 button.setAttribute('tabindex','-1');
 button.addEventListener('click',event=>event.preventDefault());
});
document.addEventListener('click',event=>{
 const disabled=event.target.closest('[aria-disabled="true"]');
 if(disabled){event.preventDefault();event.stopImmediatePropagation()}
},true);
document.querySelectorAll('form').forEach(form=>{
 form.removeAttribute('action');
 form.removeAttribute('method');
 form.removeAttribute('target');
 form.setAttribute('aria-disabled','true');
 form.addEventListener('submit',event=>event.preventDefault());
 form.querySelectorAll('input, textarea, select, button').forEach(control=>{
  control.removeAttribute('name');
  control.setAttribute('aria-disabled','true');
  control.setAttribute('disabled','');
 });
});
document.addEventListener('submit',event=>event.preventDefault(),true);
const header=document.querySelector('#header');
const burgers=document.querySelectorAll('.header-burger-btn');
function setMenu(open){
 if(open&&header){
  header.removeAttribute('data-local-header-obstructed');
  header.style.transform='none';
 }
 document.body.classList.toggle('header--menu-open',open);
 burgers.forEach(burger=>burger.setAttribute('aria-expanded',String(open)));
 document.querySelectorAll('.js-header-burger-open-title').forEach(e=>e.toggleAttribute('hidden',open));
 document.querySelectorAll('.js-header-burger-close-title').forEach(e=>e.toggleAttribute('hidden',!open));
 if(!open) scheduleHeaderPosition();
}
burgers.forEach(burger=>burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('header--menu-open'))));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.querySelectorAll('.header-nav-folder-title').forEach(button=>{
 if(button.getAttribute('aria-disabled')==='true')return;
 button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(open));
  button.closest('.header-nav-item')?.classList.toggle('local-folder-open',open);
 });
});
document.querySelectorAll('.header-menu [data-folder-id]').forEach(link=>{
 link.addEventListener('click',event=>{
  const folder=link.getAttribute('data-folder-id');
  const target=[...document.querySelectorAll('.header-menu-nav-folder')].find(e=>e.dataset.folder===folder);
  if(!target)return;
  event.preventDefault();
  document.querySelectorAll('.header-menu-nav-folder').forEach(e=>e.classList.toggle('header-menu-nav-folder--active',e===target));
 });
});
document.querySelectorAll('.accordion-item__click-target').forEach(button=>{
 button.addEventListener('click',()=>{
  const open=button.getAttribute('aria-expanded')!=='true';
  const panel=document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded',String(open));
  panel?.classList.toggle('accordion-item__dropdown--open',open);
  button.closest('.accordion-item')?.classList.toggle('local-accordion-open',open);
 });
});
const originalControls = '.accordion-item__click-target, .sqs-block-button-element, button, input, textarea, select, .es-carousel-outer';
const originalWordmark = '#footer-sections img[alt="Worth The Journey Logo White"]';
const originalContent = [...document.querySelectorAll(
 `:is(#page, #footer-sections) :is(h1,h2,h3,h4,h5,h6,p,li,${originalControls}), ${originalWordmark}`
)];
const textRange = document.createRange();

function localOriginalContentBounds(left, right, top, bottom) {
 const inBounds = block => block.width && block.height && block.right > left && block.left < right
  && block.bottom > top && block.top < bottom;
 const rects = [];
 for (const element of originalContent) {
  const box = element.getBoundingClientRect();
  if (!inBounds(box) || getComputedStyle(element).visibility !== 'visible'
    || element.closest('.accordion-item__dropdown:not(.accordion-item__dropdown--open)')) continue;
  if (element.matches(`${originalControls}, ${originalWordmark}`)) {
   rects.push(box);
  } else {
   textRange.selectNodeContents(element);
   rects.push(...Array.from(textRange.getClientRects()).filter(inBounds));
  }
 }
 return rects;
}

const originalNav = header?.querySelector('.header-announcement-bar-wrapper') ?? header;
let lastY = scrollY;
let headerRequested = scrollY <= 120;
let headerFrame = 0;
function scheduleHeaderPosition() {
 if (!header || headerFrame) return;
 headerFrame = requestAnimationFrame(() => {
  headerFrame = 0;
  if (document.body.classList.contains('header--menu-open')) return;
  const bottom = originalNav.getBoundingClientRect().height + 4;
  const coversDiagnostics = [...document.querySelectorAll('.diag-strip, .diag-central')].some(section => {
   const rect = section.getBoundingClientRect();
   return rect.bottom > 0 && rect.top < bottom;
  });
  const obstructed = coversDiagnostics || localOriginalContentBounds(0, innerWidth, 0, bottom).length > 0;
  header.toggleAttribute('data-local-header-obstructed', obstructed);
  const transform = headerRequested && !obstructed ? 'translateY(0)' : 'translateY(-100%)';
  if (header.style.transform !== transform) header.style.transform = transform;
 });
}
addEventListener('scroll',()=>{
 const y=scrollY;
 if (y !== lastY) headerRequested = y <= lastY || y <= 120;
 lastY=y;
 scheduleHeaderPosition();
},{passive:true});
if (originalNav) {
 const headerObserver = new ResizeObserver(scheduleHeaderPosition);
 headerObserver.observe(originalNav);
 headerObserver.observe(document.querySelector('#siteWrapper'));
}
document.fonts.addEventListener('loadingdone', scheduleHeaderPosition);
document.querySelectorAll('.es-text-shortener-control').forEach(button=>{
 button.addEventListener('click',()=>{
  const parent=button.closest('.es-text-shortener-container');
  parent?.classList.toggle('local-review-expanded');
  button.setAttribute('aria-expanded',String(parent?.classList.contains('local-review-expanded')));
 });
});
const reviewWidget=document.getElementById('block-ed0df73b4084e62aee94');
if(reviewWidget){
 const viewport=reviewWidget.querySelector('.swiper');
 const slides=[...viewport.querySelectorAll('.swiper-wrapper > .swiper-slide')];
 slides.slice(6).forEach(slide=>slide.remove());
 const next=reviewWidget.querySelector('[aria-label="Next"]');
 const previous=reviewWidget.querySelector('[aria-label="Previous"]');
 const end=()=>Math.max(0,viewport.scrollWidth-viewport.clientWidth);
 const setDisabled=(control,disabled)=>{
  if(!control)return;
  control.setAttribute('aria-disabled',String(disabled));
  control.tabIndex=disabled?-1:0;
 };
 const update=()=>{
  setDisabled(previous,viewport.scrollLeft<=1);
  setDisabled(next,viewport.scrollLeft>=end()-1);
 };
 const move=direction=>{
  const first=slides[0].getBoundingClientRect();
  const stride=slides[1].getBoundingClientRect().left-first.left;
  const count=Math.max(1,Math.round(viewport.clientWidth/stride));
  const left=Math.min(end(),Math.max(0,viewport.scrollLeft+direction*stride*count));
  viewport.scrollTo({left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 next?.addEventListener('click',()=>move(1));previous?.addEventListener('click',()=>move(-1));
 [next,previous].forEach((button,i)=>button?.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();move(i===0?1:-1)}}));
 viewport.addEventListener('scroll',update,{passive:true});
 new ResizeObserver(update).observe(viewport);
 update();
}
