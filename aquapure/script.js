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

const menuToggle=document.querySelector("#menuToggle"),mainNav=document.querySelector("#mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
mainNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));

const revealTargets=document.querySelectorAll(".hero-copy,.hero-visual,.trust-strip>div,.section-heading,.product-card,.service-intro,.service-item,.about-visual,.about-copy,.faq-list,.contact-copy,.chat-invite");
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


// Local FAQ chatbot: answers are selected from a prepared knowledge base.
const chatPanel=document.querySelector("#chatPanel");
const chatLauncher=document.querySelector("#chatLauncher");
const chatMessages=document.querySelector("#chatMessages");
const chatForm=document.querySelector("#chatForm");
const chatInput=document.querySelector("#chatInput");
function openChat(){chatPanel.classList.add("open");chatPanel.setAttribute("aria-hidden","false");chatLauncher.setAttribute("aria-expanded","true");setTimeout(()=>chatInput.focus(),100)}
function closeChat(){chatPanel.classList.remove("open");chatPanel.setAttribute("aria-hidden","true");chatLauncher.setAttribute("aria-expanded","false")}
function addChatMessage(text,who){
 const bubble=document.createElement("div");bubble.className="chat-bubble "+(who==="user"?"user-bubble":"bot-bubble");bubble.textContent=text;chatMessages.appendChild(bubble);chatMessages.scrollTop=chatMessages.scrollHeight;
}
const faqAnswers=[
 {keys:["үнэ","une","төгрөг","төсөв","хэд"],answer:"Одоогийн танилцуулгын демо үнэ:\n• AquaPure RO-5 — ₮890,000\n• AquaPure Office — ₮1,250,000\n• AquaPure Mini — ₮390,000\nЭдгээр үнэ нь демо мэдээлэл бөгөөд бодит худалдааны үнэ гэж баталгаажаагүй."},
 {keys:["ro-5","ro5","осмос","5 шат","гэр ахуй","гал тогоо"],answer:"AquaPure RO-5 нь гал тогооны доор байрлуулах 5 шатлалт урвуу осмос (RO) системээр танилцуулагдсан. Гэр ахуйн хэрэглээнд зориулсан сонголт."},
 {keys:["office","оффис","халуун","хүйтэн"],answer:"AquaPure Office нь ажлын орчинд зориулсан халуун, хүйтэн ус түгээгч загвараар танилцуулагдсан. Демо үнэ нь ₮1,250,000."},
 {keys:["mini","компакт","жижиг","зай бага"],answer:"AquaPure Mini нь зай бага эзлэх компакт загвар. Демо үнэ нь ₮390,000."},
 {keys:["шүүлтүүр","солих","хугацаа","хэдэн сар"],answer:"Шүүлтүүр солих хугацаа нь төхөөрөмжийн загвар, шүүлтүүрийн төрөл болон усны чанараас хамаарна. Тухайн төхөөрөмжийн үйлдвэрлэгчийн зааврыг дагах хэрэгтэй. Сайтад яг таг солих хугацаа баталгаажаагүй байна."},
 {keys:["хүргэлт","хүргэх","улаанбаатар"],answer:"Сайтын мэдээллээр Улаанбаатар хотод хүргэлттэй гэж танилцуулсан. Хүргэлтийн үнэ, хугацаа одоогоор тодорхой заагаагүй байна."},
 {keys:["суурилуул","монтаж","угсрах"],answer:"Суурилуулалтын талаар зөвлөгөө авах боломжтой гэж сайтад дурдсан. Төхөөрөмжийн төрөл болон байрлуулах орчноос хамааран шаардлага өөр байж болно."},
 {keys:["усны чанар","turbidity","шинжилгээ","шинжлэх"],answer:"Тохирох төхөөрөмж сонгоход усны эх үүсвэр, усны чанар, хэрэглэгчийн тоо болон суурилуулах зай чухал. Усны шинжилгээний мэдээлэл байвал сонголтоо илүү зөв хийхэд тусална."},
 {keys:["сайн уу","сайн байна уу","hello","hi","байна уу"],answer:"Сайн байна уу! 😊 Ямар мэдээлэл хэрэгтэй байна вэ? Бүтээгдэхүүний үнэ, загвар, шүүлтүүр эсвэл хүргэлтийн талаар асуугаарай."},
 {keys:["баярлалаа","thanks"],answer:"Танд баярлалаа! 😊 Өөр асуулт байвал үргэлжлүүлээд асуугаарай."}
];
function getFaqAnswer(question){
 const q=question.toLocaleLowerCase("mn");
 const match=faqAnswers.find(item=>item.keys.some(key=>q.includes(key)));
 return match?match.answer:"Уучлаарай, энэ талаар надад урьдчилан бэлтгэсэн мэдээлэл алга байна. Та бүтээгдэхүүний үнэ, RO-5, Office, Mini, шүүлтүүр, хүргэлт эсвэл суурилуулалтын талаар асуугаарай.";
}
function sendChatQuestion(question){
 const clean=question.trim();if(!clean)return;
 addChatMessage(clean,"user");
 chatInput.value="";
 window.setTimeout(()=>addChatMessage(getFaqAnswer(clean),"bot"),220);
}
chatLauncher.addEventListener("click",()=>chatPanel.classList.contains("open")?closeChat():openChat());
document.querySelector("#chatClose").addEventListener("click",closeChat);
document.querySelectorAll("[data-open-chat]").forEach(button=>button.addEventListener("click",openChat));
chatForm.addEventListener("submit",event=>{event.preventDefault();sendChatQuestion(chatInput.value)});
chatMessages.addEventListener("click",event=>{const button=event.target.closest("button[data-question]");if(button)sendChatQuestion(button.dataset.question)});
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeChat()});
