"use strict";

const PRODUCTS = [
  { id: 1, name: "AquaHome RO-5", cat: "home", price: 690000, old: 790000, tag: "Хит",
    desc: "5 шатлалт RO цэвэршүүлэгч, угаалтуурын доор.",
    specs: ["RO мембран, 75 GPD", "Эрдэсжүүлэгч шат", "8 литрийн сав"] },
  { id: 2, name: "AquaHome UV Plus", cat: "home", price: 890000,
    desc: "RO + хэт ягаан туяаны ариутгал.",
    specs: ["7 шатлалт шүүлт", "UV ариутгал", "Дэлгэцтэй хяналт"] },
  { id: 3, name: "AquaPure Jug 3L", cat: "home", price: 69000,
    desc: "Цахилгаангүй шүүлтүүрт данх, өдөр тутамд.",
    specs: ["3 литр", "Нүүрсэн шүүлтүүр", "Хлор, үнэр арилгана"] },
  { id: 4, name: "AquaOffice Cooler", cat: "office", price: 1290000, tag: "Шинэ",
    desc: "Халуун/хүйтэн усны оффисын диспенсер.",
    specs: ["Шууд шүүлттэй", "Халуун 90°C / хүйтэн 8°C", "Цагт 20 литр"] },
  { id: 5, name: "AquaOffice 400", cat: "office", price: 2450000,
    desc: "Жижиг оффис, кафед зориулсан өндөр хүчин чадалтай систем.",
    specs: ["400 GPD", "Даралтын сав", "Хоёр гаралттай цорго"] },
  { id: 6, name: "Тунадасны шүүлтүүр (3 ш)", cat: "filter", price: 45000,
    desc: "Ус цэвэршүүлэгчийн 1-р шатны сэлбэг.",
    specs: ["5 микрон", "Ихэнх загварт таарна", "3–6 сар"] },
  { id: 7, name: "RO мембран 75 GPD", cat: "filter", price: 120000,
    desc: "Орчин үеийн RO системийн мембран.",
    specs: ["Хатуулаг, давс шүүнэ", "18–24 сар", "Үнэгүй солилт (УБ)"] },
  { id: 8, name: "Нүүрсэн шүүлтүүр (2 ш)", cat: "filter", price: 38000,
    desc: "Хлор, үнэр, амтыг арилгана.",
    specs: ["Идэвхижүүлсэн нүүрс", "6–12 сар", "Стандарт 10\" хэмжээ"] }
];

const fmt = n => n.toLocaleString("mn-MN").replace(/,/g, "’") + "₮";
const $ = s => document.querySelector(s);
const DROP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" fill="currentColor"/></svg>';

let state = { cat: "all", sort: "def" };
let cart = load();

function load() {
  try { return JSON.parse(localStorage.getItem("aq-cart")) || {}; } catch { return {}; }
}
function save() {
  try { localStorage.setItem("aq-cart", JSON.stringify(cart)); } catch {}
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* products */
function renderProducts() {
  let list = PRODUCTS.filter(p => state.cat === "all" || p.cat === state.cat);
  if (state.sort === "asc") list.sort((a, b) => a.price - b.price);
  if (state.sort === "desc") list.sort((a, b) => b.price - a.price);
  $("#productGrid").innerHTML = list.length ? list.map(p => `
    <article class="card">
      <div class="card-img">${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}${DROP}</div>
      <div class="card-body">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        <ul class="specs">${p.specs.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
        <div class="price-row">
          <span class="price">${fmt(p.price)}${p.old ? `<span class="old">${fmt(p.old)}</span>` : ""}</span>
          <button class="add" data-id="${p.id}">Сагсанд</button>
        </div>
      </div>
    </article>`).join("") : '<p class="empty">Бүтээгдэхүүн олдсонгүй.</p>';
}

$("#filters").addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
  state.cat = b.dataset.cat;
  renderProducts();
});
$("#sort").addEventListener("change", e => { state.sort = e.target.value; renderProducts(); });
$("#productGrid").addEventListener("click", e => {
  const b = e.target.closest(".add");
  if (!b) return;
  addToCart(+b.dataset.id);
  openCart();
});

/* cart */
function addToCart(id) { cart[id] = (cart[id] || 0) + 1; save(); renderCart(); }
function setQty(id, q) { if (q <= 0) delete cart[id]; else cart[id] = q; save(); renderCart(); }

function renderCart() {
  const items = Object.entries(cart)
    .map(([id, q]) => ({ p: PRODUCTS.find(x => x.id === +id), q }))
    .filter(x => x.p);
  const count = items.reduce((s, x) => s + x.q, 0);
  const total = items.reduce((s, x) => s + x.q * x.p.price, 0);
  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = fmt(total);
  $("#checkout").disabled = !count;
  $("#cartItems").innerHTML = items.length ? items.map(({ p, q }) => `
    <div class="line">
      <b>${esc(p.name)}</b><span>${fmt(p.price * q)}</span>
      <div class="qty">
        <button data-act="dec" data-id="${p.id}" aria-label="Хасах">−</button>
        <span>${q}</span>
        <button data-act="inc" data-id="${p.id}" aria-label="Нэмэх">+</button>
      </div>
      <button class="rm" data-act="rm" data-id="${p.id}">Устгах</button>
    </div>`).join("") : '<p class="empty">Сагс хоосон байна.</p>';
}

$("#cartItems").addEventListener("click", e => {
  const b = e.target.closest("button[data-act]");
  if (!b) return;
  const id = +b.dataset.id, q = cart[id] || 0;
  if (b.dataset.act === "inc") setQty(id, q + 1);
  if (b.dataset.act === "dec") setQty(id, q - 1);
  if (b.dataset.act === "rm") setQty(id, 0);
});

function openCart() {
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
}
function closeCart() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
}
$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

$("#checkout").addEventListener("click", () => {
  closeCart();
  $("#contact").scrollIntoView();
  const area = document.querySelector("#contactForm textarea");
  const lines = Object.entries(cart).map(([id, q]) => {
    const p = PRODUCTS.find(x => x.id === +id);
    return p ? `${p.name} × ${q}` : "";
  }).filter(Boolean);
  area.value = "Захиалга: " + lines.join(", ");
  area.focus();
});

/* contact form (demo: no server, nothing is sent) */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg");
  if (!f.name.value.trim() || !/^[0-9+\s-]{8,}$/.test(f.phone.value.trim())) {
    msg.className = "form-msg err";
    msg.textContent = "Нэр болон зөв утасны дугаараа оруулна уу.";
    return;
  }
  msg.className = "form-msg ok";
  msg.textContent = "Баярлалаа! Бид удахгүй холбогдоно.";
  f.reset();
  cart = {}; save(); renderCart();
});

$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
