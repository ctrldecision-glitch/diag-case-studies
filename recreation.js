/* Local UI only. The source page's copy, markup and section order are retained. */
const header=document.querySelector('#header');
const burgers=document.querySelectorAll('.header-burger-btn');
function setMenu(open){
 if(open&&header)header.style.transform='none';
 document.body.classList.toggle('header--menu-open',open);
 burgers.forEach(burger=>burger.setAttribute('aria-expanded',String(open)));
 document.querySelectorAll('.js-header-burger-open-title').forEach(e=>e.toggleAttribute('hidden',open));
 document.querySelectorAll('.js-header-burger-close-title').forEach(e=>e.toggleAttribute('hidden',!open));
}
burgers.forEach(burger=>burger.addEventListener('click',()=>setMenu(!document.body.classList.contains('header--menu-open'))));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.querySelectorAll('.header-nav-folder-title').forEach(button=>{
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
let lastY=0;
addEventListener('scroll',()=>{
 const y=scrollY;
 if(header&&!document.body.classList.contains('header--menu-open')){header.style.transform=y>lastY&&y>120?'translateY(-100%)':'translateY(0)'}
 lastY=y;
},{passive:true});
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
 const next=reviewWidget.querySelector('[aria-label="Next"]');
 const previous=reviewWidget.querySelector('[aria-label="Previous"]');
 const update=()=>{previous?.setAttribute('aria-disabled',String(viewport.scrollLeft<2));next?.setAttribute('aria-disabled',String(viewport.scrollLeft+viewport.clientWidth>=viewport.scrollWidth-2))};
 const move=direction=>{
  const stride=viewport.querySelector('.swiper-slide').getBoundingClientRect().width+20;
  const count=Math.max(1,Math.floor((viewport.clientWidth+20)/stride));
  viewport.scrollBy({left:direction*stride*count,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 next?.addEventListener('click',()=>move(1));previous?.addEventListener('click',()=>move(-1));
 [next,previous].forEach((button,i)=>button?.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();move(i===0?1:-1)}}));
 viewport?.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
}
