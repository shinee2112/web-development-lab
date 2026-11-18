const catalog={ro5:{name:"AquaPure RO-5",price:890000},office:{name:"AquaPure Office",price:1250000},mini:{name:"AquaPure Mini",price:390000}};
const cart={};
const fmt=n=>"₮ "+new Intl.NumberFormat("mn-MN").format(n);
const drawer=document.querySelector("#cart"),overlay=document.querySelector("#overlay");
const countEl=document.querySelector("#count"),itemsEl=document.querySelector("#items"),totalEl=document.querySelector("#total");
function openCart(){drawer.classList.add("open");overlay.classList.add("open");drawer.setAttribute("aria-hidden","false");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("open");drawer.setAttribute("aria-hidden","true");overlay.setAttribute("aria-hidden","true");document.body.style.overflow=""}
function drawCart(){
  let count=0,total=0;const entries=Object.entries(cart);
  entries.forEach(([id,q])=>{count+=q;total+=catalog[id].price*q});
  countEl.textContent=count;
  itemsEl.innerHTML=entries.length?entries.map(([id,q])=>`<div class="cart-row"><div><b>${catalog[id].name}</b><small>${fmt(catalog[id].price)} / ширхэг</small></div><div class="quantity"><button data-action="minus" data-id="${id}" aria-label="Хасах">−</button><span>${q}</span><button data-action="plus" data-id="${id}" aria-label="Нэмэх">＋</button></div></div>`).join(""):"Таны сагс хоосон байна.";
  totalEl.textContent=fmt(total);
}
document.querySelectorAll(".add-button").forEach(button=>button.addEventListener("click",()=>{const id=button.dataset.id;cart[id]=(cart[id]||0)+1;drawCart();openCart()}));
itemsEl.addEventListener("click",event=>{const button=event.target.closest("button[data-action]");if(!button)return;const id=button.dataset.id;cart[id]+=button.dataset.action==="plus"?1:-1;if(cart[id]<=0)delete cart[id];drawCart()});
document.querySelector("#cartOpen").addEventListener("click",openCart);
document.querySelector("#close").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeCart()});
document.querySelector("#checkout").addEventListener("click",()=>{closeCart();document.querySelector("#contact").scrollIntoView({behavior:"smooth"});document.querySelector("#customerProduct").value=Object.keys(cart).length===1?catalog[Object.keys(cart)[0]].name:"Бусад";document.querySelector("#customerName").focus({preventScroll:true})});

document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(item=>item.classList.remove("active"));
  button.classList.add("active");
  document.querySelectorAll(".product-card").forEach(card=>{card.hidden=button.dataset.filter!=="all"&&card.dataset.category!==button.dataset.filter});
}));
const form=document.querySelector("#contactForm");
form.addEventListener("submit",event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const message=document.querySelector("#message");
  message.textContent="Мэдээлэл бөглөгдлөө. Энэ демо хувилбарт хүсэлт серверт илгээгдэхгүй байна.";
  message.classList.add("success");
  form.reset();
});

const menuToggle=document.querySelector("#menuToggle"),mainNav=document.querySelector("#mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
mainNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));

const revealTargets=document.querySelectorAll(".hero-copy,.hero-visual,.trust-strip>div,.section-heading,.product-card,.service-intro,.service-item,.about-visual,.about-copy,.faq-list,.contact-copy,.contact-form");
revealTargets.forEach(element=>element.classList.add("reveal"));
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver((entries,instance)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");instance.unobserve(entry.target)}}),{threshold:.12});
  revealTargets.forEach(element=>observer.observe(element));
}else revealTargets.forEach(element=>element.classList.add("visible"));
drawCart();


// Manual day/night theme switch. The preference is remembered on this device.
const themeToggle=document.querySelector("#themeToggle");
const themeIcon=document.querySelector("#themeIcon");
const themeLabel=document.querySelector("#themeLabel");
function applyTheme(theme){
  const night=theme==="night";
  document.body.dataset.theme=night?"night":"day";
  themeIcon.textContent=night?"☀":"☾";
  themeLabel.textContent=night?"Day":"Night";
  themeToggle.setAttribute("aria-pressed",String(night));
  themeToggle.setAttribute("aria-label",night?"Өдрийн горим асаах":"Шөнийн горим асаах");
  document.querySelector('meta[name="theme-color"]').content=night?"#0b1b29":"#f2f9fc";
}
let savedTheme="day";
try{savedTheme=localStorage.getItem("aquapure-theme")||"day"}catch(error){}
applyTheme(savedTheme);
themeToggle.addEventListener("click",()=>{
  const next=document.body.dataset.theme==="night"?"day":"night";
  applyTheme(next);
  try{localStorage.setItem("aquapure-theme",next)}catch(error){}
});
