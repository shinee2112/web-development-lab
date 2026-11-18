const catalog={ro5:{name:"AquaPure RO-5",price:890000},office:{name:"AquaPure Office",price:1250000},mini:{name:"AquaPure Mini",price:390000}};
const cart={};const fmt=n=>"₮ "+new Intl.NumberFormat("mn-MN").format(n);
const drawer=document.querySelector("#cart"),overlay=document.querySelector("#overlay");
function draw(){let count=0,total=0;const entries=Object.entries(cart);entries.forEach(([id,q])=>{count+=q;total+=catalog[id].price*q});document.querySelector("#count").textContent=count;document.querySelector("#items").innerHTML=entries.length?entries.map(([id,q])=>`<p><b>${catalog[id].name}</b><br>${fmt(catalog[id].price)} × ${q} <button data-id="${id}" class="minus">−</button> <button data-id="${id}" class="plus">+</button></p>`).join(""):"Таны сагс хоосон байна.";document.querySelector("#total").textContent=fmt(total);document.querySelectorAll(".plus,.minus").forEach(b=>b.onclick=()=>{cart[b.dataset.id]+=b.className==="plus"?1:-1;if(cart[b.dataset.id]<=0)delete cart[b.dataset.id];draw()})}
document.querySelectorAll(".add").forEach(b=>b.onclick=()=>{cart[b.dataset.id]=(cart[b.dataset.id]||0)+1;draw();document.querySelector("#cart").classList.add("open");overlay.classList.add("open")});
document.querySelector("#cartOpen").onclick=()=>{drawer.classList.add("open");overlay.classList.add("open")};function close(){drawer.classList.remove("open");overlay.classList.remove("open")}document.querySelector("#close").onclick=close;overlay.onclick=close;
document.querySelector("#checkout").onclick=()=>{close();document.querySelector("#contact").scrollIntoView({behavior:"smooth"});document.querySelector("#message").textContent="Захиалгын хүсэлтээ бөглөнө үү."};
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".products article").forEach(c=>c.hidden=b.dataset.filter!=="all"&&c.dataset.category!==b.dataset.filter)});
document.querySelector("#contactForm").onsubmit=e=>{e.preventDefault();if(!e.currentTarget.reportValidity())return;document.querySelector("#message").textContent="Баярлалаа! Таны хүсэлтийг хүлээн авлаа.";e.currentTarget.reset()};

// Theme preference: saved on this device
const themeToggle=document.querySelector("#themeToggle");
function applyTheme(mode){
  document.body.classList.toggle("dark",mode==="night");
  themeToggle.textContent=mode==="night"?"☀️ Day":"🌙 Night";
  themeToggle.setAttribute("aria-label",mode==="night"?"Өдрийн горимд шилжих":"Шөнийн горимд шилжих");
}
let savedTheme="day";
try{savedTheme=localStorage.getItem("aquapure-theme")||"day"}catch(e){}
applyTheme(savedTheme);
themeToggle.addEventListener("click",()=>{
  const next=document.body.classList.contains("dark")?"day":"night";
  applyTheme(next);
  try{localStorage.setItem("aquapure-theme",next)}catch(e){}
});
